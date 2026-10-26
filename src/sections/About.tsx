import { useEffect, useRef, useState } from 'react'
import { copy } from '../content/brand'
import { useProgress, useStore } from '../controller/context'
import { Blobs } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import './about.css'

const THEMES = [
  { bg: 'var(--c-pink-100)', art: 'spheres' as const },
  { bg: 'var(--c-green-100)', art: 'rings' as const },
  { bg: 'var(--c-purple-100)', art: 'petals' as const },
]

export function About({ i }: { i: number }) {
  const store = useStore()
  const p = useProgress(i)
  const rowRef = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const [vertical, setVertical] = useState(false)

  useEffect(() => {
    const measure = () => {
      const row = rowRef.current
      if (!row) return
      const v = window.innerWidth <= 576
      setVertical(v)
      const d = v ? row.scrollHeight - window.innerHeight : row.scrollWidth - window.innerWidth
      setDist(Math.max(1, d))
      store.setLengthFn(i, () => Math.max(1, d))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (rowRef.current) ro.observe(rowRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [store, i])

  const offset = -p * dist
  return (
    <SectionShell i={i} label="About" className="about">
      <div ref={rowRef} className="about__row" style={{ transform: vertical ? `translate3d(0, ${offset}px, 0)` : `translate3d(${offset}px, 0, 0)` }}>
        <h2 className="about__heading">
          {copy.about.heading.map((l, k) => (
            <span className="mask-line" key={k}><span className="reveal-tilt" style={{ transitionDelay: `${k * 0.08}s` }}>{l}</span></span>
          ))}
        </h2>
        {copy.about.cards.map((c, k) => (
          <article key={k} className="about-card" style={{ background: THEMES[k].bg }}>
            <span className="about-card__circle" />
            <span className="about-card__circle about-card__circle--2" />
            <div className="about-card__media"><Blobs variant={THEMES[k].art} /></div>
            <h3 className="about-card__title">{c.title}</h3>
            <p className="about-card__body">{c.body}</p>
            <span className="about-card__index">{String(k + 1).padStart(2, '0')}</span>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
