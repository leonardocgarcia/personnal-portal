# Portal Pessoal

Projeto pessoal para publicação de pensamentos, estudos e recomendações — feed único, filtrável por tag, com área de admin para publicar posts (texto, imagens e vídeo) como público ou privado.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- TypeScript + Tailwind CSS 4
- Postgres via [Neon](https://neon.tech) (Vercel Marketplace) — armazena os posts
- [Vercel Blob](https://vercel.com/docs/vercel-blob) — armazena imagens e vídeos enviados pelo admin
- [Tiptap](https://tiptap.dev) — editor rich text da área de admin
- Autenticação: sessão via cookie assinado (JWT/`jose`), senha única de admin, com rate-limit de tentativas por IP
- SEO: `sitemap.xml`, `robots.txt` e imagens de Open Graph geradas dinamicamente (`next/og`)
- RSS em `/feed.xml`
- [Vercel Analytics](https://vercel.com/docs/analytics)

## Rodando localmente

```bash
npm install
npx vercel link          # se ainda não estiver linkado
npx vercel env pull .env.local --yes
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Área de admin em `/admin/login` (ver [ADMIN.md](./ADMIN.md)).

## Publicando conteúdo

Não há mais posts em Markdown no repositório — todo post é criado pelo painel de admin. Veja o passo a passo completo em **[ADMIN.md](./ADMIN.md)**.

## Estrutura

```
src/db/schema.ts                        schema do Postgres (tabela posts)
src/lib/posts.ts                        leitura/escrita de posts (com regras de visibilidade)
src/lib/auth.ts                         sessão do admin (senha + cookie assinado)
src/lib/tags.ts                          tags disponíveis
src/app/page.tsx                         feed (com filtro por tag via ?tag=)
src/app/posts/[slug]/                    página de um post
src/app/sobre/                           página sobre
src/app/admin/login/                     login do admin
src/app/admin/(protected)/               painel, novo post, editar post (exige sessão)
src/components/admin/                    editor rich text (Tiptap) e formulário de post
src/components/                          Header, Footer, PostCard, TagBadge, TagFilter
```

## Deploy

- Produção: https://leocgarcia.me (alias também disponível em https://personnal-portal.vercel.app)
- Repositório: https://github.com/leonardocgarcia/personnal-portal
- Deploy automático via integração Git da Vercel — todo push em `main` gera um deploy de produção; outras branches geram preview deployments.
- Alterar o schema do banco: edite `src/db/schema.ts` e rode `npm run db:push`.
