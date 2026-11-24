# DSY Portfolio

Personal portfolio of Dandi Septian Yusniawan. Astro, static output, no UI framework.
Design from Open Design (current: `design/open-design-v3-playful.html`; earlier versions in `design/`).

## Edit content
- English content: `src/data/profile.ts`. Indonesian wording: `src/data/profile.id.ts` (only the translated fields; facts come from `profile.ts`).
- Fixed page text (nav, buttons, headings) in both languages: `src/data/ui.ts`.
- Pages: `/` (English) and `/id/` (Indonesian), both rendered by `src/components/Page.astro`.

## Project images
Drop an image in `public/projects/` named after the project key and rebuild:
`mammoguard`, `iot`, `feast`, `sajiin`, `satelit` + `.webp`/`.jpg`/`.jpeg`/`.png` (4:3, e.g. 1200x900, fits best).
A project without an image keeps its drawn illustration. Satelit is private client work: no real screenshots.

## Gallery
Photos are `src/assets/gallery/1.jpg`, `2.jpg`, … To add one, add the next number and its caption to both `gallery.captions` lists in `src/data/ui.ts`.

## Photo
`public/me.jpg` (About section).

## Commands
| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Serve the built `dist/` |

## Deploy (GitHub Pages)
1. Push this folder to a GitHub repo, branch `main`.
2. Repo Settings → Pages → Source: **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and deploys on every push.
   - Repo named `D4ce394.github.io` → works as is.
   - Any other repo name → set `base: '/<repo-name>'` in `astro.config.mjs`.

## Structure
- `src/layouts/Base.astro` — head, fonts, language alternate link
- `src/components/Page.astro` — the whole page, per language
- `src/styles/global.css` — design tokens and styles (from Open Design, plus additions at the end)
- `src/scripts/main.js` — name letters, rotating roles, reveals, nav, cursor, filters, project dialog, copy email, sticker board
