
# ScalePilot™ Dashboard (Vercel-ready)

Next.js App Router dashboard that serves demo data through API routes. Deployable to Vercel with one click or CLI.

## Local dev
```bash
npm i
npm run dev
```

## Deploy to Vercel
1) Push this folder to a new GitHub repo.
2) In Vercel, **New Project** → import the repo.
3) Framework preset: **Next.js**. Build command: `next build`. Output: `.next` (default).
4) Click **Deploy**.

No env vars needed for this demo.

## API routes
- `GET /api/summary`
- `GET /api/top-regions`
- `POST /api/nudge-lead` { deal_id, owner }

## Customize with real data
Replace files in `public/data/` with your own exports:
- `summary.json`
- `crm.json`

(You can keep static PNG charts in `public/` or render charts client-side.)
