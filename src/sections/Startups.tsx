import type { CSSProperties } from 'react'
import { copy, brand } from '../content/brand'
import { easeInOut, seg, useProgress, useStore } from '../controller/context'
import { Knot } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import './startups.css'

type V = CSSProperties & Record<string, string | number>

export function Startups({ i }: { i: number }) {
  const store = useStore()
  const p = useProgress(i)
  const line = seg(p, 0, 0.35)
  const rise = easeInOut(seg(p, 0.08, 0.3))
  const grow = easeInOut(seg(p, 0.3, 0.62))
  const cta = seg(p, 0.55, 0.75)
  const s = copy.startups

  return (
    <SectionShell i={i} label="For startups" className="startups">
      <svg className="startups__line" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 180 C 300 260, 520 420, 420 520 C 330 610, 180 520, 260 430 C 360 320, 900 360, 1180 300 C 1340 266, 1420 180, 1460 120" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.2" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - line }} />
      </svg>

      <h2 className="startups__statement" style={{ opacity: 1 - grow * 1.6 }}>
        {s.statement.map((l, k) => <span key={k} className="mask-line"><span className="reveal-up" style={{ transitionDelay: `${k * 0.08}s` }}>{l}</span></span>)}
      </h2>

      <div className="window" style={{ '--r': rise, '--g': grow } as V}>
        <Knot />
        <div className="window__cta" style={{ opacity: cta, transform: `translateY(${(1 - cta) * 2}rem)` }}>
          <h3>{s.cta.map((l) => <span key={l}>{l}</span>)}</h3>
          <button className="window__mark" onClick={() => store.jump(6)} aria-label={`Contact ${brand.name}`}>
            <svg viewBox="0 0 60 60"><circle cx="28" cy="28" r="20" fill="none" stroke="#fff" strokeWidth="9" /><circle cx="48" cy="48" r="6" fill="#fff" /></svg>
          </button>
        </div>
        <div className="window__marquee" style={{ opacity: cta }} aria-hidden="true">
          <div className="window__marquee-track">
            {[...s.clients, ...s.clients].map((c, k) => <span key={k}>{c}</span>)}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
