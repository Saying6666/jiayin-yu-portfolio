import { ArrowRight } from 'lucide-react'
import { works } from '../data/works'
import type { Work } from '../types'

type FeaturedWorksProps = {
  onOpen: (work: Work) => void
}

export function FeaturedWorks({ onOpen }: FeaturedWorksProps) {
  const featured = works.filter((work) => work.featured)

  return (
    <section id="featured" className="featured section-shell reveal">
      <div className="section-heading-row">
        <div>
          <h2>精选作品</h2>
          <span className="heading-rule" aria-hidden="true" />
        </div>
        <a href="#archive" className="text-action">
          查看全部作品
          <ArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="featured-grid">
        {featured.map((work, index) => (
          <button
            key={work.id}
            type="button"
            className={`featured-card featured-card--${index + 1}`}
            onClick={() => onOpen(work)}
          >
            <span className="featured-media">
              <img src={work.cover} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
              <span className="featured-type">{work.filter.replace('写作', '')}</span>
            </span>
            <span className="featured-copy">
              <span className="utility-line">
                {work.platform}
                {work.date ? ` · ${work.date}` : ''}
              </span>
              <strong>{work.title}</strong>
              <span className="card-arrow" aria-hidden="true">
                <ArrowRight />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
