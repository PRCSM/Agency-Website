import { useEffect, useState } from 'react'
import { useControllerState, useProgress, useStore } from '../controller/context'
import { Face } from './art'
import { Logo, Roll, trackBlob } from './ui'
import './header.css'

export const NAV = [
  { label: 'Home', to: 0, p: 0 },
  { label: 'About', to: 1, p: 0 },
  { label: 'Works', to: 4, p: 0.8 },
  { label: 'Contact us', to: 6, p: 0 },
]

export function Header({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  const store = useStore()
  const { index } = useControllerState()
  const pPortfolio = useProgress(4)
  const pDesigners = useProgress(3)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 150); return () => clearTimeout(t) }, [])

  const dark = !menuOpen && ((index === 3 && pDesigners > 0.93) || (index === 4 && pPortfolio < 0.74) || index === 5)

  return (
    <header className={`header ${loaded ? 'is-loaded' : ''} ${dark ? 'is-dark' : ''} ${menuOpen ? 'is-menu' : ''}`}>
      <button className="header__logo" onClick={() => store.jump(0)} aria-label="Go to top">
        <Logo />
      </button>
      <nav className="header__nav" aria-label="Main">
        {NAV.map((n) => (
          <button key={n.label} className="header__link roll-host blob-host" onMouseMove={trackBlob} onClick={() => store.jump(n.to, n.p)}>
            <Roll>{n.label}</Roll>
            <span className="blob" />
          </button>
        ))}
      </nav>
      <div className="header__buttons">
        <button className="talk blob-host" onMouseMove={trackBlob} onClick={() => store.jump(6)}>
          <span className="talk__dot" />
          <span className="talk__text">Let's Talk!</span>
          <span className="talk__avatar"><Face style={{ width: '100%', height: '100%' }} /><i /></span>
          <span className="blob" />
        </button>
        <button className="burger" onClick={onMenu} aria-expanded={menuOpen} aria-controls="site-menu">
          <span className="burger__labels" aria-hidden="true">
            <span>menu</span>
            <span>Close</span>
          </span>
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="burger__lines"><i /><i /></span>
        </button>
      </div>
    </header>
  )
}
