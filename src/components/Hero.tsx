export function Hero() {
  return (
    <main id="top" className="hero section-shell">
      <div className="hero-copy">
        <h1>
          让内容，
          <br />
          被看见
        </h1>
        <span className="hero-mark" aria-hidden="true" />
        <p>新闻写作 · 影像叙事 · 新媒体运营</p>
      </div>

      <div className="hero-stage hero-stage--index" aria-label="编辑台视觉索引">
        <div className="hero-index-sheet">
          <span className="hero-index-corner hero-index-corner--top" aria-hidden="true" />
          <span className="hero-index-meta">ARCHIVE / 2026—01</span>
          <div className="hero-index-frame hero-index-frame--dark">
            <span>FIELD NOTES</span>
            <i aria-hidden="true" />
            <b>01</b>
          </div>
          <figure className="hero-index-frame hero-index-frame--image">
            <img src="/assets/visuals/editorial-board.jpg" alt="纸张、印刷定位线与胶片编排的编辑台视觉" />
            <figcaption>CONTENT / CONTEXT / IMPACT</figcaption>
          </figure>
          <div className="hero-index-frame hero-index-frame--lime">
            <span>MAKE IT LEGIBLE</span>
            <b aria-hidden="true">→</b>
          </div>
          <span className="hero-index-corner hero-index-corner--bottom" aria-hidden="true" />
        </div>
      </div>
    </main>
  )
}
