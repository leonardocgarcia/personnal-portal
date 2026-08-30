# Portal Pessoal

A personal site for publishing thoughts, studies, and recommendations — a single feed, filterable by tag, with an admin area to publish posts (text, images, and video) as public or private.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- TypeScript + Tailwind CSS 4
- Postgres via [Neon](https://neon.tech) (Vercel Marketplace) — stores the posts
- [Vercel Blob](https://vercel.com/docs/vercel-blob) — stores images and videos uploaded by the admin
- [Tiptap](https://tiptap.dev) — rich text editor in the admin area
- Auth: signed-cookie session (JWT/`jose`), single admin password, with per-IP login rate-limiting
- SEO: `sitemap.xml`, `robots.txt`, and dynamically generated Open Graph images (`next/og`)
- RSS at `/feed.xml`
- [Vercel Analytics](https://vercel.com/docs/analytics)

## Running locally

```bash
npm install
npx vercel link          # if not already linked
npx vercel env pull .env.local --yes
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Admin area at `/admin/login` (see [ADMIN.md](./ADMIN.md)).

## Publishing content

There are no Markdown posts in the repository anymore — every post is created through the admin dashboard. See the full walkthrough in **[ADMIN.md](./ADMIN.md)**.

## Structure

```
src/db/schema.ts                        Postgres schema (posts table)
src/lib/posts.ts                        post reads/writes (with visibility rules)
src/lib/auth.ts                         admin session (password + signed cookie)
src/lib/tags.ts                          available tags
src/app/page.tsx                         feed (tag filter via ?tag=)
src/app/posts/[slug]/                    a single post's page
src/app/about/                           about page
src/app/admin/login/                     admin login
src/app/admin/(protected)/               dashboard, new post, edit post (requires a session)
src/components/admin/                    rich text editor (Tiptap) and post form
src/components/                          Header, Footer, PostCard, TagBadge, TagFilter
```

## Deploy

- Production: https://leocgarcia.me (also aliased at https://personnal-portal.vercel.app)
- Repository: https://github.com/leonardocgarcia/personnal-portal
- Automatic deploys via Vercel's Git integration — every push to `main` triggers a production deploy; other branches get preview deployments.
- To change the database schema: edit `src/db/schema.ts` and run `npm run db:push`.
