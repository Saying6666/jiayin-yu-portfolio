import { ArrowDown, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <main id="top" className="hero section-shell">
      <div className="hero-copy">
        <h1>
          把复杂议题，
          <br />
          讲成看得见的故事。
        </h1>
        <span className="hero-mark" aria-hidden="true" />
        <p>新闻写作 · 影像叙事 · 新媒体运营</p>
        <a className="primary-action" href="#featured">
          浏览作品
          <ArrowRight aria-hidden="true" />
        </a>
        <a className="scroll-cue" href="#featured">
          <span>
            <ArrowDown aria-hidden="true" />
          </span>
          向下滚动，探索更多作品
        </a>
      </div>

      <div className="hero-stage" aria-label="代表性作品拼贴">
        <figure className="stage-card stage-card--forum">
          <img
            src="/assets/visuals/academic-forum.png"
            alt="第七届中国政治传播研究学术论坛会议手册封面"
          />
        </figure>
        <figure className="stage-card stage-card--poster">
          <img src="/assets/visuals/recruitment-poster.png" alt="融媒体运营部纳新海报" />
        </figure>
        <figure className="stage-card stage-card--event">
          <img src="/assets/visuals/event-wall.png" alt="科普专题学习活动墙设计" />
        </figure>
        <figure className="stage-card stage-card--film">
          <img src="/assets/covers/orange-revival-alt2.jpg" alt="橙香里的绿色复兴视频画面" />
        </figure>

        <div className="folio-spines" aria-hidden="true">
          <span className="spine spine--blue">报道 / REPORT</span>
          <span className="spine">特稿 / FEATURE</span>
          <span className="spine spine--dark">影像 / VIDEO</span>
          <span className="spine spine--lime">运营 / OPERATIONS</span>
          <span className="spine">笔记 / NOTES</span>
        </div>
      </div>
    </main>
  )
}
