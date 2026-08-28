import { ArrowRight, ExternalLink } from 'lucide-react'
import { wechatWorks, works } from '../data/works'
import type { Work } from '../types'

type MediaSectionsProps = {
  onOpen: (work: Work) => void
}

export function MediaSections({ onOpen }: MediaSectionsProps) {
  const lab = works.filter((work) => work.section === 'lab' && work.id !== 'book-layout')
  const visual = works.filter((work) => work.section === 'visual')

  return (
    <>
      <section id="lab" className="lab-section cross-media-section section-shell reveal">
        <div className="section-heading-row">
          <div>
            <h2>跨媒介作品</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <p>让文字、影像与交互在同一条叙事线上相遇。</p>
        </div>

        <div className="lab-list" role="list">
          {lab.map((work, index) => (
            <button
              key={work.id}
              type="button"
              className={`cross-media-item cross-media-item--${index + 1}`}
              onClick={() => onOpen(work)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="lab-thumb">
                {work.cover ? <img src={work.cover} alt="" loading="lazy" /> : <span />}
              </span>
              <span className="lab-copy">
                <strong>{work.title}</strong>
                <small>{work.platform}</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section id="new-media" className="new-media-section section-shell reveal">
        <div className="section-heading-row new-media-heading">
          <div>
            <span className="utility-line">GROUP / 06</span>
            <h2>新媒体设计</h2>
            <span className="heading-rule" aria-hidden="true" />
          </div>
          <span className="new-media-count">{String(visual.length).padStart(2, '0')} / VISUAL</span>
        </div>

        <div className="new-media-grid" role="list">
          {visual.map((work, index) => (
            <button
              key={work.id}
              type="button"
              className={`new-media-card new-media-card--${index + 1}`}
              onClick={() => onOpen(work)}
            >
              <span className="new-media-media">
                {work.cover ? <img src={work.cover} alt="" loading="lazy" /> : <span className="type-cover" />}
                <span className="new-media-index">{String(index + 1).padStart(2, '0')}</span>
              </span>
              <span className="new-media-copy">
                <span className="utility-line">{work.platform ?? 'VISUAL SYSTEM'}</span>
                <strong>{work.title}</strong>
                <ArrowRight aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="wechat" className="wechat-section reveal">
        <div className="section-shell wechat-layout">
          <div className="wechat-intro">
            <span className="wechat-kicker">WECHAT / INDEX</span>
            <h2>公众号作品</h2>
            <p>公众号内容创作与专题传播实践。</p>
          </div>
          <div className="wechat-output">
            <div className="wechat-samples" aria-label="精选排版切片">
              {visual.slice(0, 3).map((work, index) => (
                <figure key={work.id} className={`wechat-sample wechat-sample--${index + 1}`}>
                  <img src={work.cover} alt="" loading="lazy" />
                  <figcaption>
                    <span>排版切片 / {String(index + 1).padStart(2, '0')}</span>
                    <b>{work.title}</b>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ol className="wechat-index">
              {wechatWorks.map((work, index) => (
                <li key={work.id}>
                  <a href={work.externalUrl} target="_blank" rel="noreferrer">
                    <span className="wechat-thumb" aria-hidden="true">
                      <b>{String(index + 1).padStart(2, '0')}</b>
                      <i />
                      <i />
                    </span>
                    <span className="wechat-copy">
                      <span>WECHAT / {String(index + 1).padStart(2, '0')}</span>
                      <strong>{work.title}</strong>
                    </span>
                    <ExternalLink aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
