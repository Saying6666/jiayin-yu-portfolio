import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Pause, Play } from 'lucide-react'

const contactItems = [
  { label: 'NAME', value: '贾银玉' },
  { label: 'SCHOOL', value: '重庆大学' },
  { label: 'WECHAT', value: 'jyy2715750' },
  {
    label: 'EMAIL',
    value: 'jiayinyu_cqu@163.com',
    href: 'mailto:jiayinyu_cqu@163.com',
  },
]

const particles = Array.from({ length: 22 }, (_, index) => ({
  x: 3 + ((index * 37) % 94),
  y: 9 + ((index * 23) % 81),
  duration: 13 + (index % 6) * 2,
  delay: -(index * 3.7),
  drift: (index % 2 === 0 ? 1 : -1) * (7 + (index % 5) * 3),
}))

export function AboutFooter() {
  const visualRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const motionRunning = !paused && !reducedMotion && inView && pageVisible

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(media.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    )

    if (visualRef.current) observer.observe(visualRef.current)
    media.addEventListener('change', updatePreference)
    document.addEventListener('visibilitychange', updateVisibility)

    return () => {
      observer.disconnect()
      media.removeEventListener('change', updatePreference)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  return (
    <footer id="about" className="ending-footer">
      <div ref={visualRef} className="ending-visual" data-motion={motionRunning ? 'running' : 'paused'}>
        <div className="ending-artwork" aria-hidden="true">
          <img
            className="ending-backdrop"
            src="/assets/visuals/contact-hero-clean.webp"
            width="2112"
            height="745"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="ending-light ending-light--ring" />
          <div className="ending-light ending-light--aperture" />
          <div className="ending-particles">
            {particles.map((particle, index) => (
              <span
                className="ending-particle"
                key={index}
                style={{
                  '--x': `${particle.x}%`,
                  '--y': `${particle.y}%`,
                  '--duration': `${particle.duration}s`,
                  '--delay': `${particle.delay}s`,
                  '--drift': `${particle.drift / 3.9}cqw`,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="ending-statement">
          <span className="ending-quote" aria-hidden="true" />
          <h2>
            <span>让重要的内容，</span>
            <span>被准确地看见<span className="ending-period">。</span></span>
          </h2>
        </div>
      </div>

      <div className="ending-contact-shell section-shell">
        <div className="ending-contact-heading">
          <h2>CONTACT / 联系</h2>
          <button
            className="ending-motion-toggle"
            type="button"
            aria-label="暂停背景动画"
            aria-pressed={paused || reducedMotion}
            disabled={reducedMotion}
            onClick={() => setPaused((value) => !value)}
          >
            {paused || reducedMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            <span>{reducedMotion ? '已减少动态效果' : paused ? '播放动效' : '暂停动效'}</span>
          </button>
        </div>

        <dl className="ending-contact-grid">
          {contactItems.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                {item.href ? (
                  <a href={item.href}>{item.value.split('@')[0]}<wbr />@{item.value.split('@')[1]}</a>
                ) : item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="ending-bottom-row">
          <span>贾银玉·新闻传播学作品集</span>
          <span>内容更新至2026</span>
          <a href="#top">
            回到顶部<span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
