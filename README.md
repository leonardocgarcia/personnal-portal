# Portal Pessoal

Projeto pessoal para publicação de pensamentos, estudos e recomendações — um feed único, com posts em Markdown, filtráveis por tag.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- TypeScript + Tailwind CSS 4
- Conteúdo em Markdown (`content/posts/`), sem banco de dados

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Escrevendo um novo post

Crie um arquivo `.md` em `content/posts/`, por exemplo `content/posts/meu-post.md`:

```markdown
---
title: "Título do post"
date: "2026-08-29"
tags: ["pensamento"]
description: "Resumo curto que aparece no feed."
---

Conteúdo do post em Markdown normal.
```

- `tags` aceita um ou mais valores de `pensamento`, `estudo`, `recomendacao` (ver `src/lib/tags.ts`).
- `date` no formato `AAAA-MM-DD`, usado para ordenar o feed (mais recente primeiro).
- O slug da URL (`/posts/<slug>`) é o nome do arquivo, sem `.md`.

## Estrutura

```
content/posts/        posts em Markdown
src/lib/posts.ts       leitura e parsing dos posts
src/lib/tags.ts         definição das tags disponíveis
src/app/page.tsx        feed (com filtro por tag via ?tag=)
src/app/posts/[slug]/   página de um post
src/components/         Header, Footer, PostCard, TagBadge, TagFilter
```

## Deploy

- Produção: https://leocgarcia.me (alias também disponível em https://personnal-portal.vercel.app)
- Repositório: https://github.com/leonardocgarcia/personnal-portal
- Deploy automático via integração Git da Vercel — todo push em `main` gera um deploy de produção; outras branches geram preview deployments.
