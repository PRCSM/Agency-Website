import { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { CreateOverlay, FixedControls, Jumper } from './components/Overlays'
import { ControllerProvider, useControllerState } from './controller/context'
import { ControllerStore } from './controller/store'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Designers } from './sections/Designers'
import { Hero } from './sections/Hero'
import { Portfolio } from './sections/Portfolio'
import { Startups } from './sections/Startups'
import { WhatCreate } from './sections/WhatCreate'

function Sections() {
  const { transition } = useControllerState()
  return (
    <main className={`controller ${transition?.type === 'jump' ? 'no-anim' : ''}`}>
      <Hero i={0} />
      <About i={1} />
      <WhatCreate i={2} />
      <Designers i={3} />
      <Portfolio i={4} />
      <Startups i={5} />
      <Contact i={6} />
    </main>
  )
}

export default function App() {
  const store = useMemo(
    () =>
      new ControllerStore([
        (_w, h) => h * 0.9, // hero: video grows to full-bleed
        (_w, h) => h * 2, // about: replaced by measured track length
        (_w, h) => h * 4.2, // what we create
        (_w, h) => h * 2.6, // designers
        (_w, h) => h * 7.5, // portfolio (quote, slider, followers)
        (_w, h) => h * 2.6, // startups
        (_w, h) => h, // contact: replaced by measured content height
      ]),
    [],
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const toggle = useCallback(() => setMenuOpen((o) => !o), [])
  const close = useCallback(() => setMenuOpen(false), [])
  useEffect(() => { store.paused = menuOpen }, [store, menuOpen])
  useEffect(() => { (window as unknown as { __ctl: ControllerStore }).__ctl = store }, [store])

  return (
    <ControllerProvider store={store}>
      <Header menuOpen={menuOpen} onMenu={toggle} />
      <Sections />
      <CreateOverlay />
      <Menu open={menuOpen} onClose={close} />
      <FixedControls />
      <Jumper />
    </ControllerProvider>
  )
}
