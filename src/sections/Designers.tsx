import type { CSSProperties } from 'react'
import { copy } from '../content/brand'
import { easeInOut, easeOut, seg, useProgress } from '../controller/context'
import { Avatar, MiniShot } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import './designers.css'

type V = CSSProperties & Record<string, string | number>
const SHOTS = [
  { cls: 'shot--s', hue: 140, v: 1, speed: 1.15 },
  { cls: 'shot--m', hue: 28, v: 2, speed: 1 },
  { cls: 'shot--l', hue: 200, v: 3, speed: 0.85 },
]

export function Designers({ i }: { i: number }) {
  const p = useProgress(i)
  const t = easeInOut(seg(p, 0.06, 0.42))
  const drop = easeOut(seg(p, 0.28, 0.48))
  const fly = seg(p, 0.3, 0.92)
  const cover = easeInOut(seg(p, 0.86, 1))
  const d = copy.designers

  return (
    <SectionShell i={i} label="Our designers" className="designers">
      <h2 className="designers__text">
        <span className="mask-line"><span className="reveal-tilt">{d.line1}</span></span>
        <span className="mask-line designers__hl"><span className="reveal-tilt" style={{ transitionDelay: '0.08s' }}>{d.line2}</span></span>
        <span className="designers__row">
          <span>{d.pre}</span>
          <span className="pill" style={{ '--t': t } as V}>
            {Array.from({ length: 9 }, (_, k) => (
              <span key={k} className="pill__av" style={{ '--k': k } as V}><Avatar seed={k} style={{ width: '100%', height: '100%' }} /></span>
            ))}
            <span className="pill__more" style={{ '--k': 9 } as V}>{d.more}</span>
          </span>
          <span>{d.post}</span>
        </span>
        <span className="designers__drop" style={{ opacity: drop, transform: `translate(-50%, ${(1 - drop) * 3}rem) scale(${0.5 + drop * 0.5})` }}>{d.drop}</span>
      </h2>

      <div className="designers__shots" aria-hidden="true">
        {SHOTS.map((s) => (
          <div key={s.cls} className={`shot ${s.cls}`} style={{ transform: `translateY(${(1 - fly * s.speed) * 110}vh)` }}>
            <MiniShot hue={s.hue} variant={s.v} />
          </div>
        ))}
      </div>

      <span className="designers__cover" style={{ transform: `translate(-50%, -50%) scale(${cover})` }} />
    </SectionShell>
  )
}
