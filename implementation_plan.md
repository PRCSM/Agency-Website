# implementation_plan.md

| ID | Task | Depends | Priority | Complexity | Acceptance criteria | Status | Risk |
|---|---|---|---|---|---|---|---|
| T1 | Recon + analysis.md | — | P0 | M | All sections, overlays, tokens, motion documented | Done | Viewport limited to 1280×656 in user's Chrome |
| T2 | Vite/React/TS scaffold, fluid rem tokens, fonts | T1 | P0 | S | Builds; rem = 16px@1440, 1.111vw/1.613vw/4.103vw breakpoints | Done | — |
| T3 | Full-page controller (wheel/touch/keys, overscroll swap, pending swap, jump) | T2 | P0 | L | Wheel walks 0→6 and back; a single wheel burst leaves a scene; keyboard works | Done (tested) | Trackpad inertia feel is tuned by `OVERSCROLL`/lerp 0.14 |
| T4 | Header (roll links, blob hover, talk pill, burger→Close, dark mode per scene) | T3 | P0 | M | Colors flip on dark scenes; nav jumps | Done | — |
| T5 | Menu overlay (social, image wipe per item, menu links, Esc) | T4 | P1 | M | Opens/closes, Esc, item jumps | Done (tested) | — |
| T6 | Jumper circle wipe + logo stroke | T3 | P1 | S | Covers swap on nav click | Done | — |
| T7 | Hero: line reveals, badge, deck pill, video grow, cursor play button, lightbox | T3 | P0 | M | Frame grows to inset-0.6rem full-bleed; lightbox honest without video | Done (tested) | — |
| T8 | About: tilt-in heading, horizontal card track, mobile vertical stack | T3 | P0 | M | Track length measured; scrub reversible | Done | — |
| T9 | Create marquee transition | T3 | P2 | S | Plays only S1→S2 forward | Done | — |
| T10 | What-we-create: word, grid/cursors, dashboard assembly, 4 tag steps (art/desktop/wide/phone), lavender exit | T3 | P0 | L | Each step visible; tag swaps | Done | Dashboard is original, not a pixel copy |
| T11 | Designers: lines, avatar pill expansion, drop word, floating shots, black cover | T3 | P0 | M | Pill expands with progress; cover fills black | Done | — |
| T12 | Portfolio: per-char quote reveal, circles/bar, slider + bullets + counter, wave text, white panel, folding cube, confetti, cursor discs | T3 | P0 | L | Bullets select; header flips black on white panel | Done (tested) | Cube is an accordion approximation |
| T13 | Startups: line draw, statement, rising/expanding window, CTA, marquee | T3 | P1 | M | Window reaches near full-bleed | Done | — |
| T14 | Contact: form (validation, chips, submit states, endpoint, modal) + footer | T3 | P0 | M | No fake success; validation errors shown | Done (tested) | Needs `VITE_FORM_ENDPOINT` for real sends |
| T15 | Fixed controls | T2 | P1 | S | Real external links, hover scale | Done | — |
| T16 | Responsive (≤992 nav hidden, ≤576 mobile layouts, ≥1441 centred canvas) | T7–T14 | P0 | M | No horizontal overflow at 7 viewports | Done | Deep mobile reference scenes not inspected |
| T17 | Reduced motion | T3 | P1 | S | Instant scrubs/swaps, no long animations | Done | — |
| T18 | Screenshot matrix + interaction tests | all | P0 | M | 133 screenshots, 12/12 tests pass, 0 console errors | Done | — |
| T19 | Docs + hosted preview | all | P1 | S | README, setup, manifest, validation report | Done | — |
