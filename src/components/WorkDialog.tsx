import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ExternalLink, FileText, Play, X } from 'lucide-react'
import { allWorks } from '../data/works'
import type { Work } from '../types'

type WorkDialogProps = {
  work: Work | null
  onClose: () => void
}

function MediaView({ work }: { work: Work }) {
  if (work.kind === 'video' && work.mediaSrc) {
    return (
      <video controls preload="metadata" poster={work.cover}>
        <source src={work.mediaSrc} type="video/mp4" />
        当前浏览器无法播放此视频。
      </video>
    )
  }

  if (work.kind === 'pdf' && work.mediaSrc) {
    return (
      <iframe
        src={`${work.mediaSrc}#view=FitH`}
        title={`${work.title} PDF 阅读器`}
        loading="lazy"
      />
    )
  }

  if ((work.kind === 'image' || work.kind === 'article') && work.cover) {
    return <img src={work.mediaSrc ?? work.cover} alt={work.title} />
  }

  if (work.cover) {
    return <img src={work.cover} alt={work.title} />
  }

  return (
    <div className="detail-placeholder">
      {work.kind === 'external' ? <ExternalLink aria-hidden="true" /> : <FileText aria-hidden="true" />}
      <span>{work.kind === 'external' ? 'EXTERNAL WORK' : 'ARCHIVED DOCUMENT'}</span>
    </div>
  )
}

export function WorkDialog({ work, onClose }: WorkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [articleText, setArticleText] = useState('')
  const [loadingArticle, setLoadingArticle] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (work && !dialog.open) {
      dialog.showModal()
      document.body.classList.add('dialog-open')
    } else if (!work && dialog.open) {
      dialog.close()
      document.body.classList.remove('dialog-open')
    }

    return () => document.body.classList.remove('dialog-open')
  }, [work])

  useEffect(() => {
    if (!work) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, work])

  useEffect(() => {
    if (!work?.contentSrc) {
      setArticleText('')
      return
    }

    const controller = new AbortController()
    setLoadingArticle(true)
    fetch(work.contentSrc, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('正文加载失败')
        return response.text()
      })
      .then(setArticleText)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          setArticleText('正文暂时无法加载，请使用原文链接查看。')
        }
      })
      .finally(() => setLoadingArticle(false))

    return () => controller.abort()
  }, [work])

  if (!work) return <dialog ref={dialogRef} />

  const index = allWorks.findIndex((item) => item.id === work.id) + 1
  const articleParagraphs = articleText
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <dialog
      ref={dialogRef}
      className="work-dialog"
      aria-labelledby="work-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-page">
        <div className="dialog-topbar">
          <button type="button" onClick={onClose}>
            <ArrowLeft aria-hidden="true" />
            返回全部作品
          </button>
          <span>{work.filter}</span>
        </div>

        <button className="dialog-close" type="button" onClick={onClose} aria-label="关闭详情">
          <X aria-hidden="true" />
        </button>

        <div className="detail-grid">
          <div className={`detail-media detail-media--${work.kind}`}>
            <MediaView work={work} />
          </div>

          <aside className="detail-sidebar">
            <h2 id="work-dialog-title">{work.title}</h2>
            <span className="detail-highlight" aria-hidden="true" />
            <p className="detail-meta">
              {[work.platform, work.date, work.duration].filter(Boolean).join(' · ')}
            </p>

            <div className="detail-actions">
              {work.kind === 'video' && work.mediaSrc && (
                <a href={work.mediaSrc} target="_blank" rel="noreferrer" className="primary-action">
                  <Play fill="currentColor" aria-hidden="true" />
                  单独播放
                </a>
              )}
              {work.externalUrl && (
                <a href={work.externalUrl} target="_blank" rel="noreferrer" className="outline-action">
                  查看原文
                  <ExternalLink aria-hidden="true" />
                </a>
              )}
            </div>

            <dl className="detail-facts">
              <div>
                <dt>作品简介</dt>
                <dd>{work.summary}</dd>
              </div>
              {work.role && (
                <div>
                  <dt>角色说明</dt>
                  <dd>{work.role}</dd>
                </div>
              )}
              {work.award && (
                <div>
                  <dt>作品荣誉</dt>
                  <dd>{work.award}</dd>
                </div>
              )}
              {work.quote && (
                <div>
                  <dt>文中一句</dt>
                  <dd className="quote">{work.quote}</dd>
                </div>
              )}
              {work.note && (
                <div>
                  <dt>展示说明</dt>
                  <dd>{work.note}</dd>
                </div>
              )}
            </dl>
          </aside>
        </div>

        {work.kind === 'article' && (
          <article className="article-reader">
            <div className="reader-heading">
              <span>ARTICLE / {String(index).padStart(2, '0')}</span>
              <h3>阅读全文</h3>
            </div>
            <div className="reader-body" aria-busy={loadingArticle}>
              {loadingArticle ? (
                <p>正在加载正文…</p>
              ) : (
                articleParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${paragraph.slice(0, 24)}-${paragraphIndex}`}>{paragraph}</p>
                ))
              )}
            </div>
          </article>
        )}

        <div className="dialog-folio" aria-hidden="true">
          <span>{work.kind.toUpperCase()}</span>
          <b>{String(index).padStart(2, '0')}</b>
        </div>
      </div>
    </dialog>
  )
}
