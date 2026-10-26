import { useEffect, useRef, useState, type FormEvent } from 'react'
import { brand, copy } from '../content/brand'
import { useProgress, useStore } from '../controller/context'
import { Face } from '../components/art'
import { SectionShell } from '../components/SectionShell'
import { Icon, Rating, Roll } from '../components/ui'
import './contact.css'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'
const SOCIAL_ICONS = [Icon.dribbble, Icon.behance, Icon.tiktok, Icon.instagram]

function Chip({ label, on, onClick, role }: { label: string; on: boolean; onClick: () => void; role: 'checkbox' | 'radio' }) {
  return (
    <button type="button" role={role} aria-checked={on} className={`chip roll-host ${on ? 'is-on' : ''}`} onClick={onClick}>
      <Roll>{label}</Roll>
    </button>
  )
}

export function Contact({ i }: { i: number }) {
  const store = useStore()
  const p = useProgress(i)
  const innerRef = useRef<HTMLDivElement>(null)
  const [len, setLen] = useState(1)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [budget, setBudget] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const measure = () => {
      const h = innerRef.current?.offsetHeight ?? 0
      const l = Math.max(1, h - window.innerHeight)
      setLen(l)
      store.setLengthFn(i, () => l)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (innerRef.current) ro.observe(innerRef.current)
    return () => ro.disconnect()
  }, [store, i])

  const toggleInterest = (v: string) => setInterests((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (!name.trim()) errs.name = 'Please enter your name and company'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email'
    setErrors(errs)
    if (Object.keys(errs).length) return
    if (!ENDPOINT) { setStatus('unconfigured'); return }
    setStatus('sending'); setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, interests, budget, message }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus('success')
      setName(''); setEmail(''); setMessage(''); setInterests([]); setBudget(null)
    } catch (err) {
      setStatus('error'); setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <SectionShell i={i} label="Contact" className="contact">
      <div ref={innerRef} className="contact__inner" style={{ transform: `translate3d(0, ${-p * len}px, 0)` }}>
        <aside className="contact__aside">
          <h2 className="contact__title">
            <span>{copy.form.titleA}</span>
            <span className="contact__face"><Face style={{ width: '100%', height: '100%' }} /></span>
            <span>{copy.form.titleB}</span>
            <span className="contact__sub">{copy.form.subtitle}</span>
          </h2>
          <h4 className="contact__label">Clients trust us</h4>
          <Rating weight={500} />
          <h4 className="contact__label contact__label--gap">Follow us:</h4>
          <div className="contact__socials">
            {brand.socials.slice(0, 4).map((s, k) => (
              <a key={s.label} className="social" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{SOCIAL_ICONS[k]}</a>
            ))}
          </div>
          <h4 className="contact__label contact__label--gap">Contact us</h4>
          <a className="underlink" href={`mailto:${brand.email}`}>{brand.email}</a>
        </aside>

        <form className="form" onSubmit={submit} noValidate>
          <div className="form__row">
            <label className="field">
              <span>Name &amp; Company</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane from Acme" autoComplete="organization" aria-invalid={!!errors.name} />
              {errors.name && <em className="field__err">{errors.name}</em>}
            </label>
            <label className="field">
              <span>Your Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@acme.com" autoComplete="email" aria-invalid={!!errors.email} />
              {errors.email && <em className="field__err">{errors.email}</em>}
            </label>
          </div>

          <fieldset className="form__group">
            <legend>I'm interested in...</legend>
            <div className="chips">{copy.form.interests.map((v) => <Chip key={v} label={v} role="checkbox" on={interests.includes(v)} onClick={() => toggleInterest(v)} />)}</div>
          </fieldset>
          <fieldset className="form__group" role="radiogroup">
            <legend>Project budget (USD)</legend>
            <div className="chips">{copy.form.budgets.map((v) => <Chip key={v} label={v} role="radio" on={budget === v} onClick={() => setBudget(budget === v ? null : v)} />)}</div>
          </fieldset>

          <label className="field field--wide">
            <span>Tell us more about your project</span>
            <textarea rows={1} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Something about your great idea" data-native-scroll />
          </label>

          <div className="form__submit">
            <button type="submit" className={`submit ${status === 'sending' ? 'is-sending' : ''}`} disabled={status === 'sending'}>
              <span className="submit__w1">Submit</span>
              <span className="submit__w2">the</span>
              <span className="submit__w3">request</span>
              <span className="submit__ring" aria-hidden="true"><i /><i /><i /></span>
              {[0, 1, 2, 3].map((k) => <span key={k} className="submit__pulse" style={{ animationDelay: `${k * 0.5}s` }} aria-hidden="true" />)}
            </button>
            <p className="form__status" role="status">
              {status === 'unconfigured' && <>Form looks good, but no endpoint is configured yet — set <code>VITE_FORM_ENDPOINT</code> (see setup_required.md). Nothing was sent.</>}
              {status === 'error' && <>Couldn’t send your request: {error}. Please email <a href={`mailto:${brand.email}`}>{brand.email}</a>.</>}
            </p>
          </div>
        </form>

        <footer className="contact__footer">
          <div className="contact__footer-left">
            <svg className="award" viewBox="0 0 100 110" aria-label="Featured studio badge" role="img">
              <path d="M10 6h80v62L50 104 10 68Z" fill="#fff" stroke="#111" strokeWidth="3" />
              <rect x="4" y="36" width="92" height="24" rx="3" fill="#111" />
              <text x="50" y="53" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15">Featured</text>
              <text x="50" y="80" textAnchor="middle" fill="#111" fontFamily="Arial" fontWeight="700" fontSize="9" letterSpacing="2">STUDIO</text>
              <circle cx="50" cy="22" r="7" fill="none" stroke="#111" strokeWidth="2" />
            </svg>
            <p className="contact__address">{brand.address.map((l) => <span key={l}>{l}</span>)}</p>
            <a className="contact__privacy" href={brand.privacyUrl}>Privacy and Policy</a>
          </div>
          <div className="contact__footer-right">
            <a className="deck-pill" href={brand.deckUrl}>Our Capabilities Deck</a>
            <p>All rights reserved © {brand.legalName}</p>
          </div>
        </footer>
      </div>

      {status === 'success' && (
        <div className="thanks" role="dialog" aria-modal="true" aria-labelledby="thanks-title">
          <button className="thanks__close" onClick={() => setStatus('idle')} aria-label="Close">×</button>
          <h2 id="thanks-title">Thank you! 🤝</h2>
          <p>Your request has been sent. We’ll get back to you within one business day.</p>
        </div>
      )}
    </SectionShell>
  )
}
