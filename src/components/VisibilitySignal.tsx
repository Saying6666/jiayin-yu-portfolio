import { ArrowDown, ArrowRight } from 'lucide-react'

export function VisibilitySignal() {
  return (
    <section id="visibility" className="editorial-section section-shell reveal">
      <div className="editorial-spread">
        <div className="editorial-spread-copy">
          <span className="editorial-spread-index">02—03 / EDITORIAL BOARD</span>
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
          <span className="editorial-spread-note">LAYOUT / IMAGE / RHYTHM</span>
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
