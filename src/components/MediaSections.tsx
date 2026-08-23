import { ArrowRight, ExternalLink, Play } from 'lucide-react'
import { wechatWorks, works } from '../data/works'
import type { Work } from '../types'

type MediaSectionsProps = {
  onOpen: (work: Work) => void
}

export function MediaSections({ onOpen }: MediaSectionsProps) {
  const videos = works.filter((work) => work.section === 'video')
  const publications = works.filter(
    (work) => work.section === 'publication' || work.id === 'book-layout',
  )
  const visuals = works.filter((work) => work.section === 'visual')
  const lab = works.filter((work) => work.section === 'lab' && work.id !== 'book-layout')

  return (
    <>
      <section id="moving-image" className="media-band media-band--dark reveal">
        <div className="section-shell">
          <div className="media-band-heading">
            <h2>动态影像</h2>
            <p>不自动播放。每一次观看，都从你的点击开始。</p>
            <span>MOVING IMAGE / {String(videos.length).padStart(2, '0')}</span>
          </div>
          <div className="video-rail">
            {videos.map((work, index) => (
              <button
                key={work.id}
                className="video-card"
                type="button"
                onClick={() => onOpen(work)}
              >
                <span className="video-poster">
                  {work.cover ? (
                    <img src={work.cover} alt="" loading="lazy" />
                  ) : (
                    <span className="video-external-cover">EXTERNAL / {index + 1}</span>
                  )}
                  <span className="play-disc" aria-hidden="true">
                    <Play fill="currentColor" />
                  </span>
                </span>
                <span className="video-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{work.title}</strong>
                  <small>
                    {work.platform}
                    {work.duration ? ` · ${work.duration}` : ''}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="publication" className="publication section-shell reveal">
        <div className="section-heading-row section-heading-row--publication">
          <div>
            <h2>编辑出版</h2>
            <p>让内容拥有版心、节奏与可持续阅读的秩序。</p>
          </div>
          <span>PUBLICATION / 03</span>
        </div>
        <div className="publication-shelf">
          {publications.map((work, index) => (
            <button
              key={work.id}
              className="publication-card"
              type="button"
              onClick={() => onOpen(work)}
            >
              <span className="publication-cover">
                <img src={work.cover} alt="" loading="lazy" />
                <span className="shelf-index">0{index + 1}</span>
              </span>
              <span className="publication-copy">
                <strong>{work.title}</strong>
                <small>{work.role ?? work.platform}</small>
                <ArrowRight aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="visual" className="visual-section section-shell reveal">
        <div className="section-heading-row">
          <div>
            <h2>视觉传播</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <p>保留海报、头图与活动视觉的原始比例。</p>
        </div>
        <div className="visual-wall">
          {visuals.map((work, index) => (
            <button
              key={work.id}
              className={`visual-card visual-card--${work.orientation ?? 'landscape'}`}
              type="button"
              onClick={() => onOpen(work)}
            >
              <img src={work.cover} alt="" loading="lazy" />
              <span className="visual-caption">
                <b>{String(index + 1).padStart(2, '0')}</b>
                <strong>{work.title}</strong>
                <small>{work.platform}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="wechat" className="wechat-section reveal">
        <div className="section-shell wechat-layout">
          <div className="wechat-intro">
            <h2>公众号作品</h2>
            <p>公众号内容创作与专题传播实践。</p>
          </div>
          <ol className="wechat-index">
            {wechatWorks.map((work, index) => (
              <li key={work.id}>
                <a href={work.externalUrl} target="_blank" rel="noreferrer">
                  <span>WECHAT / {String(index + 1).padStart(2, '0')}</span>
                  <strong>查看原文</strong>
                  <ExternalLink aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="lab" className="lab-section section-shell reveal">
        <div className="section-heading-row">
          <div>
            <h2>跨媒介实验</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <p>H5、活动策划、字新闻与数字展示。</p>
        </div>
        <div className="lab-list">
          {lab.map((work, index) => (
            <button key={work.id} type="button" onClick={() => onOpen(work)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {work.cover && <img src={work.cover} alt="" loading="lazy" />}
              <strong>{work.title}</strong>
              <small>{work.platform}</small>
              <ArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
