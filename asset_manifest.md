# asset_manifest.md

No reference assets were downloaded or reused. Every visual is original code (CSS/SVG/canvas) or an OFL font. Reference IDs map to analysis.md §8.

| Ref | Replica asset | File / component | Used in | Size | Type | Status |
|---|---|---|---|---|---|---|
| A1 | NOVA wordmark (placeholder) | `components/ui.tsx` `Logo` | header, jumper (stroke-drawn) | 120×32 viewBox | SVG | Done — replace with your logo |
| — | Favicon | `public/favicon.svg` | tab | 32×32 | SVG | Done |
| A2 | Showreel stand-in (desk scene, laptop, floating shapes) | `art.tsx` `Reel` | hero frame, lightbox, menu | fluid | CSS | Done; real video via `VITE_SHOWREEL_URL` |
| — | Circular badge + blinking eye | `sections/Hero.tsx` `Badge` | hero | 9.35rem | SVG | Done |
| A3 | Pill media (spheres / rings / petals) | `art.tsx` `Blobs` | about cards, menu | 28.13×13.84rem | CSS | Done |
| A4 | "WE CREATE" diagonal rows | `Overlays.tsx` `CreateOverlay` | S1→S2 transition | full screen | live text | Done |
| A5 | Dashboard mock (sidebar, stats, kanban) | `sections/WhatCreate.tsx` `Dashboard` | S2 | 50×37.6rem, wide & phone modes | HTML/CSS | Done |
| A6 | Grid + ruler + named cursors | `WhatCreate.tsx` | S2 bg | full screen | CSS/SVG | Done |
| A7 | Dusk landscape illustration | `WhatCreate.tsx` `Landscape` | S2 slot + art mode | 400×260 viewBox | SVG | Done |
| A8 | Abstract avatars ×9 | `art.tsx` `Avatar` | S3 pill, dashboard | 40×40 viewBox | SVG | Done |
| A9 | Mini project shots ×3 | `art.tsx` `MiniShot` | S3 floating cards | 26–37rem | CSS | Done |
| A10 | Fictional project cards ×9 | `art.tsx` `ProjectArt` + `content/brand.ts` `projects` | S4 slider | 43.88×31.69rem | CSS | Done — replace with your work |
| A11 | Pulsing orb | `art.tsx` `Orb` | S4 followers, menu | 12.5rem | CSS | Done |
| A12 | Confetti | `Portfolio.tsx` `Confetti` | S4 following panel | full | canvas | Done |
| — | 3D folding platform list | `Portfolio.tsx` `Cube` | S4 | 30rem | SVG + CSS 3D | Done |
| — | Cursor discs | `Portfolio.tsx` `Discs` | S4 | 14.5/23/29rem | CSS | Done |
| A13 | Knotted tube art | `art.tsx` `Knot` | S5 window, menu | fluid | SVG | Done |
| A14 | Client wordmark marquee (fictional names) | `Startups.tsx` | S5 | — | live text | Done |
| — | Line-art curve | `Startups.tsx` | S5 | full width | SVG | Done |
| A15 | Character face | `art.tsx` `Face` | form title, mobile talk pill | 60×60 viewBox | SVG | Done |
| A16 | "Featured" badge | `Contact.tsx` | footer | 9.14rem | SVG | Done |
| A17 | Rating mark + stars | `ui.tsx` `RatingMark`, `Stars` | hero, form | 35×40 / 14×14 | SVG | Done |
| A18 | Telegram / WhatsApp / calendar / social icons | `ui.tsx` `Icon` | fixed controls, form | 18–34px | SVG | Done (simplified generic glyphs) |
| A19 | Fonts | `@fontsource/*` | all | woff2 | OFL | Done (substitutes) |
| A20 | Capabilities deck | `brand.deckUrl` | hero, footer | — | link | Needs your PDF |

Missing / needs your input: your logo, portfolio images, showreel, team photos, deck PDF (all optional; placeholders work).
