import { ArrowRight } from 'lucide-react'
import { allWorks } from '../data/works'
import type { FilterKey, Work } from '../types'

type ArchiveFilter = Extract<FilterKey, '纪实影像' | '评论写作' | '深度报道' | '编辑排版' | '新媒体设计'>

type ArchiveProps = {
  onOpen: (work: Work) => void
}

const archiveGroups: ArchiveFilter[] = ['纪实影像', '评论写作', '深度报道', '编辑排版', '新媒体设计']
const archiveWorks = allWorks.filter((work) => work.section !== 'lab' || work.id === 'book-layout')

export function Archive({ onOpen }: ArchiveProps) {
  return (
    <section id="archive" className="archive archive--stack section-shell">
      <div className="archive-title-row">
        <div>
          <h2>全部作品</h2>
          <span className="lime-stroke" aria-hidden="true" />
          <p>按媒介浏览，也按议题抵达。</p>
        </div>
        <span className="archive-count" aria-label={`共 ${archiveWorks.length} 项作品`}>
          {String(archiveWorks.length).padStart(2, '0')} / ARCHIVE
        </span>
      </div>

      <div className="archive-stack">
        {archiveGroups.map((filter, groupIndex) => {
          const groupedWorks = archiveWorks.filter((work) => work.filter === filter)
          const headingId = `archive-group-${groupIndex + 1}`

          return (
            <section
              key={filter}
              className={`archive-group archive-group--${groupIndex + 1}`}
              aria-labelledby={headingId}
            >
              <div className="archive-group-heading">
                <div>
                  <span className="utility-line">GROUP / {String(groupIndex + 1).padStart(2, '0')}</span>
                  <h3 id={headingId}>{filter}</h3>
                </div>
                <span>{groupedWorks.length} 项</span>
              </div>

              <div className="archive-list" aria-label={`${filter}作品`}>
                {groupedWorks.map((work, index) => (
                  <button
                    key={work.id}
                    type="button"
                    className={`archive-item archive-item--${index < 3 ? 'lead' : 'row'} ${
                      work.cover ? '' : 'archive-item--text'
                    }`}
                    onClick={() => onOpen(work)}
                  >
                    <span className="archive-media">
                      {work.cover ? (
                        <img src={work.cover} alt="" loading="lazy" />
                      ) : (
                        <span className="type-cover">
                          <span>{work.section === 'wechat' ? 'WECHAT' : 'DOCUMENT'}</span>
                          <b>{String(index + 1).padStart(2, '0')}</b>
                        </span>
                      )}
                    </span>
                    <span className="archive-copy">
                      <span className="utility-line">
                        {work.filter}
                        {work.platform ? ` · ${work.platform}` : ''}
                      </span>
                      <strong>{work.title}</strong>
                      {index < 3 && <span className="archive-summary">{work.summary}</span>}
                      <ArrowRight className="archive-arrow" aria-hidden="true" />
                    </span>
                    <span className="folio-number">{String(index + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}
