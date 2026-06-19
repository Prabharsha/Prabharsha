# Prabharsha — Portfolio Website

A modern, dark "aurora-glass" portfolio built with **Next.js 14**, **Tailwind CSS**, **Framer
Motion** and **next-themes**.

## Tech

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + custom theme tokens
- Framer Motion (scroll & hover animations)
- next-themes (dark/light toggle)
- react-icons (Simple Icons) + lucide-react

## Run locally

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Editing content

All content lives in **`data/site.ts`** — name, role, bio, location, email, social links,
skills, projects and experience. Edit that one file to update the site; no component changes
needed for routine updates.

- Replace **`public/resume.pdf`** with your real CV (the placeholder is a stub).
- Project cards, tags and links are defined in the `projects` array.
- Experience timeline is the `experience` array.

## Deploy to Vercel

1. Push this repo to GitHub (the app lives in the `website/` subfolder).
2. In Vercel, **Import** the repository.
3. Set **Root Directory = `website`** (important — the Next.js app is not at the repo root).
4. Framework preset is auto-detected as **Next.js**; keep the default build command
   (`next build`) and output.
5. Deploy.

### Custom domain

In the Vercel project → **Settings → Domains**, add your domain and follow the DNS instructions.
Update `siteUrl` in `app/layout.tsx` to your final URL so SEO/OG metadata is correct.
