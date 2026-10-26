# setup_required.md

**Nothing is required to run the site locally.** `npm install && npm run dev` works with no accounts or keys. Everything below is optional or for production.

## Required before production
| # | Item | Why | Steps | Verify |
|---|---|---|---|---|
| 1 | Your brand | Placeholder "NOVA" name/logo/links ship by default | Edit `src/content/brand.ts`; replace `Logo` SVG in `src/components/ui.tsx`; replace `public/favicon.svg` | Header, menu, footer and jumper show your mark |
| 2 | Form endpoint | The form has no backend; without one it validates and reports "not configured" | Create a form endpoint (e.g. Formspree free tier: formspree.io → New form → copy endpoint URL). Put it in `.env` as `VITE_FORM_ENDPOINT=…` locally, and in your host's env vars (Vercel: Project → Settings → Environment Variables) | Submit a test request; you get the "Thank you!" screen and the entry appears in your form inbox |
| 3 | Real links | `brand.links` and `brand.socials` point to generic placeholders | Replace Telegram, WhatsApp, booking (Calendly etc.), social URLs, `deckUrl`, `privacyUrl` | Click each fixed button / social icon |

## Optional enhancements
| Item | Notes |
|---|---|
| Showreel video | Host an MP4/WebM (your CDN, S3, Cloudflare R2, or `public/`), set `VITE_SHOWREEL_URL`. No account needed if you put the file in `public/` and use `./showreel.mp4`. |
| Exact reference fonts | The reference uses licensed faces (Mazzard M, Atyp Display, ARP). Buy licences, put files in `public/fonts`, add `@font-face` rules and change `--f-ui`, `--f-display`, `--f-grotesk` in `tokens.css`. |
| Your imagery | Swap components in `src/components/art.tsx` (`Reel`, `Blobs`, `ProjectArt`, `Knot`, `Orb`, `MiniShot`, `Avatar`) for `<img>`/`<video>` of your own work. |
| Analytics | Not included. Add your snippet to `index.html` if needed. |
| Deployment | Static host; no credentials needed in the repo. |

## Blocked / not reproduced
- Reference proprietary media (3D renders, client screenshots, team photos, logos) and licensed fonts are intentionally not copied. Replacements are original.
- The reference's capabilities-deck PDF and form backend were not accessed.
