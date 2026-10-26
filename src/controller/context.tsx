import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { ControllerStore } from './store'

const Ctx = createContext<ControllerStore | null>(null)

export function ControllerProvider({ store, children }: { store: ControllerStore; children: ReactNode }) {
  useInput(store)
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('ControllerProvider missing')
  return s
}

/** Re-renders when the active index / transition changes. */
export function useControllerState() {
  const s = useStore()
  useSyncExternalStore(s.subscribeState, s.getVersion)
  return { index: s.index, transition: s.transition }
}

/** Live progress (0..1) of section i; only re-renders while it changes. */
export function useProgress(i: number) {
  const s = useStore()
  const [p, setP] = useState(() => s.progressOf(i))
  useEffect(() => s.subscribeFrame(() => setP(s.progressOf(i))), [s, i])
  return p
}

/** Map p from [a,b] to [0,1], clamped. */
export const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function isTyping(e: Event) {
  const el = e.target as HTMLElement | null
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
}

function useInput(store: ControllerStore) {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement)?.closest?.('[data-native-scroll]')) return
      e.preventDefault()
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      store.addDelta(e.deltaY * unit)
    }
    let ty = 0
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      if (isTyping(e)) return
      const y = e.touches[0].clientY
      store.addDelta((ty - y) * 1.6)
      ty = y
      e.preventDefault()
    }
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return
      const step = window.innerHeight * 0.4
      const map: Record<string, number> = { ArrowDown: step, PageDown: step * 2, ' ': step * 2, ArrowUp: -step, PageUp: -step * 2 }
      if (e.key in map) {
        e.preventDefault()
        const d = e.shiftKey && e.key === ' ' ? -map[' '] : map[e.key]
        // a key press should always be able to leave the section
        for (let k = 0; k < 4; k++) store.addDelta(d / 4)
      } else if (e.key === 'Home') store.jump(0)
      else if (e.key === 'End') store.jump(store.count - 1, 1)
    }
    let rt = 0
    const onResize = () => { cancelAnimationFrame(rt); rt = requestAnimationFrame(store.measure) }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [store])
}
