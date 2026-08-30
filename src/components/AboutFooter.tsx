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

export function AboutFooter() {
  return (
    <footer id="about" className="ending-footer">
      <div className="ending-visual">
        <img
          src="/assets/visuals/contact-hero-reference.jpg"
          alt="让重要的内容，被准确地看见。镜头与环形线条构成的黑绿色视觉画面"
        />
      </div>

      <div className="ending-contact-shell section-shell">
        <h2>CONTACT / 联系</h2>

        <dl className="ending-contact-grid">
          {contactItems.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.href ? <a href={item.href}>{item.value}</a> : item.value}</dd>
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
