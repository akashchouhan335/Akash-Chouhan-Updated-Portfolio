# Coding Rules & Conventions — Akash Chouhan Portfolio

> **AI INSTRUCTION**: Read this file before writing any code. These rules must be followed exactly.
> **Keep this file updated** whenever a new convention is agreed upon.

---

## Project Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | React 19 | ^19.2.8 |
| Build tool | Vite 8 | ^8.2.2 |
| Styling | Tailwind CSS v4 | ^4.3.3 |
| Animation (timeline) | GSAP | ^3.15.0 |
| Animation (spring) | Framer Motion | ^13.1.1 |
| 3D (React) | @react-three/fiber + drei | ^9 / ^10 |
| 3D (raw WebGL) | OGL | ^1.0.11 |
| Icons | lucide-react | ^1.35.0 |
| UI primitives | Radix UI + CVA | latest |
| Backend | Node.js + Express | ^4.18.2 |
| Email | Nodemailer | ^9.0.6 |
| Linter | oxlint | ^1.79.0 |

---

## Module System

- **ESM everywhere** — both `portfolio/` (`"type": "module"`) and `backend/` use ES modules.
- Use `import`/`export`, never `require`/`module.exports`.

---

## File & Folder Conventions

- Components → `src/components/ComponentName.jsx` (PascalCase)
- Sections → `src/sections/SectionName.jsx` (PascalCase)
- Hooks → `src/hooks/index.js` (camelCase, exported named)
- Data → `src/data/filename.js` (camelCase)
- Utilities → `src/lib/utils.js` or `src/utils/index.js`
- Path alias: `@/` maps to `src/` — always use this for imports within `portfolio/`

---

## Import Alias

Always use the `@/` alias:
`import Navbar from '@/components/Navbar'`
Never use relative paths like `../../components/Navbar`.

---

## Component Rules

1. **Functional components only** — no class components.
2. Default export each component from its own file.
3. Props should be destructured at the top of the function.
4. Use `useReducedMotion()` from `@/hooks` before adding any animation.
5. Heavy WebGL/3D components (ProfileCard, Beams, MoltenMetal) must be lazy-loaded or wrapped in Suspense.
6. shadcn-style UI primitives go in `components/ui/` — use Radix + CVA pattern.

---

## Styling Rules

1. **Tailwind v4** — use utility classes.
2. Never hardcode color hex values in JSX — always use `var(--color-*)` tokens.
3. Custom CSS goes in `src/index.css` — not in `<style>` tags or CSS modules.
4. Use `@layer base`, `@layer components` in `index.css` as appropriate.
5. Dark mode is the ONLY mode — no light mode toggle needed.
6. Use `className` not `style={{}}` unless animating dynamic numeric values.

---

## Animation Rules

1. Import GSAP as: `import gsap from 'gsap'` and `import { useGSAP } from '@gsap/react'`.
2. Always register plugins before use: `gsap.registerPlugin(ScrollTrigger)`.
3. Clean up GSAP timelines and ScrollTriggers in `useEffect` cleanup / `useGSAP` scope.
4. Framer Motion: use `motion.*` components, prefer `animate` + `initial` props over manual spring config.
5. Skip all animations when `useReducedMotion()` returns `true`.
6. **Horizontal Scroll**: Use GSAP `snap` for horizontal ScrollTrigger sections to ensure the view smoothly slides and aligns to the nearest project/panel when the user finishes scrolling. Use smooth easing (e.g. `power3.inOut`) and a short delay.

---

## Backend Rules

1. All routes under `/api` prefix.
2. Validate all inputs with `express-validator` before processing.
3. Rate limiting via `express-rate-limit` — already configured in middleware.
4. Never expose stack traces or internal error details — use generic error messages.
5. CORS restricted to `ALLOWED_ORIGINS` env variable in production.
6. Request body limit: `10kb` max.
7. Env vars loaded via `dotenv` — reference `backend/.env.example` for required vars.

---

## Data Management

- Static content (projects, skills, leadership) lives in `src/data/` as JS arrays/objects.
- No CMS or external data fetching — keep it static.
- Contact form posts to `POST /api/contact` on the backend.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase | `SectionWrapper` |
| Hooks | camelCase, prefix `use` | `useMouseParallax` |
| Utilities | camelCase | `cn()` |
| CSS classes | kebab-case | `gradient-button` |
| Data files | camelCase | `projects.js` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |

---

## Git & Code Quality

- Run `npm run lint` (oxlint) before committing frontend changes.
- Keep commits atomic — one feature/fix per commit.
- No `console.log` in production code (`console.error` in backend catch blocks is OK).

---

## Do NOT

- Do not install new packages without asking the user first.
- Do not add React Router — this is a single-page scroll site, no routing.
- Do not use `@apply` excessively in `index.css` — prefer inline Tailwind.
- Do not use `any` types if TypeScript is ever added.
- Do not commit `.env` files.

---

## Last Updated

`2026-08-30` — Initial creation.
Update this date and the relevant rule when a new convention is adopted.
