export function VisibilitySignal() {
  return (
    <section id="visibility" className="visibility-section section-shell reveal">
      <div className="visibility-plate">
        <div className="visibility-statement">
          <span className="visibility-index">01—03 / EDITORIAL SIGNAL</span>
          <h2>
            让内容，
            <br />
            被看见
          </h2>
          <p>好的内容不只是说了什么，还包括它如何被看到和记住</p>
        </div>

        <div className="visibility-map" aria-label="内容从阅读到记忆的视觉路径">
          <div className="visibility-labels" aria-hidden="true">
            <span>READ</span>
            <i />
            <span>FRAME</span>
            <i />
            <span>REMEMBER</span>
          </div>

          <svg className="visibility-path" viewBox="0 0 620 360" role="img">
            <title>从阅读、编排到记忆的内容路径</title>
            <path className="visibility-path-line" d="M36 276 C 142 276, 148 206, 254 206 S 360 102, 470 102 S 538 72, 584 72" />
            <path className="visibility-path-guide" d="M36 276 H36 M254 206 V44 M470 102 V44 M584 72 V22" />
            <circle className="visibility-path-node" cx="36" cy="276" r="8" />
            <circle className="visibility-path-node" cx="254" cy="206" r="8" />
            <circle className="visibility-path-node" cx="470" cy="102" r="8" />
            <circle className="visibility-path-node visibility-path-node--final" cx="584" cy="72" r="10" />
            <path className="visibility-corner" d="M12 300 V270 H42 M230 230 V200 H260 M446 126 V96 H476 M560 96 V66 H590" />
          </svg>

          <div className="visibility-notes" aria-hidden="true">
            <span>signal / 01</span>
            <span>signal / 02</span>
            <span>signal / 03</span>
          </div>
        </div>
      </div>
    </section>
  )
}
