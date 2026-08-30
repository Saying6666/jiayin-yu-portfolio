import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'

const filmFrames = ['01', '02', '03', '04', '05', '06', '07', '08']

function FocusMark() {
  return (
    <svg className="cover-focus-mark" viewBox="0 0 72 72" role="img" aria-label="从隐藏到显现的视线标识">
      <circle className="cover-focus-orbit" cx="36" cy="36" r="27" />
      <path className="cover-focus-glow" d="M5 51C17 61 29 56 36 36S53 10 67 19" />
      <path className="cover-focus-line" d="M5 51C17 61 29 56 36 36S53 10 67 19" />
      <circle className="cover-focus-core" cx="36" cy="36" r="5" />
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

      const waves = [
        { alpha: 0.9, amplitude: 0.27, phase: 0, speed: 0.00022, width: 1.8 },
        { alpha: 0.5, amplitude: 0.2, phase: 1.75, speed: -0.00016, width: 1.15 },
        { alpha: 0.3, amplitude: 0.32, phase: 3.2, speed: 0.0001, width: 0.8 },
      ]

      waves.forEach((wave, index) => {
        context.beginPath()
        for (let x = 0; x <= rect.width; x += 2) {
          const progress = x / rect.width
          const envelope = 0.62 + Math.sin(progress * Math.PI) * 0.38
          const primary = Math.sin(progress * Math.PI * 2.15 + wave.phase + time * wave.speed)
          const harmonic = Math.sin(progress * Math.PI * 4.3 - wave.phase * 0.45 + time * wave.speed * 0.6)
          const y = rect.height / 2 + (primary + harmonic * 0.16) * rect.height * wave.amplitude * envelope
          if (x === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.strokeStyle = `rgba(187, 252, 0, ${wave.alpha})`
        context.lineWidth = wave.width
        context.shadowColor = index === 0 ? 'rgba(187, 252, 0, 0.2)' : 'transparent'
        context.shadowBlur = index === 0 ? 8 : 0
        context.stroke()
      })

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
      {filmFrames.map((frame, index) => (
        <span key={frame} className={`cover-film-frame cover-film-frame--${index + 1}`}>
          <i />
          <b>{frame}</b>
        </span>
      ))}
    </div>
  )
}

export function VisibilitySignal() {
  return (
    <section id="visibility" className="cover-hero" aria-labelledby="cover-title">
      <svg className="cover-grain" aria-hidden="true">
        <filter id="cover-grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="12" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cover-grain-filter)" />
      </svg>
      <span className="cover-left-rail" aria-hidden="true" />
      <span className="cover-editorial-quote" aria-hidden="true">“</span>

      <div className="cover-frame">
        <div className="cover-meta cover-enter cover-enter--1">
          <FocusMark />
          <span>PORTFOLIO · 2026</span>
        </div>

        <div className="cover-main">
          <div className="cover-discipline cover-enter cover-enter--2">
            <i aria-hidden="true" />
            <span>新闻传播学 · 作品集</span>
          </div>

          <h1 id="cover-title" className="cover-title">
            <span className="cover-enter cover-enter--3">让内容</span>
            <span className="cover-title-accent cover-enter cover-enter--4">被看见</span>
          </h1>

          <p className="cover-subtitle cover-enter cover-enter--5">
            好的内容不只是说了什么，还包括它如何被看到和记住
          </p>
        </div>

        <div className="cover-motion cover-enter cover-enter--6">
          <div className="cover-wave" aria-label="缓慢流动的三层声波">
            <SoundWave />
            <span>SIGNAL / 03</span>
          </div>
          <div className="cover-film" aria-label="缓慢横向滚动的电影胶片">
            <div className="cover-film-track">
              <FilmRun />
              <FilmRun />
            </div>
          </div>
        </div>

        <div className="cover-footer cover-enter cover-enter--7">
          <a className="cover-button" href="#archive">
            浏览作品
            <ArrowRight aria-hidden="true" />
          </a>
          <a className="cover-scroll" href="#archive">
            <span>
              <ArrowDown aria-hidden="true" />
            </span>
            向下滚动，探索更多作品
          </a>
          <span className="cover-signature">JIA YINYU</span>
        </div>
      </div>
    </section>
  )
}
