import { ArrowUpRight } from 'lucide-react'

export function AboutFooter() {
  return (
    <footer id="about" className="site-footer contact-footer">
      <div className="section-shell footer-grid">
        <div>
          <span className="footer-brand">JYY.</span>
          <h2>让重要的内容，被准确地看见。</h2>
        </div>

        <div className="footer-contact">
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

          <a className="footer-action" href="#top">
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
  )
}
