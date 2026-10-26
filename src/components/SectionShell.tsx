import { useEffect, useState, type ReactNode } from 'react'
import { useControllerState } from '../controller/context'

/** Positions one full-screen layer in the controller stack. */
export function SectionShell({ i, label, className = '', children }: { i: number; label: string; className?: string; children: ReactNode }) {
  const { index, transition } = useControllerState()
  const involved = !!transition && transition.type !== 'jump' && (transition.from === i || transition.to === i)
  const pos = i === index ? 'is-active' : i < index ? 'is-above' : 'is-below'
  const [isIn, setIn] = useState(i === index)

  useEffect(() => {
    if (i !== index) { const t = setTimeout(() => setIn(false), 900); return () => clearTimeout(t) }
    const t = setTimeout(() => setIn(true), transition ? 450 : 60)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, index])

  return (
    <section
      className={`section ${pos} ${involved ? 'is-involved' : ''} ${isIn ? 'is-in' : ''} ${className}`}
      style={{ zIndex: i + 1 }}
      aria-label={label}
      aria-hidden={i !== index}
      inert={i !== index}
      data-index={i}
    >
      {children}
    </section>
  )
}
