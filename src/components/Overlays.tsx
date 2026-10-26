import { brand, copy } from '../content/brand'
import { useControllerState } from '../controller/context'
import { Icon, Logo } from './ui'
import './overlays.css'

/** Full-screen circle wipe shown during nav jumps. */
export function Jumper() {
  const { transition } = useControllerState()
  const active = transition?.type === 'jump'
  const light = active && (transition!.to === 4 || transition!.to === 5)
  return (
    <div className={`jumper ${active ? 'is-active' : ''} ${light ? 'is-light' : ''}`} key={active ? transition!.start : 'idle'} aria-hidden="true">
      <div className="jumper__circle">
        <Logo className="jumper__logo" draw />
      </div>
    </div>
  )
}

/** Diagonal "WE CREATE" marquee shown between About and What-we-create. */
export function CreateOverlay() {
  const { transition } = useControllerState()
  const active = transition?.type === 'create'
  const row = Array.from({ length: 6 }, () => copy.create.word).join(' ')
  return (
    <div className={`create-ov ${active ? 'is-active' : ''}`} key={active ? transition!.start : 'idle'} aria-hidden="true">
      <div className="create-ov__rows">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`create-ov__row ${i % 2 ? 'is-rev' : ''}`}>{row}</div>
        ))}
      </div>
    </div>
  )
}

export function FixedControls() {
  return (
    <div className="fixed-controls">
      <a className="fc-btn fc-round" href={brand.links.telegram} target="_blank" rel="noopener noreferrer" aria-label="Message us on Telegram">{Icon.telegram}</a>
      <a className="fc-btn fc-round" href={brand.links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">{Icon.whatsapp}</a>
      <a className="fc-btn fc-book" href={brand.links.booking} target="_blank" rel="noopener noreferrer">{Icon.calendar}<span>Book a call</span></a>
    </div>
  )
}
