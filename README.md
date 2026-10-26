# NOVA — studio site replica

Full-screen, scroll-driven agency site that reproduces the layout, motion and interaction model of the reference (qclay.design) with a placeholder brand ("NOVA"), original copy and original CSS/SVG artwork. Rebrand it in one file.

## Stack
- React 19 + TypeScript + Vite 8
- Plain CSS with design tokens and a fluid `rem` scale (same breakpoints as the reference)
- No animation library: a custom full-page controller (`src/controller/`) scrubs each scene from wheel / touch / keyboard input
- Fonts via `@fontsource` (Plus Jakarta Sans, Manrope, Urbanist, Space Grotesk — all OFL)
- Playwright (Python) for screenshots and functional tests

## Prerequisites
Node 20+ (tested on 22), npm. For tests: Python 3.10+ with `pip install playwright && playwright install chromium`.

## Commands
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/
npm run preview    # serve dist/ on :4173

# tests (serve dist on :4173 first, e.g. `npm run preview` or `python3 -m http.server 4173 -d dist`)
python3 tests/interactions.py http://127.0.0.1:4173/
python3 tests/capture.py http://127.0.0.1:4173/ shots
```

## Rebrand
| What | Where |
|---|---|
| Name, email, address, socials, booking/Telegram/WhatsApp links, deck & privacy URLs | `src/content/brand.ts` (`brand`) |
| All copy (hero, about cards, tags, quote, CTA, form options) | `src/content/brand.ts` (`copy`) |
| Portfolio entries | `src/content/brand.ts` (`projects`) |
| Logo | `src/components/ui.tsx` → `Logo` (swap the SVG) |
| Colors / fonts | `src/styles/tokens.css` |
| Artwork stand-ins | `src/components/art.tsx` (replace with your images/videos) |

## Environment variables
See `.env.example`. Both are optional:
- `VITE_FORM_ENDPOINT` — POST target for the project-request form (JSON body). Without it the form validates and tells the user nothing was sent.
- `VITE_SHOWREEL_URL` — MP4/WebM played in the hero lightbox. Without it the lightbox shows the illustrated placeholder and says so.

## Deploy
Any static host. `npm run build`, upload `dist/`. Vercel/Netlify: build command `npm run build`, output `dist`.

## Structure
```
src/
  controller/   store.ts (section state machine), context.tsx (hooks, input binding)
  components/   Header, Menu, Overlays (jumper, create marquee, fixed controls), SectionShell, ui, art
  sections/     Hero, About, WhatCreate, Designers, Portfolio, Startups, Contact (+ css)
  content/      brand.ts
  styles/       tokens.css, global.css
tests/          capture.py, interactions.py, make_preview.sh
```

## Known limitations
See `analysis.md` §12 and `visual_validation.md` → "Remaining differences".
