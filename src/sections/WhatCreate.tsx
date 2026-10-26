import type { CSSProperties } from 'react'
import { copy } from '../content/brand'
import { easeInOut, easeOut, seg, useProgress } from '../controller/context'
import { Avatar } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import './whatcreate.css'

type V = CSSProperties & Record<string, string | number>

export function Landscape() {
  return (
    <svg className="landscape" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8c7bd8" /><stop offset=".55" stopColor="#f2b7c4" /><stop offset="1" stopColor="#ffd9b8" /></linearGradient>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f63c9" /><stop offset="1" stopColor="#3f3796" /></linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2f86" /><stop offset="1" stopColor="#1f1a55" /></linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#sky)" />
      <circle className="landscape__sun" cx="300" cy="150" r="26" fill="#fff4e0" />
      <g className="landscape__clouds" fill="#ffe3e8" opacity=".7"><ellipse cx="80" cy="70" rx="50" ry="8" /><ellipse cx="250" cy="55" rx="70" ry="9" /><ellipse cx="360" cy="95" rx="40" ry="6" /></g>
      <path d="M0 170 Q80 140 160 160 T320 150 T400 160 V260 H0Z" fill="url(#hill1)" opacity=".85" />
      <g fill="#2d2670">
        <path d="M250 175c-14-8-30-6-40 2 10-2 18 0 22 4-8 0-14 3-18 8 12-3 22-2 30 2V215h6v-24c8-4 18-5 30-2-4-5-10-8-18-8 4-4 12-6 22-4-10-8-26-10-40-2Z" />
        <path d="M60 182c-10-6-22-4-30 2 8-1 13 1 16 3-6 0-10 2-13 6 9-2 16-1 22 2v20h5v-18c6-3 13-4 22-2-3-4-7-6-13-6 3-3 9-4 16-3-8-6-19-8-28-2Z" />
      </g>
      <path d="M0 205 Q100 185 200 200 T400 196 V260 H0Z" fill="url(#hill2)" />
      <path d="M140 260c-4-30 6-60 22-84 6 10 4 22-2 34 8-6 16-6 22-2-10 8-16 22-18 52Z" fill="#17123f" />
    </svg>
  )
}

const CURSORS = [
  { name: 'Ava', x: 3, y: 9, c: '#9b8cf0' }, { name: 'Leo', x: 35, y: 15, c: '#e46aa8' }, { name: 'Mira', x: 97, y: 18, c: '#5cc46d' },
  { name: 'Kenji', x: 27, y: 92, c: '#e2504f' }, { name: 'Zoe', x: 64, y: 95, c: '#e7c13f' }, { name: 'Omar', x: 97, y: 60, c: '#7a6bf2' },
]

function Dashboard() {
  return (
    <div className="dash">
      <aside className="dash__side"><span className="dash__logo" />{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} />)}</aside>
      <div className="dash__main">
        <div className="dash__top"><span>Projects</span><span>Planning</span><span>Calendar</span><em>Search tasks…</em><b>+ New task</b><Avatar seed={3} style={{ width: '1.4rem' }} /></div>
        <div className="dash__stats">
          <div><small>New projects</small><strong>+12 tasks</strong><span className="dash__bars"><i /><i /><i /><i /></span></div>
          <div><small>Upcoming</small><strong>18</strong><span className="dash__hint">+21% this week</span></div>
          <div><small>Completed</small><strong>9</strong><span className="dash__hint">vs last sprint</span></div>
          <div><small>Weekly goal</small><strong>64%</strong><span className="dash__progress"><i /></span></div>
        </div>
        <p className="dash__label">Team: <b>Product Studio</b></p>
        <h4 className="dash__title">Today’s Focus</h4>
        <div className="dash__cols">
          {['Backlog', 'In progress', 'Shipped'].map((col, k) => (
            <div key={col} className="dash__col">
              <p className="dash__colhead"><i style={{ background: ['#f2a640', '#4d86ff', '#3ccf7a'][k] }} />{col}</p>
              <div className="dash__card">
                <p>{['Marketing site', 'Illustration set', 'Icon library'][k]}</p>
                <span className="dash__tags"><i /><i /></span>
                {k === 1 ? <div className="dash__slot"><Landscape /></div> : <span className="dash__lines"><i /><i /><i /></span>}
                <span className="dash__people">{[0, 1, 2].map((a) => <Avatar key={a} seed={a + k * 3} style={{ width: '1.1rem', marginLeft: a ? '-0.35rem' : 0 }} />)}</span>
              </div>
              <div className="dash__card dash__card--small"><p>{['Sync with client', 'QA pass', 'Release notes'][k]}</p><span className="dash__lines"><i /><i /></span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const MODES = ['art', 'desktop', 'wide', 'phone'] as const

export function WhatCreate({ i }: { i: number }) {
  const p = useProgress(i)
  const intro = seg(p, 0.02, 0.14)
  const build = easeOut(seg(p, 0.1, 0.3))
  const step = p < 0.3 ? -1 : Math.min(3, Math.floor((p - 0.3) / 0.155))
  const mode = step < 0 ? 'desktop' : MODES[step]
  const exit = easeInOut(seg(p, 0.93, 1))

  return (
    <SectionShell i={i} label="What we create" className="wc">
      <div className="wc__grid" style={{ opacity: build }} aria-hidden="true">
        <div className="wc__ruler">{Array.from({ length: 11 }, (_, k) => <span key={k}>{10 - k}</span>)}</div>
        <span className="wc__dash wc__dash--h" />
        <span className="wc__dash wc__dash--v" />
        {CURSORS.map((c, k) => (
          <span key={c.name} className="cursor-tag" style={{ left: `${c.x}%`, top: `${c.y}%`, '--c': c.c, animationDelay: `${k * -1.3}s` } as V}>
            <svg viewBox="0 0 16 18"><path d="M1 1l14 7-6 2-2 7L1 1Z" fill="var(--c)" /></svg>
            <em>{c.name}</em>
          </span>
        ))}
      </div>

      <h2 className="wc__word" style={{ opacity: 1 - intro, transform: `translate(-50%, -50%) scale(${1 - intro * 0.4})` }}>{copy.create.word}</h2>

      <div className={`wc__stage mode-${mode}`} style={{ opacity: build, '--b': build } as V}>
        <div className="wc__mock">
          <Dashboard />
          <div className={`wc__art ${mode === 'art' ? 'is-on' : ''}`}><Landscape /></div>
        </div>
        <div className="wc__tag" aria-live="polite">
          {copy.create.tags.map((t, k) => (
            <span key={t} className={k === step ? 'is-on' : k < step ? 'is-past' : ''}>{t}</span>
          ))}
        </div>
      </div>

      <div className="wc__exit" style={{ transform: `translateY(${(1 - exit) * 100}%)` }} />
    </SectionShell>
  )
}
