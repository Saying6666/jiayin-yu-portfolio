import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { allWorks } from '../data/works'
import type { FilterKey, Work } from '../types'

type ArchiveFilter = Extract<FilterKey, '纪实影像' | '评论写作' | '深度报道' | '编辑排版'>

type ArchiveProps = {
  onOpen: (work: Work) => void
}

const archiveGroups: ArchiveFilter[] = ['纪实影像', '评论写作', '深度报道', '编辑排版']
const archiveGroupSet = new Set<FilterKey>(archiveGroups)
const archiveWorks = allWorks.filter(
  (work) => archiveGroupSet.has(work.filter) && (work.section !== 'lab' || work.id === 'book-layout'),
)

export function Archive({ onOpen }: ArchiveProps) {
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>('纪实影像')
  const activeGroupIndex = archiveGroups.indexOf(activeFilter)
  const groupedWorks = archiveWorks.filter((work) => work.filter === activeFilter)
  const headingId = `archive-group-${activeGroupIndex + 1}`

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

      <div className="filter-rail" role="tablist" aria-label="全部作品分组">
        {archiveGroups.map((filter, index) => (
          <button
            key={filter}
            id={`archive-tab-${index + 1}`}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            aria-controls={`archive-panel-${index + 1}`}
            className={activeFilter === filter ? 'is-active' : ''}
            onClick={() => setActiveFilter(filter)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {filter}
          </button>
        ))}
      </div>

      <div className="archive-stack">
        <section
          key={activeFilter}
          id={`archive-panel-${activeGroupIndex + 1}`}
          className={`archive-group archive-group--${activeGroupIndex + 1}`}
          role="tabpanel"
          aria-labelledby={`archive-tab-${activeGroupIndex + 1}`}
        >
          <div className="archive-group-heading">
            <div>
              <span className="utility-line">GROUP / {String(activeGroupIndex + 1).padStart(2, '0')}</span>
              <h3 id={headingId}>{activeFilter}</h3>
            </div>
            <span>{groupedWorks.length} 项</span>
          </div>

          <div className="archive-list" aria-label={`${activeFilter}作品`}>
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
      </div>
    </section>
  )
}
