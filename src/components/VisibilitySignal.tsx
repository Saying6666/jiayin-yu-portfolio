import { ArrowDown, ArrowRight } from 'lucide-react'

export function VisibilitySignal() {
  return (
    <section id="visibility" className="editorial-section section-shell reveal">
      <div className="editorial-spread">
        <div className="editorial-spread-copy">
          <span className="editorial-spread-index">LAYOUT / IMAGE / RHYTHM</span>
          <div className="visibility-mark" aria-hidden="true">
            <svg viewBox="0 0 180 132" role="presentation">
              <circle className="visibility-mark-orbit" cx="90" cy="62" r="43" />
              <circle className="visibility-mark-core" cx="90" cy="62" r="18" />
              <path className="visibility-mark-swoop" d="M18 97C42 119 72 112 90 62S138 6 162 34" />
              <circle className="visibility-mark-point" cx="90" cy="62" r="3.5" />
            </svg>
          </div>
          <h2>
            让内容，
            <br />
            被看见
          </h2>
          <p>好的内容不只是说了什么，还包括它如何被看到和记住</p>
          <div className="editorial-spread-actions">
            <a className="primary-action" href="#archive">
              浏览作品
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="scroll-cue" href="#archive">
              <span>
                <ArrowDown aria-hidden="true" />
              </span>
              向下滚动，探索更多作品
            </a>
          </div>
          <div className="editorial-spread-rule" aria-hidden="true" />
        </div>

        <figure className="editorial-spread-image">
          <img
            src="/assets/visuals/editorial-board.jpg"
            alt="纸张、印刷定位线与胶片编排的编辑台视觉"
          />
          <figcaption>
            <span>EDITORIAL BOARD</span>
            <b>03 / 24</b>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
