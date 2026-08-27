import { ArrowUpRight } from 'lucide-react'

export function AboutFooter() {
  return (
    <>
      <section id="about" className="about-section reveal">
        <div className="section-shell about-grid">
          <h2>在现场与版面之间，记录一条信息如何被看见。</h2>
          <div>
            <p>
              这是一套跨越评论写作、深度报道、纪实影像、公众号运营与编辑设计的新闻传播作品档案。每一种媒介保留自己的阅读方式，同时共享同一套清晰、诚实的叙事秩序。
            </p>
            <dl>
              <div>
                <dt>写作</dt>
                <dd>公共议题评论、人物特写、调查报道</dd>
              </div>
              <div>
                <dt>影像</dt>
                <dd>纪实短片、视频调查、创意微电影</dd>
              </div>
              <div>
                <dt>编辑</dt>
                <dd>周刊主编、活动策划、视觉传播</dd>
              </div>
            </dl>

            <div className="contact-block">
              <span className="utility-line">CONTACT / 04</span>
              <dl className="contact-list">
                <div>
                  <dt>姓名</dt>
                  <dd>贾银玉</dd>
                </div>
                <div>
                  <dt>学校</dt>
                  <dd>重庆大学</dd>
                </div>
                <div>
                  <dt>电话</dt>
                  <dd><a href="tel:19823434227">19823434227</a></dd>
                </div>
                <div>
                  <dt>微信</dt>
                  <dd>jyy2715750</dd>
                </div>
                <div>
                  <dt>邮箱</dt>
                  <dd><a href="mailto:jiayinyu_cqu@163.com">jiayinyu_cqu@163.com</a></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div>
            <span className="footer-brand">JYY.</span>
            <h2>让重要的内容，被准确地看见。</h2>
          </div>
          <div className="footer-action">
            <a href="#top">
              回到顶部
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>贾银玉 · 新闻传播作品集</span>
          <span>内容更新至 2026</span>
        </div>
      </footer>
    </>
  )
}
