import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { brand } from '../content/brand'

/** Placeholder wordmark — replace with your own logo SVG. */
export function Logo({ className, draw }: { className?: string; draw?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 120 32" fill="none" aria-label={brand.name} role="img">
      <g stroke="currentColor" strokeWidth={draw ? 1.4 : 0} fill={draw ? 'none' : 'currentColor'} className={draw ? 'logo-draw' : undefined}>
        <path d="M2 30V2h5.4l12.2 18.3V2H25v28h-5.3L7.4 11.7V30H2Z" />
        <path d="M44 31c-8.3 0-14.2-6.2-14.2-15S35.7 1 44 1s14.2 6.2 14.2 15S52.3 31 44 31Zm0-5.2c5 0 8.6-4 8.6-9.8S49 6.2 44 6.2 35.4 10.2 35.4 16s3.6 9.8 8.6 9.8Z" />
        <path d="M68.2 30 57.6 2h5.9l7.6 21.4L78.7 2h5.8L73.9 30h-5.7Z" />
        <path d="M84 30 94.6 2h5.8L111 30h-5.8l-2.3-6.4H92.1L89.8 30H84Zm9.9-11.4h7.2l-3.6-10.2-3.6 10.2Z" />
      </g>
      <circle cx="116" cy="27" r="3" fill="#8de746" />
    </svg>
  )
}

/** Text that rolls up on hover (duplicate rotates in from below). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="sr-only">{children}</span>
      <span className="roll__ghost" aria-hidden="true">{children}</span>
      <span className="roll__track" aria-hidden="true">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </span>
  )
}

/** Tracks the pointer inside an element so the .blob child follows it. */
export function trackBlob(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--bx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--by', `${e.clientY - r.top}px`)
}

export function Stars({ size = '0.98rem' }: { size?: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: 0 }} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 14 14" style={{ width: size, height: size }}>
          <path d="M7 .8l1.9 4 4.3.5-3.2 3 .9 4.3L7 10.4l-3.9 2.2.9-4.3-3.2-3 4.3-.5L7 .8Z" fill="#f5c443" />
        </svg>
      ))}
    </span>
  )
}

/** Generic review-site mark (original). */
export function RatingMark({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 35 40" style={style} aria-hidden="true">
      <rect width="35" height="40" rx="9" fill="#111" />
      <path d="M11 29V11h7.2c3.9 0 6.3 2.1 6.3 5.4 0 2.4-1.3 4.1-3.4 4.9l4 7.7h-4.5l-3.5-7h-2.2v7H11Zm3.9-10.2h3c1.7 0 2.7-.9 2.7-2.3s-1-2.3-2.7-2.3h-3v4.6Z" fill="#fff" />
      <circle cx="27" cy="29" r="2.4" fill="#ff5a5f" />
    </svg>
  )
}

export function Rating({ weight = 400 }: { weight?: number }) {
  return (
    <div className="rating">
      <RatingMark style={{ width: '2.43rem', height: '2.77rem' }} />
      <div>
        <Stars />
        <p className="rating__text" style={{ fontWeight: weight }}>
          Rating {brand.rating.score}, {brand.rating.reviews} reviews
        </p>
      </div>
    </div>
  )
}

export function ExternalLink({ href, className, children, label }: { href: string; className?: string; children: ReactNode; label?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export const Icon = {
  telegram: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M21.5 3.6 2.9 10.8c-1.2.5-1.2 1.2 0 1.6l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.5-1.5Zm-3.4 3.2-8.6 7.8-.3 3.6-1.5-4.8 10.4-6.6Z" fill="#229ED9" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 34 34" width="34" height="34" aria-hidden="true">
      <path d="M17 4a13 13 0 0 0-11.2 19.6L4 30l6.6-1.7A13 13 0 1 0 17 4Zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 17 27.6Z" fill="#25D366" />
      <path d="M22.8 19.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4Z" fill="#25D366" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
      <rect x="2" y="3.5" width="14" height="12.5" rx="2.5" fill="#9a9aa6" />
      <rect x="2" y="3.5" width="14" height="3.5" rx="1.5" fill="#6d6d78" />
      <rect x="5" y="1.5" width="1.6" height="4" rx=".8" fill="#6d6d78" />
      <rect x="11.4" y="1.5" width="1.6" height="4" rx=".8" fill="#6d6d78" />
      <circle cx="13.2" cy="13.4" r="3.2" fill="#fff" />
      <path d="m11.8 13.4 1 1 1.8-1.9" stroke="#2bb673" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  dribbble: <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><circle cx="10" cy="10" r="8.5" fill="#ea4c89" /><path d="M3 7.5c4 .4 8.6-.6 11.5-3M4 14c3-3.6 7-4.8 12.6-3.6M8 2.2c2.5 3 4.6 8.4 5.4 15" stroke="#fff" strokeWidth="1.1" fill="none" /></svg>,
  behance: <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><rect width="20" height="20" rx="10" fill="#1769ff" /><text x="10" y="13.6" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial">Bē</text></svg>,
  tiktok: <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M13.5 2h-2.7v10.7a2.4 2.4 0 1 1-2.4-2.4c.3 0 .5 0 .7.1V7.6a5.1 5.1 0 1 0 4.4 5.1V7.2a6 6 0 0 0 3.5 1.1V5.6A3.5 3.5 0 0 1 13.5 2Z" fill="#111" /></svg>,
  instagram: <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="4.6" fill="none" stroke="#111" strokeWidth="1.6" /><circle cx="10" cy="10" r="3.6" fill="none" stroke="#111" strokeWidth="1.6" /><circle cx="14.5" cy="5.5" r="1" fill="#111" /></svg>,
}
