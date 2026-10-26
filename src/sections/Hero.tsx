import { useState, type CSSProperties, type MouseEvent } from 'react'
import { brand, copy } from '../content/brand'
import { easeInOut, useProgress } from '../controller/context'
import { Reel } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import { Rating } from '../components/ui'
import './hero.css'

const SHOWREEL = import.meta.env.VITE_SHOWREEL_URL as string | undefined

function Badge() {
  const text = copy.hero.badge
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="badge__ring">
        <defs><path id="badgeCircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text><textPath href="#badgeCircle" textLength="238">{text}</textPath></text>
      </svg>
      <svg viewBox="0 0 60 40" className="badge__eye">
        <g className="badge__lashes" stroke="#111" strokeWidth="1.6" strokeLinecap="round"><path d="M14 10l-3-5M22 7l-1-5M30 6V1M38 7l1-5M46 10l3-5" /></g>
        <path d="M6 20c7-8 15-11 24-11s17 3 24 11c-7 8-15 11-24 11S13 28 6 20Z" fill="#f2e8ff" />
        <g className="badge__pupil"><circle cx="30" cy="20" r="8" fill="#111" /><circle cx="27" cy="17" r="2.2" fill="#fff" /></g>
        <path d="M6 20c7-8 15-11 24-11s17 3 24 11" fill="none" stroke="#111" strokeWidth="1.6" />
        <circle cx="52" cy="30" r="2" fill="#8de746" />
      </svg>
    </div>
  )
}

export function Hero({ i }: { i: number }) {
  const p = useProgress(i)
  const e = easeInOut(p)
  const [play, setPlay] = useState<{ x: number; y: number } | null>(null)
  const [open, setOpen] = useState(false)

  const onMove = (ev: MouseEvent<HTMLDivElement>) => {
    const r = ev.currentTarget.getBoundingClientRect()
    setPlay({ x: ev.clientX - r.left, y: ev.clientY - r.top })
  }

  return (
    <SectionShell i={i} label="Intro" className="hero">
      <div className="hero__content" style={{ '--e': e } as CSSProperties}>
        <h1 className="hero__title">
          {copy.hero.lines.map((l, k) => (
            <span className="mask-line" key={k}><span className="reveal-up" style={{ transitionDelay: `${k * 0.05}s` }}>{l}</span>{' '}</span>
          ))}
        </h1>
        <div className="hero__meta">
          <Rating />
          <p className="hero__services">
            {copy.hero.services.map((s, k) => (
              <span className="mask-line" key={k}><span className="reveal-up" style={{ transitionDelay: `${0.6 + k * 0.1}s` }}>{s}</span></span>
            ))}
          </p>
        </div>
        <Badge />
        <a className="deck-pill hero__deck" href={brand.deckUrl}>Our Capabilities Deck</a>
      </div>

      <div
        className="hero__frame"
        style={{ '--e': e } as CSSProperties}
        onMouseMove={onMove}
        onMouseLeave={() => setPlay(null)}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Play showreel"
        onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setOpen(true) } }}
      >
        <Reel />
        <span className="play" style={play ? { left: play.x, top: play.y } : undefined}><i /></span>
      </div>
      <a className="deck-pill hero__deck-m" href={brand.deckUrl}>Our Capabilities Deck</a>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Showreel" onClick={() => setOpen(false)}>
          <button className="lightbox__close" onClick={() => setOpen(false)} aria-label="Close showreel">×</button>
          <div className="lightbox__body" onClick={(ev) => ev.stopPropagation()}>
            {SHOWREEL ? (
              <video src={SHOWREEL} controls autoPlay playsInline />
            ) : (
              <>
                <Reel />
                <p className="lightbox__note">Showreel placeholder — set <code>VITE_SHOWREEL_URL</code> to play your own video here.</p>
              </>
            )}
          </div>
        </div>
      )}
    </SectionShell>
  )
}
