import { Menu, X } from 'lucide-react'

type HeaderProps = {
  menuOpen: boolean
  onMenuToggle: () => void
  onNavigate: () => void
}

const links = [
  { href: '#archive', label: '作品' },
  { href: '#about', label: '关于' },
]

export function Header({ menuOpen, onMenuToggle, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="返回首页" onClick={onNavigate}>
        JYY. <span>/ 贾银玉</span>
      </a>

      <nav className="desktop-nav" aria-label="主导航">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={onNavigate}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={onMenuToggle}
      >
        <span>{menuOpen ? '关闭' : '菜单'}</span>
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label="移动端导航"
      >
        {links.map((link, index) => (
          <a key={link.href} href={link.href} onClick={onNavigate}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
