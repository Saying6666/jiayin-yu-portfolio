import { useEffect, useState } from 'react'
import { AboutFooter } from './components/AboutFooter'
import { Archive } from './components/Archive'
import { Header } from './components/Header'
import { MediaSections } from './components/MediaSections'
import { VisibilitySignal } from './components/VisibilitySignal'
import { WorkDialog } from './components/WorkDialog'
import { getWorkById } from './data/works'
import type { Work } from './types'

function workFromHash() {
  const match = window.location.hash.match(/^#work=(.+)$/)
  return match ? getWorkById(decodeURIComponent(match[1])) ?? null : null
}

export default function App() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(() => workFromHash())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleHistory = () => setSelectedWork(workFromHash())
    window.addEventListener('popstate', handleHistory)
    return () => window.removeEventListener('popstate', handleHistory)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const openWork = (work: Work) => {
    setMenuOpen(false)
    setSelectedWork(work)
    window.history.pushState(null, '', `#work=${encodeURIComponent(work.id)}`)
  }

  const closeWork = () => {
    setSelectedWork(null)
    window.history.pushState(null, '', '#archive')
  }

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />
      <VisibilitySignal />
      <Archive onOpen={openWork} />
      <MediaSections onOpen={openWork} />
      <AboutFooter />
      <WorkDialog work={selectedWork} onClose={closeWork} />
    </>
  )
}
