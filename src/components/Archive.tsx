import { useMemo, useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import { allWorks, filters } from '../data/works'
import type { FilterKey, Work } from '../types'

type ArchiveProps = {
  onOpen: (work: Work) => void
}

export function Archive({ onOpen }: ArchiveProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('全部')
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(
    () =>
      activeFilter === '全部'
        ? allWorks
        : allWorks.filter((work) => work.filter === activeFilter),
    [activeFilter],
  )

  const visible = expanded ? filtered : filtered.slice(0, 10)

  const chooseFilter = (filter: FilterKey) => {
    setActiveFilter(filter)
    setExpanded(false)
  }

  return (
    <section id="archive" className="archive section-shell reveal">
      <div className="archive-title-row">
        <div>
          <h2>全部作品</h2>
          <span className="lime-stroke" aria-hidden="true" />
          <p>按媒介浏览，也按议题抵达。</p>
        </div>
        <span className="archive-count" aria-label={`共 ${filtered.length} 项作品`}>
          {String(filtered.length).padStart(2, '0')} / ARCHIVE
        </span>
      </div>

      <div className="filter-rail" role="tablist" aria-label="作品分类">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            className={activeFilter === filter ? 'is-active' : ''}
            onClick={() => chooseFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="archive-list">
        {visible.map((work, index) => (
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

      {filtered.length > visible.length && (
        <button className="load-more" type="button" onClick={() => setExpanded(true)}>
          <Plus aria-hidden="true" />
          展开其余 {filtered.length - visible.length} 项
        </button>
      )}
    </section>
  )
}
