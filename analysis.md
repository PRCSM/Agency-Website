# analysis.md — Reference: https://qclay.design/

Inspection date: 2026-10-27. Tools: Claude in Chrome (user's Chrome, 1280×656 effective viewport — window would not resize further), Claude built-in browser pane (390×844 mobile emulation), DOM/computed-style extraction via injected JS, CSS bundle inspection (`/static/css/main.62f88bea.css`, 356 KB).

Legend: **[M]** measured from DOM/computed styles · **[O]** observed visually · **[E]** estimated · **[H]** implementation hypothesis · **[U]** not verified.

Branding note: per the owner's instruction, the replica ships with a placeholder brand ("NOVA") and original copy/visuals. Reference brand names, logos, client work, photos, videos and copy are documented here only as observations; none are copied into the build (see §8).

---

## 1. Executive summary

- Purpose: single-page portfolio/landing site for a design & development agency, ending in a project-request form. **[O]**
- Architecture: Create-React-App bundle (`static/js/main.*.js`), React root `#root`, Swiper for the portfolio slider. No GSAP/Lenis globals detected. **[M]**
- Core interaction: **no native document scroll** (`document.scrollHeight = viewport height`). A fixed `.controller` (100vw×100vh, overflow hidden) holds **7 full-screen `.section` layers** stacked absolutely; wheel/touch input drives a JS state machine that (a) scrubs per-section internal animations and (b) swaps sections with a translateY transition. **[M]**
- Visual language: white/off-white backgrounds, black type, pastel accents (lavender `#dad2f4`, mint `#effbf9`, blush `#f7c3b4`), large geometric sans (Plus Jakarta Sans 500/700), heavy use of looping 3D-render video, rounded "pill" geometry (radius 3rem / 9999px), two black "dark" sections. **[M/O]**
- Signature motion: hero video grows to full-bleed on scroll; horizontal card track; diagonal marquee transition; mock-UI "zoom out" sequence; masked text reveals with −3°/−10° rotation; per-character fades; black-circle "jumper" wipe for nav jumps; rolling text on link hover; 3D text cube; gooey cursor highlight; marquee of client logos. **[O]**
- Fluid sizing: whole layout authored in `rem` with `html{font-size}` scaled by viewport: 16px ≥1729px, `1.1111vw` ≤1440 (16px @1440), `1.6129vw` ≤992 (16px @992), `4.1026vw` ≤576 (16px @390). **[M]**
- Complexity: high (≈12 bespoke animated scenes). Main risks: proprietary 3D videos/illustrations and licensed fonts (Mazzard M, Atyp Display, ARP) — substituted.

## 2. Information architecture

Only one route exists. Nav items are `<a>` without `href`; they trigger an animated jump to a section. **[M]**

| Route | Purpose | Main sections | Unique interactions | Status |
|---|---|---|---|---|
| `/` | Landing | Hero → About → What we create → Designers → Portfolio (+followers) → Startups CTA → Request form/footer | Fullpage controller, jumper wipe, menu overlay, form | Inspected |
| `/blog/dribbble-select` | Badge link in footer | — | — | Not inspected (external-ish article; out of replica scope) **[U]** |
| `/QClayCapabilitiesDeck.v3.pdf` | PDF download | — | — | Not downloaded (needs permission; replaced by placeholder link) |

External: Dribbble, Behance, TikTok, Instagram, LinkedIn, Telegram (`t.me`), WhatsApp (`wa.me`), Calendly, `mailto:`. **[M]**

Nav mapping **[O]**: Home→S0, About→S1, Works→S4 (followers cube scene), Contact→S6. Menu overlay items: About Us, What We Do, Our Works, Contact Us.

## 3. Page breakdown (desktop, rem values; 1rem = 16px @1440)

Header (fixed, z 1000) **[M]**: padding `3rem 3.125rem .75rem`; logo SVG 7.44×2.67rem at (3.12, 3.02); center nav 4 links, Plus Jakarta 400 1.19rem, block width 32.19rem centered; right: "Let's Talk!" pill (border .125rem black, radius 1.44rem, green 6px dot `#8de746`, Mazzard 500 1rem) + "menu" label (Mazzard 500 1.25rem) + 2-line burger (1.94rem × 2px lines). Header slides in from −100% on load (0.5s). Colors flip to white on dark sections (portfolio/startups), 0.3s.

Fixed controls (bottom-right, 16px inset, gap 16px) **[M]**: Telegram + WhatsApp 50px circles, "Book a call" pill (14px/1.2, padding 8×16); silver gradient border (`linear-gradient(32deg,#b8c2ce,#fff 50%)` padding-box + `linear-gradient(80deg,#737989,#fbffff,#fbffff,#707988)` border-box), shadow `0 4px 12px 8px rgba(0,0,0,.1)`, hover scale 1.08 (0.2s).

### S0 Hero (`.main`, white)
- H1 three lines, Atyp Display 400 2.81rem/3.38rem at x 9.38rem, y 15.06rem; line reveal: translate+fade 0.5s, stagger 0.05s. **[M]**
- Rating row y 27rem: review-site icon 2.43×2.77rem, 5 stars 0.98rem, "Rating 5, 24 reviews" 0.95rem ls −0.27px. Services list 2 lines, 1rem 500 uppercase `#bcbcbc`, delays 0.6/0.7s. **[M]**
- Rotating circular-text badge (9.35rem) at right (x 71.3, y 12.8) with blinking-eye illustration in center. **[O]**
- "Our Capabilities Deck" pill `#e8e8e8`, radius 44px, 1.06rem. **[M]**
- Video block (Vimeo iframe, 1013×519 @1280 ⇒ ≈79×40.5rem), x 9.38rem, below fold at y≈ 47rem; white 3.9rem play button with black hairline, follows cursor over video (translate −35px). **[M/O]**
- Scroll: content moves up while the video scales to ≈full viewport (9px inset, radius → 0) over the first ~3 wheel steps, then section exits. **[M]**

### S1 About (`.about`, white)
- Left: "What About / [Brand]?" 5.13rem 500, at x 15.35rem, revealed with rotate(3°)+translateY(44px)→0, 0.3s. **[M]**
- Right: horizontal track of 3 cards (62.5×36.62rem, radius 3rem, gap 1.75rem) bg `#f7f4f4`, `#effbf9`, `#f2edf4`; each: two 51.5rem hairline circles `#d0d0d0` (decor), pill video 28.13×13.84rem (radius 9999), H3 5rem/5.75 500, body 1.25rem/1.56 `#818181`, index "01" 5rem `#d0d0d0`. Wheel scrubs the track horizontally (heading scrolls away left). **[M/O]**

### Transition S1→S2 (`section.create`)
Black overlay with 4 diagonal rows of huge blush (`#f7c3b4`) "WE CREATE" text (bitmap `text.webp`) sliding horizontally in alternate directions, rotated ≈ −15°. Followed by a light `#f7f4f4` screen with "WE CREATE" (7.5rem 700). **[O/M]**

### S2 What we create (`.what-create`, `#f7f4f4`)
- "WE CREATE" centered, then a desktop dashboard mock (50×37.6rem, radius 32px) assembles from layered slices (header, rows, title, sidebar, task board) and a video slot, over a 3456×2234 grid background with ruler numbers and multiplayer-style named cursors. **[M/O]**
- A white pill tag (23.6×4.4rem) under the mock cycles: UNIQUE GRAPHICS → INTUITIVE UX SOLUTIONS → HOLISTIC UI DESIGNS → CREATIVE APP DESIGNS (1.13rem 500 uppercase); mock morphs desktop ↔ phone ↔ desktop between steps. **[M/O]**
- Exit: bottom panel in lavender `#dad2f4` wipes up. **[O]**

### S3 Designers (`.designers`, `#dad2f4`)
- 3 lines 5.75rem 700 uppercase, lh 7.5rem: line 2 white. Line 3 = "SEVERAL [avatar pill] OTHERS", avatar pill (white, radius 52px) expands to show 9 avatars (4.93rem) + "+25" chip while the word "THOUSAND" drops in below (scale .5→1, translateY 100px→0). **[M/O]**
- 3 rounded (26.7px) project screenshots float up parallax (small/medium/large). **[M]**
- Exit: black circle (180rem) scales from bottom-right to cover the screen. **[M]**

### S4 Portfolio (`.portfolio`, black, 367rem virtual height)
1. Quote block: giant `,,` glyph 18.13rem `#5f5f5f`; 5-line statement 4.69rem 400, per-character opacity reveal (0.2s, 6.7ms stagger) from `#5f5f5f` to white; right column of 3 dark `#121212` circles (28.75rem) sliding in, a 0.25×15.6rem progress bar, caption 1.25rem white/50%. **[M]**
2. Slider (Swiper, loop): cards 43.88×31.69rem, gap 5.6rem, center card active; title under card in ARP 3.13rem uppercase, per-letter fade; pagination bars (active 4.19rem white, others 1.25rem 20% opacity) + "01 / 09" counter (1.5rem 700 `#818181`). **[M]**
3. Followers: 12.5rem circular video with white hairline; wavy SVG text band; then white "following" panel (sticky 46rem) with confetti canvas + 3D-folded text cube ("ON DRIBBBLE / INSTAGRAM / TIKTOK / BEHANCE / PINTEREST / AWWWARDS", Mazzard 700) that unfolds as you scroll; cursor-follower of 3 concentric discs (`#71709f`, `#919fd2`, `#dad2f4`) tints the text under the pointer. **[M/O]**

### S5 Startups (`.startups`, black → lilac)
- Black screen with white line-art curve (SVG); statement (2 lines, white) appears; a 28.75×32.5rem rounded (142px) video "window" rises and expands to near full screen (radius ~6rem), headline "HAVE A GREAT IDEA?" white over it, Q-logo mark, and an infinite logo marquee (`infinite.webp`) along the bottom; fill `#c7bfcf`. **[M/O]**

### S6 Request form + footer (`.req-form`, white)
- Left (x 3.12rem): "Have [round avatar video] great idea? / Tell us about it." 2.75rem; "Clients trust us" 1.5rem `#bcbcbc` + rating; "Follow us:" + 4 social circles (3.09rem, border `#eaeaea`); "Contact us" + underlined email. **[M]**
- Right (x 37.81rem, width 49.06rem): two inputs (23.59rem each, label 1rem 500, underline border, placeholder grey), "I'm interested in…" 7 chip toggles, "Project budget (USD)" 5 chip toggles (chips: radius 53px, border 1.33px `#eaeaea`, padding ≈ 1.45×2.7rem, 0.87rem 500, rolling-text hover), textarea-like input, black pill submit (13.37×4.5rem) with words "the"/"request" tilted ±8.5° and pulsing outline rings; spinner `lds-ring` while sending; "Thank You!" modal (6rem 700) on success. **[M]**
- Footer row: award badge 9.14rem, address (1rem `#bcbcbc`), "Privacy and Policy", deck pill, copyright. **[M]**

### Overlays
- Menu (`.menu`, fixed, white→`#f7f4f4` gradient): opens with transform/visibility 0.75s; left "Social" list (5 links, rolling hover), center image card (≈21×30rem) whose colour/content swaps per hovered item (`#282643`, `#e3f6f5`, `#b9e8e8`, `#2a6a8d`) via `max-width` wipes 0.3–0.5s; right "Menu" list 2.88rem 400; bottom "Get in touch" email + privacy/copyright. Burger morphs to "Close ×". **[M/O]**
- Jumper: black circle 150vmax centered sweeping across (keyframes `fadeInOutVw` 1.4s) with stroked logo drawing (`stroke-dasharray 150`, 0.4s @0.5s) — covers the section swap on nav click. **[M]**

## 4. Design system

Colors **[M]** (CSS custom props): white `#fff`, black `#000`, green-700 `#8de746`, green-100 `#effbf9`, pink-300 `#f7c3b4`, pink-100 `#f7f4f4`, purple-100 `#f2edf4`, purple-300 `#f4eded`, purple-500 `#dad2f4`, purple-600 `#b0a8d5`, blue-700 `#42a4ff`, grey-50 `#9e9e9e`, grey-100 `#eaeaea`, grey-150 `#d0d0d0`, grey-200 `#bcbcbc`, grey-300 `#818181`, quote grey `#5f5f5f`, dark circle `#121212`, startups fill `#c7bfcf`, pill bg `#e8e8e8`.

Typography **[M]**: Plus Jakarta Sans 400/500/700 (primary); Mazzard M 500/700 (UI labels, cube); Atyp Display 500 (hero H1); ARP 500/700 (portfolio titles, counter). Size scale (rem): .375 .75 .875 1 1.125 1.1875 1.25 1.4375 1.5 1.5625 1.625 1.875 2.21875 2.5 2.75 2.9375 3.125 3.4375 5 5.125 6 13.3125; plus 2.81, 4.69, 5.75, 7.5, 18.13 used inline. Uppercase on display headings in S2/S3.

Layout **[M]**: page gutter 3.125rem desktop (1.25rem mobile), hero content x 9.38rem, max design width 90rem (1440px), sections 100vh. Breakpoints: 1728, 1440, 992, 768, 576px + `max-aspect-ratio:1/1` and `min-width:1729px and min-aspect-ratio:2/1`.

Radii **[M]**: pills 9999px; cards 2.67–3rem; mock 2rem; startup window 8.9rem; avatars 50%.

Motion tokens **[M]**: link roll 0.5s ease; reveal 0.3–0.5s; header 0.5s; colors 0.3s; menu 0.75s; jumper 1.4s; fixed buttons 0.2s; per-char stagger ≈ 6.7–10ms.

## 5. Interaction inventory

| Element | Page | Initial | Trigger | Result | URL | Mobile | Status |
|---|---|---|---|---|---|---|---|
| Wheel / touch / keys | all | S0 | wheel, swipe, ↑↓ PgUp/PgDn | scrub scene → next/prev section | none | swipe | Observed (keys [U]) |
| Header nav (4) | header | text | hover | text rolls up (dup rotated −10°) + black blob under cursor | — | hidden <992 | Observed |
| Header nav | header | — | click | jumper wipe → target section | none | — | Observed |
| Let's Talk pill | header | outline | click | jump to form [O] | none | avatar variant | Partially [U] |
| Burger / menu | header | lines | click | menu overlay, label → Close × | none | same | Observed |
| Menu items | menu | — | hover | image card swaps colour; roll text | — | — | Observed |
| Hero play button | S0 | follows cursor | click | opens full Vimeo with controls | none | — | Observed (click [U]) |
| Portfolio slider | S4 | card 1 | wheel/drag/bullets | next card, counter updates | none | swipe | Observed |
| Followers cursor | S4 | discs | mousemove | discs follow pointer with lag | — | off | Observed |
| Form chips | S6 | outline | click | toggle selected (multi for interests, single for budget [E]) | — | wraps | Observed visually |
| Form submit | S6 | black pill | click | validate → spinner → Thank You modal | none | — | Not submitted (no permission to send real request) |
| Social/fixed links | many | — | click | external new tab | external | same | Observed hrefs |

## 6. Animation specification

| Animation | Target | Trigger | From → To | Duration | Easing | Repeat | Responsive | Conf. |
|---|---|---|---|---|---|---|---|---|
| Header enter | header | load | translateY(−100%) → 0 | .5s | ease | once | same | M |
| Hero line reveal | H1 lines | load | translateY(100%)/opacity 0 → 0/1 | .5s, +.05s stagger | ease | once | same | M |
| Badge spin | circular text | always | rotate 0→360 | ≈10s | linear | ∞ | same | E |
| Hero video grow | video | scroll progress | 79×40.5rem inset → full viewport | scrubbed | linear | reversible | stacked on mobile | M |
| Section swap | `.section` | progress end | translateY(100%)→0 (in), 0→−30%/fade (out) | ≈1s | ease-in-out | per swap | same | E |
| About heading tilt-in | span lines | enter | rotate(3deg) translateY(44px) op0 → none | .3s | ease | once | same | M |
| About card track | track | scroll | translateX 0 → −(track−vw) | scrubbed | linear | rev | vertical stack <576 | O |
| Create marquee | 4 rows | transition | translateX ±12rem, rotate −15° | ≈1.2s | linear | once | same | O |
| Mock assembly | UI slices | scroll | slices offset/scale → assembled | scrubbed | ease-out | rev | scaled | O |
| Tag cycle | pill text | scroll step | slide-up swap | .5s | ease | per step | same | O |
| Designers lines | spans | enter | rotate(3°)+44px → 0 | .3s stagger | ease | once | same | M |
| Avatar pill | pill | scroll | width 1.78rem → 28rem | scrubbed | ease | rev | same | M/O |
| Black circle cover | div.circle | scroll end S3 | scale 0 at BR → cover | scrubbed | — | rev | same | M |
| Quote chars | spans | enter | colour #5f5f5f → #fff | .2s each, ≈6.7ms stagger | linear | once | same | M |
| Slider | swiper | wheel | slide | ≈.6s | ease | — | swipe | E |
| Cube unfold | text faces | scroll | rotateY folded → flat | scrubbed | — | rev | same | O |
| Cursor discs | 3 discs | pointer | lerp follow (lags .1/.15/.2) | rAF | — | ∞ | disabled touch | O |
| Startup window | rounded video | scroll | scale .5 from y+ → full (inset 0.6rem) | scrubbed | — | rev | same | M/O |
| Logo marquee | strip | always | translateX loop | ≈30s | linear | ∞ | same | E |
| Link roll | spans | hover | first −150% rot −10° / second 50%→−100% | .5s | ease | — | n/a touch | M |
| Menu open | overlay | click | translateY(−100%)/hidden → none | .75s | ease | — | same | M |
| Jumper | circle | nav click | sweeps across, logo stroke draws | 1.4s | ease | — | same | M |
| Submit pulse | 4 rings | idle | scale 1→1.15/1.4, op 1→0 | ≈2s | ease-out | ∞ | same | M/E |

Reduced motion: the reference does not appear to honour `prefers-reduced-motion` **[U]**; the replica will (instant section swaps, no marquees/spin).

## 7. Responsive matrix

| Component | ≥1440 | 993–1440 | 577–992 | ≤576 (390) |
|---|---|---|---|---|
| Root size | 16px (to 1728), fixed 16px | 1.111vw | 1.613vw | 4.103vw |
| Header | logo + center nav + pill + menu | same | nav hidden (`.text{display:none}`) | logo, "Let's talk" pill with avatar video + blue dot, burger only; padding 2.25rem 1.25rem |
| Hero | 2-col (text / badge+deck) | same | stacked | H1 ≈1.6rem 4 lines, video full-width, deck pill under video |
| About | heading + horizontal card track | same | same | cards stacked vertically (full width −1.25rem gutters) inside scroll |
| Fixed controls | right column | same | same | same (50px) |
| Controller | wheel | wheel | wheel/touch | touch swipe (same 7 sections) |

Overflow: none observed (controller is overflow hidden).

## 8. Asset inventory (observed → replica decision)

| ID | Observed asset | Type / size | Use | Reuse? | Replica |
|---|---|---|---|---|---|
| A1 | Logo SVG | vector 119×43 | header, jumper | No (brand) | Placeholder wordmark "NOVA" SVG |
| A2 | Hero showreel (Vimeo 821037821) | video | S0 | No | Original animated canvas "3D-ish" scene + play button opens modal |
| A3 | About videos 1–3.mp4 + posters | video ≈450×220 | S1 cards | No | Original CSS/SVG animated blob compositions |
| A4 | `text.webp` | bitmap | create rows | No | Live text rows (CSS) |
| A5 | Dashboard slices (background, prototype, tasks, header, rows, title, sidebar, mobile-*) | webp up to 1888×1416 | S2 | No | Original HTML/CSS dashboard mock |
| A6 | `grid.webp` 3456×2234 | bitmap | S2 bg | No | CSS grid + ruler |
| A7 | `land.mp4` | video | S2 slot | No | CSS gradient landscape |
| A8 | Avatars 1–9 | 92–184px photos | S3 | No (real people) | Generated gradient/initial avatars (SVG) |
| A9 | small/medium/large.webp | screenshots | S3 | No | Original CSS mock cards |
| A10 | Portfolio images (9) | 808×632 / 1213×949 | S4 slider | No (client work) | Original fictional project cards |
| A11 | `hand.mp4` | video | S4 | No | CSS orb animation |
| A12 | Followers canvas confetti | canvas | S4 | Recreate | Canvas confetti (own code) |
| A13 | Startups video | canvas/video | S5 | No | Original CSS knot-like gradient art |
| A14 | `infinite.webp` client logos | bitmap | S5 marquee | No (third-party marks) | Generic wordmarks of fictional clients |
| A15 | `ch.mp4` character | video | S6 title | No | SVG emoji-style face |
| A16 | `dribbble-badge.png` | 417px | footer | No (award mark) | Generic "Featured" badge SVG |
| A17 | clutch.svg / star.svg | svg | rating | No | Generic star + "R" mark |
| A18 | telegram/wa/calendar icons | svg/png | fixed controls | Recreate | Own simple SVG icons |
| A19 | Fonts Mazzard M, Atyp Display, ARP | licensed | various | No | Manrope (Mazzard), Urbanist (Atyp), Space Grotesk (ARP); Plus Jakarta Sans reused (OFL) via @fontsource |
| A20 | Capabilities deck PDF | pdf | links | No | `#` placeholder flagged in setup_required.md |

## 9. External dependencies & user actions

| Dependency | Observed? | Needed for replica? | Alternative | Action |
|---|---|---|---|---|
| Form backend (reference posts request; endpoint not inspected) | Suspected | Optional | Formspree / own API | Set `VITE_FORM_ENDPOINT`; without it the form validates and shows a clear "not configured" state (no fake success) |
| Vimeo showreel | Yes | Optional | Own MP4 | Set `VITE_SHOWREEL_URL` to your video |
| Calendly / Telegram / WhatsApp / socials | Yes | Optional | — | Edit `src/content/brand.ts` |
| Google Analytics, Cloudflare beacon | Yes | No | — | Not included |
| Licensed fonts | Yes | No | Free substitutes | Buy licences + drop files in `public/fonts` if exact match needed |
| Deployment | — | Optional | Vercel/Netlify static | `npm run build` → `dist/` |

## 10. Implementation strategy

- Vite + React 19 + TypeScript, plain CSS with custom properties (fluid rem exactly like reference), no animation library: a custom **Fullpage controller** (`useController`) keeps `{index, progress}`; each section declares a virtual length (px of wheel travel). Wheel/touch/keys add delta to progress (clamped, smoothed with rAF lerp); overflow past the end/start triggers a 1s section swap (locked during transition). Sections receive `progress` (0..1) and `active` and compute transforms — scrubbed, reversible, cheap (transform/opacity only).
- Hover/micro-interactions in CSS; cursor followers in rAF; canvas for confetti.
- `prefers-reduced-motion`: snap progress, disable marquees/spin/auto rotate.
- Testing: Playwright screenshots at 6 viewports, scripted wheel to each scene, console-error check.

## 11. Implementation checklist
Header · Menu overlay · Jumper · Fixed controls · Controller (wheel/touch/keys/nav jumps) · S0 hero + video grow + badge · S1 about heading + card track · create transition · S2 mock + tags · S3 designers + avatars + circle cover · S4 quote + slider + followers + cube + cursor discs · S5 startups window + marquee · S6 form (validation, chips, submit states, modal) + footer · Mobile header/stacking · Reduced motion · Build · Screenshots · Docs.

## 12. Known limitations & confidence
- Viewports 1920/1440/1366 could not be set in the user's Chrome (window fixed at 1280×656 inner); fluid rem means 1440 proportions are equivalent [M], verified via rem-normalised measurements.
- Mobile reference inspected at 390×844 only for hero/about; deeper mobile scenes inferred to stack [E].
- Exact scrub lengths/easings estimated from wheel-step observation [E].
- Form endpoint, validation messages and success flow not exercised on the live site (would send a real request).
- All proprietary media replaced; visual fidelity of those regions is "same composition/role", not identical pixels.
