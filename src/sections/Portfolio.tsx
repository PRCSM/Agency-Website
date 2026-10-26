import { useEffect, useRef, type CSSProperties } from 'react'
import { copy, projects } from '../content/brand'
import { easeInOut, easeOut, seg, useProgress, useStore } from '../controller/context'
import { reducedMotion } from '../controller/store'
import { Orb, ProjectArt } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import './portfolio.css'

type V = CSSProperties & Record<string, string | number>
const S0 = 0.36
const S1 = 0.64

function Quote({ p }: { p: number }) {
  const chars = copy.portfolio.quote
  const lit = Math.floor(seg(p, 0.03, 0.22) * chars.length)
  let n = 0
  return (
    <p className="quote__text" aria-label={chars}>
      {chars.split(' ').map((w, wi) => (
        <span key={wi} className="quote__word" aria-hidden="true">
          {w.split('').map((ch, ci) => {
            const idx = n++
            return <span key={ci} className={idx < lit ? 'is-lit' : ''}>{ch}</span>
          })}
          {(n++, ' ')}
        </span>
      ))}
    </p>
  )
}

function Cube({ unfold }: { unfold: number }) {
  const a = (1 - unfold) * 68
  const lines = copy.portfolio.platforms
  const heights = [44, 44, 62, 50, 46, 44]
  let y = 0
  const block = (
    <svg viewBox="0 0 300 300" className="cube__svg" aria-hidden="true">
      {lines.map((l, k) => {
        y += heights[k]
        return <text key={l} x="0" y={y - 6} textLength="300" lengthAdjust="spacingAndGlyphs" style={{ fontSize: heights[k] }}>{l}</text>
      })}
    </svg>
  )
  return (
    <div className="cube" role="img" aria-label={lines.join(', ')}>
      <div className="cube__panel" style={{ transform: `rotateY(${a}deg)` }}>
        <div className="cube__slice">{block}</div>
        <div className="cube__panel cube__panel--next" style={{ transform: `rotateY(${-2 * a}deg)` }}>
          <div className="cube__slice" style={{ '--o': 1 } as V}>{block}</div>
          <div className="cube__panel cube__panel--next" style={{ transform: `rotateY(${2 * a}deg)` }}>
            <div className="cube__slice" style={{ '--o': 2 } as V}>{block}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Confetti({ on }: { on: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!on || !ref.current) return
    const c = ref.current
    const ctx = c.getContext('2d')!
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr }
    resize()
    const colors = ['#f5c443', '#b0a8d5', '#7a6bf2', '#4d86da', '#f2a1c0']
    const dots = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), r: 2 + Math.random() * 5, vx: (Math.random() - 0.5) * 0.0004, vy: -0.0002 - Math.random() * 0.0005, c: colors[Math.floor(Math.random() * colors.length)] }))
    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      for (const d of dots) {
        if (!reducedMotion) { d.x += d.vx; d.y += d.vy; if (d.y < -0.05) { d.y = 1.05; d.x = Math.random() } }
        ctx.beginPath(); ctx.fillStyle = d.c; ctx.arc(d.x * c.width, d.y * c.height, d.r * dpr, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [on])
  return <canvas ref={ref} className="confetti" aria-hidden="true" />
}

function Discs({ on }: { on: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!on || !ref.current || window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    const discs = [...el.children] as HTMLElement[]
    const pos = discs.map(() => ({ x: innerWidth / 2, y: innerHeight / 2 }))
    let mx = innerWidth / 2, my = innerHeight / 2, raf = 0
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      discs.forEach((d, k) => {
        const f = [0.08, 0.12, 0.18][k]
        pos[k].x += (mx - pos[k].x) * f; pos[k].y += (my - pos[k].y) * f
        d.style.transform = `translate(${pos[k].x}px, ${pos[k].y}px) translate(-50%, -50%)`
      })
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move)
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move) }
  }, [on])
  return <div ref={ref} className="discs" aria-hidden="true"><span /><span /><span /></div>
}

export function Portfolio({ i }: { i: number }) {
  const store = useStore()
  const p = useProgress(i)
  const charP = seg(p, 0.03, 0.22)
  const quoteOut = easeInOut(seg(p, 0.25, 0.36))
  const sliderIn = easeInOut(seg(p, 0.25, 0.36))
  const sliderOut = easeInOut(seg(p, 0.64, 0.72))
  const active = Math.round(seg(p, S0, S1) * (projects.length - 1))
  const waveIn = seg(p, 0.66, 0.8)
  const panel = easeInOut(seg(p, 0.72, 0.8))
  const unfold = easeOut(seg(p, 0.8, 0.96))
  const dPhase = p > 0.7

  return (
    <SectionShell i={i} label="Selected work" className="portfolio">
      {/* A — quote */}
      <div className="quote" style={{ transform: `translateY(${-quoteOut * 100}vh)` }}>
        <span className="quote__glyph" aria-hidden="true">”</span>
        <Quote p={p} />
        <div className="quote__circles" aria-hidden="true">
          {[0, 1, 2].map((k) => <span key={k} style={{ opacity: seg(charP, k * 0.25, k * 0.25 + 0.4), transform: `translateX(${(1 - seg(charP, k * 0.25, k * 0.25 + 0.4)) * 5.75}rem)` }} />)}
        </div>
        <span className="quote__bar" aria-hidden="true"><i style={{ transform: `scaleY(${charP})` }} /></span>
        <p className="quote__caption" style={{ opacity: seg(charP, 0.6, 1) }}>{copy.portfolio.caption}</p>
      </div>

      {/* B — slider */}
      <div className="slider" style={{ transform: `translateY(${(1 - sliderIn) * 100 - sliderOut * 100}vh)` }}>
        <div className="slider__track" style={{ '--a': active } as V}>
          {projects.map((pr, k) => (
            <figure key={pr.title} className={`slide ${k === active ? 'is-active' : ''}`} aria-hidden={k !== active}>
              <div className="slide__img"><ProjectArt {...pr} /></div>
              <figcaption className="slide__title" key={k === active ? 'on' : 'off'}>
                {pr.title.toUpperCase().split('').map((ch, ci) => <span key={ci} style={{ transitionDelay: `${0.2 + ci * 0.012}s` }}>{ch}</span>)}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="slider__pagination">
          <div className="slider__bullets" role="tablist" aria-label="Projects">
            {projects.map((pr, k) => (
              <button key={k} role="tab" aria-selected={k === active} aria-label={pr.title} className={k === active ? 'is-active' : ''} onClick={() => store.setProgress(S0 + (k / (projects.length - 1)) * (S1 - S0) + 0.001)} />
            ))}
          </div>
          <p className="slider__count">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
        </div>
      </div>

      {/* C — followers wave */}
      <div className="wave" style={{ opacity: seg(p, 0.64, 0.7), transform: `translateY(${(1 - easeOut(seg(p, 0.62, 0.72))) * 60}vh)` }} aria-hidden={p < 0.62}>
        <div className="wave__orb"><Orb /></div>
        <svg className="wave__svg" viewBox="0 0 1440 420" preserveAspectRatio="none">
          <path id="wavePath" d="M-200 260 C 120 80, 380 380, 720 220 S 1240 60, 1640 240" fill="none" stroke="rgba(255,255,255,.15)" />
          <text><textPath href="#wavePath" startOffset={`${-40 + waveIn * 40}%`}>{copy.portfolio.followers.repeat(4)}</textPath></text>
        </svg>
      </div>

      {/* D — following panel */}
      <div className="following" style={{ transform: `translateY(${(1 - panel) * 100}%)` }}>
        <Confetti on={dPhase} />
        <Cube unfold={unfold} />
        <Discs on={dPhase} />
      </div>
    </SectionShell>
  )
}
