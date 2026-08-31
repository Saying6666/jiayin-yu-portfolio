import { useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { wechatWorks, works } from '../data/works'
import type { Work } from '../types'

type MediaSectionsProps = {
  onOpen: (work: Work) => void
}

export function MediaSections({ onOpen }: MediaSectionsProps) {
  const lab = works.filter((work) => work.section === 'lab' && work.id !== 'book-layout')
  const visual = works.filter((work) => work.section === 'visual')
  const [activeVisual, setActiveVisual] = useState(0)

  const showPreviousVisual = () => {
    setActiveVisual((current) => (current - 1 + visual.length) % visual.length)
  }

  const showNextVisual = () => {
    setActiveVisual((current) => (current + 1) % visual.length)
  }

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

        <div className="lab-list cross-media-grid" role="list">
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
                <span className="lab-summary">{work.summary}</span>
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

        <div className="visual-carousel" aria-roledescription="carousel" aria-label="新媒体设计作品">
          <div className="visual-carousel-viewport">
            <div
              className="visual-carousel-track"
              style={{ transform: `translate3d(-${activeVisual * 100}%, 0, 0)` }}
            >
              {visual.map((work, index) => (
                <button
                  key={work.id}
                  type="button"
                  className={`visual-slide ${index === activeVisual ? 'is-active' : ''}`}
                  tabIndex={index === activeVisual ? 0 : -1}
                  onClick={() => onOpen(work)}
                >
                  <span className="visual-slide-media">
                    {work.cover ? <img src={work.cover} alt="" loading={index === 0 ? 'eager' : 'lazy'} /> : null}
                  </span>
                  <span className="visual-slide-copy">
                    <span className="utility-line">
                      {String(index + 1).padStart(2, '0')} / {work.platform ?? 'VISUAL SYSTEM'}
                    </span>
                    <strong>{work.title}</strong>
                    <span>{work.summary}</span>
                    <ArrowRight aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="visual-carousel-controls">
            <button type="button" onClick={showPreviousVisual} aria-label="上一件新媒体作品">
              <ArrowLeft aria-hidden="true" />
            </button>
            <div className="visual-carousel-dots" aria-label="选择新媒体作品">
              {visual.map((work, index) => (
                <button
                  key={work.id}
                  type="button"
                  className={index === activeVisual ? 'is-active' : ''}
                  onClick={() => setActiveVisual(index)}
                  aria-label={`查看第 ${index + 1} 件：${work.title}`}
                  aria-current={index === activeVisual ? 'true' : undefined}
                />
              ))}
            </div>
            <span>{String(activeVisual + 1).padStart(2, '0')} / {String(visual.length).padStart(2, '0')}</span>
            <button type="button" onClick={showNextVisual} aria-label="下一件新媒体作品">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
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
