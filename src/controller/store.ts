/**
 * Full-page section controller.
 * - Each section owns a virtual scroll length (px of wheel travel).
 * - Wheel / touch / keyboard deltas scrub the active section's progress.
 * - Pushing past either end (with a small overscroll threshold) swaps sections.
 * - Nav jumps run under a full-screen "jumper" wipe.
 */
export type TransitionType = 'slide' | 'create' | 'jump'
export interface Transition { from: number; to: number; dir: 1 | -1; type: TransitionType; start: number }

type LengthFn = (vw: number, vh: number) => number
type Listener = () => void

const SWAP_MS = 1000
const CREATE_MS = 1500
const JUMP_MS = 1400
const OVERSCROLL = 60

export const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export class ControllerStore {
  index = 0
  target = 0
  current = 0
  over = 0
  locked = false
  paused = false
  /** Swap requested by overscroll; runs once the scrub reaches that end. */
  pending: 0 | 1 | -1 = 0
  transition: Transition | null = null
  lengthFns: LengthFn[]
  lengths: number[] = []
  private frameListeners = new Set<Listener>()
  private stateListeners = new Set<Listener>()
  private raf = 0
  private version = 0

  constructor(lengthFns: LengthFn[]) {
    this.lengthFns = lengthFns
    this.measure()
  }

  /** Recompute lengths; sections may register measured lengths via setLength. */
  measure = () => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    this.lengths = this.lengthFns.map((fn) => Math.max(1, fn(vw, vh)))
    this.clamp()
    this.emitFrame()
  }

  setLengthFn(i: number, fn: LengthFn) {
    this.lengthFns[i] = fn
    this.measure()
  }

  get count() { return this.lengthFns.length }
  get len() { return this.lengths[this.index] }

  private clamp() {
    const L = this.lengths[this.index] ?? 1
    this.target = Math.min(Math.max(this.target, 0), L)
    this.current = Math.min(Math.max(this.current, 0), L)
  }

  /** Progress 0..1 of section i (1 for sections above, 0 below). */
  progressOf(i: number) {
    if (i < this.index) return 1
    if (i > this.index) return 0
    return this.current / this.len
  }

  addDelta(d: number) {
    if (this.locked || this.paused || !d) return
    const L = this.len
    const next = this.target + d
    if (next > L) {
      this.target = L
      this.over = this.over > 0 ? this.over + (next - L) : next - L
      if (this.over > OVERSCROLL && this.index < this.count - 1) this.pending = 1
    } else if (next < 0) {
      this.target = 0
      this.over = this.over < 0 ? this.over + next : next
      if (this.over < -OVERSCROLL && this.index > 0) this.pending = -1
    } else {
      this.target = next
      this.over = 0
      this.pending = 0
    }
    this.kick()
    this.flushPending()
  }

  private flushPending() {
    if (!this.pending || this.locked) return
    const L = this.len
    if (this.pending === 1 && this.current > L - 2) this.swap(this.index + 1, 0)
    else if (this.pending === -1 && this.current < 2) this.swap(this.index - 1, 'end')
  }

  /** Programmatic progress (0..1) inside the active section — e.g. slider bullets. */
  setProgress(p: number) {
    this.target = Math.min(Math.max(p, 0), 1) * this.len
    this.kick()
  }

  private swap(to: number, at: number | 'end') {
    const from = this.index
    const dir: 1 | -1 = to > from ? 1 : -1
    const type: TransitionType = from === 1 && to === 2 ? 'create' : 'slide'
    this.index = to
    const L = this.lengths[to]
    this.target = this.current = at === 'end' ? L : at * L
    this.over = 0
    this.pending = 0
    this.begin({ from, to, dir, type, start: performance.now() }, type === 'create' ? CREATE_MS : SWAP_MS)
  }

  /** Test/debug helper: place the controller at section i, progress p, instantly. */
  debugSet(i: number, p: number) {
    this.index = i
    this.target = this.current = p * this.lengths[i]
    this.emitState()
    this.emitFrame()
  }

  /** Animated jump to section `to` at progress `p` (0..1), covered by the jumper wipe. */
  jump(to: number, p = 0) {
    if (this.locked) return
    if (to === this.index) { this.setProgress(p); return }
    const from = this.index
    const t: Transition = { from, to, dir: to > from ? 1 : -1, type: 'jump', start: performance.now() }
    this.begin(t, JUMP_MS)
    window.setTimeout(() => {
      this.index = to
      this.target = this.current = p * this.lengths[to]
      this.over = 0
      this.pending = 0
      this.emitState()
      this.emitFrame()
    }, reducedMotion ? 0 : JUMP_MS * 0.45)
  }

  private begin(t: Transition, ms: number) {
    this.transition = t
    this.locked = true
    this.emitState()
    this.emitFrame()
    window.setTimeout(() => {
      this.transition = null
      this.locked = false
      this.over = 0
      this.emitState()
    }, reducedMotion ? 50 : ms)
  }

  private kick() {
    if (!this.raf) this.raf = requestAnimationFrame(this.tick)
  }

  private tick = () => {
    this.raf = 0
    const diff = this.target - this.current
    if (Math.abs(diff) < 0.3 || reducedMotion) {
      this.current = this.target
    } else {
      this.current += diff * 0.14
      this.raf = requestAnimationFrame(this.tick)
    }
    this.emitFrame()
    this.flushPending()
  }

  // ---- subscriptions ----
  subscribeFrame = (l: Listener) => { this.frameListeners.add(l); return () => { this.frameListeners.delete(l) } }
  subscribeState = (l: Listener) => { this.stateListeners.add(l); return () => { this.stateListeners.delete(l) } }
  getVersion = () => this.version
  private emitFrame() { this.frameListeners.forEach((l) => l()) }
  private emitState() { this.version++; this.stateListeners.forEach((l) => l()) }
}
