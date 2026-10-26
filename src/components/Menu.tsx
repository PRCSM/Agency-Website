import { useEffect, useState } from 'react'
import { brand } from '../content/brand'
import { useStore } from '../controller/context'
import { Blobs, Knot, Orb, Reel } from './art'
import { Roll, trackBlob } from './ui'
import './menu.css'

const ITEMS = [
  { label: 'About Us', to: 1, p: 0, bg: '#282643' },
  { label: 'What We Do', to: 2, p: 0, bg: '#e3f6f5' },
  { label: 'Our Works', to: 4, p: 0.35, bg: '#b9e8e8' },
  { label: 'Contact Us', to: 6, p: 0, bg: '#2a6a8d' },
]
const ART = [<Orb key="o" />, <Blobs key="b" variant="spheres" />, <Reel key="r" />, <Knot key="k" />]

export function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const store = useStore()
  const [hovered, setHovered] = useState(0)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const go = (to: number, p: number) => { onClose(); window.setTimeout(() => store.jump(to, p), 250) }

  return (
    <div id="site-menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="menu__social">
        <span className="menu__label">Social</span>
        {brand.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="menu__social-link roll-host">
            <Roll>{s.label}</Roll>
          </a>
        ))}
      </div>

      <div className="menu__img" aria-hidden="true">
        {ITEMS.map((it, i) => (
          <div key={it.label} className={`menu__crop ${i <= hovered ? 'is-shown' : ''}`} style={{ background: it.bg, zIndex: i }}>
            {open && i <= hovered && <div className="menu__art">{ART[i]}</div>}
          </div>
        ))}
      </div>

      <nav className="menu__nav" aria-label="Menu">
        <span className="menu__label">Menu</span>
        {ITEMS.map((it, i) => (
          <button key={it.label} className="menu__link roll-host blob-host" onMouseEnter={() => setHovered(i)} onFocus={() => setHovered(i)} onMouseMove={trackBlob} onClick={() => go(it.to, it.p)}>
            <Roll>{it.label}</Roll>
            <span className="blob" />
          </button>
        ))}
      </nav>

      <div className="menu__mail">
        <span className="menu__label">Get in touch</span>
        <a href={`mailto:${brand.email}`} className="underlink">{brand.email}</a>
      </div>
      <div className="menu__cp">
        <a href={brand.privacyUrl}>Privacy Policy &amp; Cookies</a>
        <p>© {brand.legalName} {brand.year}</p>
      </div>
    </div>
  )
}
