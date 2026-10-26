# visual_validation.md

## Method
- Reference: inspected live in the user's Chrome (Claude in Chrome) at an effective 1280×656 viewport (the window could not be resized), plus 390×844 in the built-in browser pane. DOM boxes were recorded in `rem` so they transfer to every width (the reference scales its root font with the viewport).
- Replica: `tests/capture.py` renders each of 19 scenes at 7 viewports with Playwright Chromium (133 PNGs in `shots/`, named `<w>x<h>-<scene>.png`). The same build was also opened in the user's Chrome via the hosted preview and stepped with the real mouse wheel.
- A pixel-diff metric was not used: the reference's imagery, copy and fonts are intentionally replaced, so a diff would measure the substitutions, not layout fidelity. Comparison was done on layout geometry (positions/sizes in rem) and motion behaviour.

## Viewports tested
1920×1080, 1440×900, 1366×768, 1280×656, 768×1024, 390×844, 320×700. No horizontal overflow at any size. No console errors or page errors.

## Functional tests (`tests/interactions.py`, 1440×900) — 12/12 pass
Wheel walks sections 0→6 in order · reverse wheel returns · header nav jump · keyboard PageDown · menu open + Esc · menu item jump · empty-submit validation (2 errors) · chip toggles · valid submit without endpoint reports "not configured" · slider bullet → 07/09 · showreel lightbox open/close · fixed controls are external `_blank` links. Extra check: a single burst of 10 wheel ticks leaves the hero (pending-swap logic).

## Geometry check vs reference (1280×656, rem)
| Element | Reference | Replica |
|---|---|---|
| Header padding / logo | 3rem 3.125rem; 7.44rem | same |
| Nav block | 32.19rem centred, 1.19rem | same |
| Hero H1 | x 9.38, y 15.06, 2.81/3.38 | same (Urbanist 600 for Atyp) |
| Rating row / services | y 27.06 | same |
| Badge / deck pill | (71.27, 12.75) 9.35 / (69.09, 28.11) | same |
| Hero video start | x 9.38, y ≈42.1, 71.25×36.5 | same; grows to 0.6rem inset |
| About heading | x 15.35, y 19.0, 5.13rem | same |
| About cards | 62.5×36.62, r 3rem, y 8.5, gap 1.75 | same |
| WE CREATE | 7.5rem/700 centred | same |
| Dashboard mock | 50.12×37.56, r 2rem | same (+wide/phone modes) |
| Tag pill | 23.63×4.44 | same |
| Designers lines | 5.75rem/7.5 uppercase, line 2 white | same |
| Avatar pill height | 5.38rem, avatars 4.93rem | same |
| Quote | 4.69/5.91rem, x 11.25 | same; glyph 18.13rem |
| Slider cards | 43.88×31.69, pitch 49.5 | same |
| Counter | "01 / 09" 1.5rem 700 | same |
| Startup window | 28.75×32.5 r 8.9 → near full | same |
| Form columns | aside x 3.12, form x 37.81 w 49.06 | same |
| Chips | r 53px, 0.87rem, 1.33px #eaeaea | same |
| Submit | 13.37×4.5, tilted words, pulse rings | same |

## Corrections made during validation
1. About row alignment switched from centred to top-aligned (cards at y 8.5rem, heading 19rem).
2. Hero H1 weight raised (Urbanist 600) to match Atyp Display's colour.
3. Badge text no longer overlaps itself.
4. Folding cube was collapsed by a global `svg{max-width:100%}`; fixed.
5. Slider moved down so cards clear the header at short viewports.
6. Header turns white during the designers' black cover.
7. Avatar gradients used duplicate SVG ids (3 of 9 rendered); now unique per instance.
8. Rolling-text links had no accessible name; added screen-reader text.
9. Mobile: designers row overflowed; hero words merged; dark-scene talk pill lost its fill — all fixed.
10. A wheel burst that ended before the scrub caught up left the user "stuck" at a section end; swaps now queue and fire when the scrub reaches the end.
11. Removed an SVG turbulence filter on an animated path (expensive repaint).
12. ≥1441px: the 1440 design canvas is centred (hero, quote, designers, form).

## Remaining differences
- All imagery, copy, brand and fonts are substitutes by design (see asset_manifest.md).
- The reference's 3D text cube, liquid startup video and dashboard assembly are approximated with original techniques; timing curves are estimates.
- Reference at 1920/1440/1366 was not observed directly; its fixed 16px root ≥1440 is measured from CSS, centring of the canvas there is an assumption.
- Mobile reference was inspected only for hero/about; later mobile scenes are a reasoned stacking, not observed.
- Hover screenshots through the hosted preview in the user's Chrome timed out (extension capture inside the preview frame); hover states were verified in Playwright instead.

## Blockers
None for local development. Real form delivery needs `VITE_FORM_ENDPOINT` (setup_required.md).
