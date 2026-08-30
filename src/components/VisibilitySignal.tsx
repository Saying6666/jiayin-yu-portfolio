import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'

const filmFrames = [
  { index: '01', src: '/assets/covers/orange-revival-alt2.jpg', alt: '奉节脐橙纪实影像画面' },
  { index: '02', src: '/assets/covers/basket-mountain.jpg', alt: '背篓里的山与城纪实影像画面' },
  { index: '03', src: '/assets/covers/bike-return-interview.jpg', alt: '共享单车调查采访画面' },
  { index: '04', src: '/assets/covers/acne-film-frame.jpg', alt: '让痘痘飞创意影像画面' },
  { index: '05', src: '/assets/covers/rural-mural.jpg', alt: '乡村墙体彩绘纪实画面' },
]

function OrbitSignal() {
  return (
    <svg
      className="cover-orbit-signal cover-enter cover-enter--1"
      viewBox="0 0 640 460"
      role="img"
      aria-label="从聚焦圆环延伸到影像声波的动态视线轨迹"
    >
      <defs>
        <linearGradient id="cover-orbit-gradient" x1="104" y1="142" x2="610" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#bbfc00" />
          <stop offset="0.52" stopColor="#8fffc5" />
          <stop offset="1" stopColor="#27dbe7" />
        </linearGradient>
        <filter id="cover-orbit-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="cover-orbit-route cover-orbit-route--upper"
        d="M107 142C143 181 196 195 251 167C353 102 469 43 610 0"
      />
      <path
        className="cover-orbit-route cover-orbit-route--lower"
        d="M121 430C126 326 166 229 251 167"
      />
      <path
        className="cover-orbit-sweep"
        d="M107 142C143 181 196 195 251 167C353 102 469 43 610 0"
      />

      <g className="cover-orbit-radar">
        <circle className="cover-orbit-ring cover-orbit-ring--outer" cx="105" cy="99" r="45" />
        <circle className="cover-orbit-ring cover-orbit-ring--inner" cx="105" cy="99" r="27" />
        <circle className="cover-orbit-halo" cx="105" cy="99" r="17" />
        <path className="cover-orbit-hook" d="M61 114C65 133 83 144 107 142" />
        <circle className="cover-orbit-core" cx="105" cy="99" r="9" />
      </g>

      <circle className="cover-orbit-node cover-orbit-node--one" cx="107" cy="142" r="7" />
      <circle className="cover-orbit-node cover-orbit-node--two" cx="251" cy="167" r="7" />
      <circle className="cover-orbit-node cover-orbit-node--three" cx="121" cy="430" r="7" />
    </svg>
  )
}

function SoundWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(rect.width * pixelRatio))
      const height = Math.max(1, Math.round(rect.height * pixelRatio))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, rect.width, rect.height)
      context.lineCap = 'round'

      const baseline = rect.height / 2
      const meterWidth = rect.width * 0.36
      const barGap = Math.max(5, rect.width / 180)

      for (let x = 0; x < meterWidth; x += barGap) {
        const progress = x / meterWidth
        const envelope =
          Math.exp(-Math.pow((progress - 0.24) / 0.13, 2)) * 0.62 +
          Math.exp(-Math.pow((progress - 0.66) / 0.14, 2)) * 0.92 +
          0.08
        const pulse = 0.7 + Math.sin(progress * 23 + time * 0.0011) * 0.16
        const amplitude = rect.height * 0.42 * envelope * pulse
        const cyanMix = progress
        context.beginPath()
        context.moveTo(x, baseline - amplitude)
        context.lineTo(x, baseline + amplitude)
        context.strokeStyle = `rgba(${Math.round(188 - cyanMix * 95)}, ${Math.round(252 - cyanMix * 15)}, ${Math.round(cyanMix * 205)}, 0.92)`
        context.lineWidth = progress > 0.48 && progress < 0.74 ? 2.25 : 1.45
        context.shadowColor = 'rgba(187, 252, 0, 0.28)'
        context.shadowBlur = 7
        context.stroke()
      }

      const waveStart = meterWidth * 0.9
      const waveWidth = rect.width - waveStart
      for (let line = 0; line < 15; line += 1) {
        const offset = (line - 7) * 2.5
        context.beginPath()
        for (let x = waveStart; x <= rect.width; x += 2) {
          const progress = (x - waveStart) / waveWidth
          const envelope = Math.sin(progress * Math.PI) * 0.86 + 0.12
          const primary = Math.sin(progress * Math.PI * 4.25 + time * 0.00032 + line * 0.11)
          const secondary = Math.sin(progress * Math.PI * 8.5 - time * 0.00018 + line * 0.07) * 0.12
          const y = baseline + (primary + secondary) * rect.height * 0.28 * envelope + offset
          if (x === waveStart) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        const mix = line / 14
        context.strokeStyle = `rgba(${Math.round(187 - mix * 160)}, ${Math.round(252 - mix * 52)}, ${Math.round(20 + mix * 225)}, ${0.78 - Math.abs(line - 7) * 0.045})`
        context.lineWidth = line === 7 ? 1.7 : 0.85
        context.shadowColor = line === 7 ? 'rgba(187, 252, 0, 0.32)' : 'transparent'
        context.shadowBlur = line === 7 ? 8 : 0
        context.stroke()
      }

      if (!reduceMotion) animationFrame = window.requestAnimationFrame(draw)
    }

    draw(0)
    const handleResize = () => draw(reduceMotion ? 0 : performance.now())
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="cover-wave-canvas" aria-hidden="true" />
}

function FilmRun() {
  return (
    <div className="cover-film-run" aria-hidden="true">
      {filmFrames.map((frame) => (
        <span key={frame.index} className="cover-film-frame">
          <img src={frame.src} alt={frame.alt} />
          <b>{frame.index}</b>
        </span>
      ))}
    </div>
  )
}

export function VisibilitySignal() {
  return (
    <section id="top" className="cover-hero cover-hero--reference" aria-labelledby="cover-title">
      <svg className="cover-grain" aria-hidden="true">
        <filter id="cover-grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="12" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cover-grain-filter)" />
      </svg>
      <span className="cover-left-rail" aria-hidden="true" />
      <OrbitSignal />

      <div className="cover-frame">
        <div className="cover-topline cover-enter cover-enter--1">
          <span className="cover-portfolio-label">· PORTFOLIO · 2026</span>
        </div>

        <div className="cover-main">
          <h1 id="cover-title" className="cover-title cover-enter cover-enter--3">
            <span>让内容</span>
            <span>被看见。</span>
          </h1>
          <p className="cover-subtitle cover-enter cover-enter--5">
            好的内容不只是说了什么，还包括它如何被看到和记住
          </p>
        </div>

        <div className="cover-cinema cover-enter cover-enter--6" aria-label="作品影像与动态声波">
          <div className="cover-film" aria-hidden="true">
            <div className="cover-film-track">
              <FilmRun />
              <FilmRun />
            </div>
          </div>
          <SoundWave />
        </div>

        <div className="cover-footer cover-enter cover-enter--7">
          <div className="cover-actions">
            <a className="cover-button" href="#archive">浏览作品</a>
            <a className="cover-scroll" href="#archive">
              向下滚动
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
          <span className="cover-footer-rule" aria-hidden="true" />
          <span className="cover-signature">贾银玉</span>
        </div>
      </div>
    </section>
  )
}
