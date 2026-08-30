# Admin guide

How to access the admin area and publish posts (text, images, and videos).

## 1. Log in

1. Go to **`/admin/login`** (e.g. https://leocgarcia.me/admin/login)
2. Enter the admin password (see [Changing the password](#changing-the-password) if you're not sure where to find it)
3. You're redirected to **`/admin`**, the dashboard with the list of all posts

The session lasts 30 days (signed cookie). To log out, click **Log out** at the top of the dashboard.

After 5 wrong-password attempts from the same IP within 15 minutes, login gets temporarily locked out — even if the next attempt has the right password. This protects against brute-force guessing; if it happens to you by accident, wait a few minutes and try again.

## 2. Create a new post

1. In the dashboard, click **+ New post**
2. Fill in:
   - **Title** — required. The post's URL (`/posts/something`) is generated from it automatically.
   - **Short description** — optional, shows up on the feed card and as the SEO description.
   - **Tags** — check one or more: Thought, Study, Recommendation.
   - **Visibility**:
     - **Public** — any visitor to the site can see it.
     - **Private** — only shows up for you, logged in as admin. Visitors get a 404 if they try to open the URL directly.
3. Write the content in the editor:
   - Toolbar: bold, italic, strikethrough, headings (H2/H3), lists, quote, link
   - **Image**: click "Image", pick a file from your computer — it's uploaded to Vercel Blob and inserted automatically
   - **Video**: same idea, click "Video" and pick a file (max 50MB per file)
4. Click **Publish**

## 3. Edit or delete a post

In the dashboard (`/admin`), every post has **Edit** and **Delete** links — deleting asks for a two-step confirmation before it actually happens.

## 4. Public vs. private visibility

- **Public** posts show up on the feed (`/`) and are indexable by search engines.
- **Private** posts only show up in the feed and on the post page while you're logged in as admin; for anyone else, the URL returns a 404 and the page isn't indexed.
- **Note on media**: uploaded images/videos live on Vercel Blob with public URLs, but with random, unlisted names — no one finds the file without the exact link. That's fine for private notes, but it isn't a real access barrier (opening the file directly doesn't require login). Don't use it for anything genuinely sensitive.

## Changing the password

The admin password lives in the `ADMIN_PASSWORD` environment variable, set on Vercel (it's not in any file in the repository). To change it:

```bash
npx vercel env rm ADMIN_PASSWORD production preview development
echo -n "your-new-password" | npx vercel env add ADMIN_PASSWORD production
echo -n "your-new-password" | npx vercel env add ADMIN_PASSWORD preview
echo -n "your-new-password" | npx vercel env add ADMIN_PASSWORD development
npx vercel env pull .env.local --yes
```

After that, any sessions that are already open stay valid until they expire (30 days) — if you want to invalidate old sessions right away, rotate `ADMIN_SESSION_SECRET` the same way.

## Where the data lives

- **Posts** (title, tags, content, visibility): Postgres (Neon), via Vercel Marketplace — `posts` table, schema in `src/db/schema.ts`
- **Images and videos**: Vercel Blob
- **Subscribers**: Postgres, `subscribers` table — export from `/admin/subscribers`
- There are no Markdown files left in the repository — all content is edited through the `/admin` dashboard
