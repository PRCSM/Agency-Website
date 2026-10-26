/**
 * Original illustrative stand-ins for the reference's proprietary 3D videos,
 * photos and client work. Pure CSS/SVG, animated, resolution independent.
 */
import { useId, type CSSProperties } from 'react'
import './art.css'

type V = CSSProperties & Record<string, string | number>

/** Pill-shaped media used on the About cards. */
export function Blobs({ variant }: { variant: 'spheres' | 'rings' | 'petals' }) {
  const items = {
    spheres: [
      [8, 30, 26, 230], [30, 5, 34, 240], [55, 35, 22, 228], [70, 0, 30, 236], [20, 60, 24, 244], [82, 50, 20, 232], [45, 70, 18, 238], [62, 18, 14, 250],
    ],
    rings: [
      [10, 25, 30, 8], [35, 0, 36, 355], [58, 30, 28, 0], [78, 5, 30, 10], [25, 62, 24, 350], [68, 62, 26, 4], [48, 45, 18, 0],
    ],
    petals: [
      [12, 20, 22, 345], [32, 52, 26, 352], [52, 10, 30, 340], [72, 44, 24, 348], [86, 8, 18, 355], [42, 0, 16, 338],
    ],
  }[variant]
  return (
    <div className={`blobs blobs--${variant}`}>
      {items.map(([x, y, s, h], i) => (
        <span key={i} className="blobs__item" style={{ '--x': `${x}%`, '--y': `${y}%`, '--s': `${s}%`, '--h': h, '--d': `${i * -0.7}s` } as V} />
      ))}
    </div>
  )
}

/** Hero showreel stand-in: pastel desk scene with floating shapes and a laptop. */
export function Reel() {
  return (
    <div className="reel">
      <div className="reel__wall" />
      <div className="reel__window" />
      <div className="reel__shadow" />
      <span className="reel__shape reel__shape--squiggle" />
      <span className="reel__shape reel__shape--ball" />
      <span className="reel__shape reel__shape--ring" />
      <span className="reel__shape reel__shape--pill" />
      <div className="reel__laptop">
        <div className="reel__screen">
          <div className="reel__ui">
            <i /><i /><i />
            <b />
            <em />
          </div>
        </div>
        <div className="reel__base" />
      </div>
      <div className="reel__desk" />
    </div>
  )
}

const AV_COLORS = [
  ['#f9d4c4', '#e78f6f'], ['#d8d0f7', '#8a7ee0'], ['#c9eee6', '#47b39b'], ['#ffe2a8', '#e3a73c'], ['#f3c6dd', '#c9568f'],
  ['#cfe3ff', '#4d86da'], ['#e2e2e2', '#7d7d7d'], ['#d5f2c0', '#6bb043'], ['#fbd0d0', '#d65b5b'],
]
/** Abstract avatar (no real people). */
export function Avatar({ seed, style }: { seed: number; style?: CSSProperties }) {
  const [a, b] = AV_COLORS[seed % AV_COLORS.length]
  const gid = `av${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 40 40" className="avatar" style={style} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill={`url(#${gid})`} />
      <circle cx="20" cy="16" r="6.5" fill="#fff" opacity=".85" />
      <path d="M8 35c2.2-6.4 7-9.4 12-9.4s9.8 3 12 9.4" fill="#fff" opacity=".85" />
    </svg>
  )
}

/** Friendly character used beside "Got a great idea?" and in the mobile talk pill. */
export function Face({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 60" className="face" style={style} aria-hidden="true">
      <circle cx="30" cy="30" r="30" fill="#f7d2c6" />
      <circle cx="30" cy="33" r="17" fill="#ffe0bd" />
      <path d="M13 28c1-11 9-16 17-16s16 5 17 16c-4-5-9-7-17-7s-13 2-17 7Z" fill="#3b2a24" />
      <g className="face__eyes"><rect x="20" y="30" width="7" height="5" rx="2.4" fill="#111" /><rect x="33" y="30" width="7" height="5" rx="2.4" fill="#111" /><path d="M27 32h6" stroke="#111" strokeWidth="1.4" /></g>
      <path d="M25 41c3 2.4 7 2.4 10 0" stroke="#b5533c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Fictional project cards for the portfolio slider. */
export function ProjectArt({ kind, hue, title, tag, year }: { kind: string; hue: number; title: string; tag: string; year: string }) {
  const style = { '--h': hue } as V
  return (
    <div className={`proj proj--${kind}`} style={style}>
      <div className="proj__chips"><span className="proj__logo" /><span>{year}</span><span>{tag}</span></div>
      <p className="proj__title">{title.split(' ').slice(0, 2).join(' ')}<br />— made with care</p>
      <div className="proj__device">
        <div className="proj__screen">
          <i /><i /><i /><b /><em />
        </div>
      </div>
      <span className="proj__orb proj__orb--a" />
      <span className="proj__orb proj__orb--b" />
    </div>
  )
}

/** Small looping orb (stand-in for the circular hand video). */
export function Orb() {
  return (
    <div className="orb"><span /><span /><span /></div>
  )
}

/** Startups window art: soft lilac backdrop with a looping knotted tube. */
export function Knot() {
  return (
    <div className="knot">
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="tube" x1="0" x2="1">
            <stop offset="0" stopColor="#4d63e8" />
            <stop offset=".5" stopColor="#7a72f0" />
            <stop offset="1" stopColor="#4d63e8" />
          </linearGradient>
        </defs>
        <path className="knot__tube" d="M-40 300 C 120 290 260 300 360 296 C 420 292 430 210 400 160 C 370 110 330 140 345 200 C 360 270 430 320 470 300 C 520 276 640 300 840 310" stroke="url(#tube)" strokeWidth="34" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/** Small project screenshots that float in the designers scene. */
export function MiniShot({ hue, variant }: { hue: number; variant: number }) {
  return (
    <div className={`mini mini--${variant}`} style={{ '--h': hue } as V}>
      <div className="mini__nav"><span /><i /><i /><i /></div>
      <p>Start something<br />worth sharing</p>
      <span className="mini__art" />
    </div>
  )
}
