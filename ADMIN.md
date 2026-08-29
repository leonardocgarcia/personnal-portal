# Guia do admin

Como acessar a área de administração e publicar posts (texto, imagens e vídeos).

## 1. Acessar o painel

1. Vá em **`/admin/login`** (ex: https://leocgarcia.me/admin/login)
2. Digite a senha de admin (ver [Trocar a senha](#trocar-a-senha) se não souber onde consultar)
3. Você é redirecionado para **`/admin`**, o painel com a lista de todos os posts

A sessão dura 30 dias (cookie assinado). Para sair, clique em **Sair** no topo do painel.

## 2. Criar um post novo

1. No painel, clique em **+ Novo post**
2. Preencha:
   - **Título** — obrigatório. A URL do post (`/posts/algo`) é gerada automaticamente a partir dele.
   - **Descrição curta** — opcional, aparece no card do feed e como descrição de SEO.
   - **Tags** — marque uma ou mais: Pensamento, Estudo, Recomendação.
   - **Visibilidade**:
     - **Público** — qualquer visitante do site vê.
     - **Privado** — só aparece pra você, logado como admin. Visitantes recebem 404 se tentarem acessar a URL diretamente.
3. Escreva o conteúdo no editor:
   - Barra de ferramentas: negrito, itálico, tachado, títulos (H2/H3), listas, citação, link
   - **Imagem**: clique em "Imagem", escolha o arquivo do seu computador — é enviado para o Vercel Blob e inserido automaticamente
   - **Vídeo**: mesma lógica, clique em "Vídeo" e escolha o arquivo (máx. 50MB por arquivo)
4. Clique em **Publicar**

## 3. Editar ou excluir um post

No painel (`/admin`), cada post tem os links **Editar** e **Excluir** — excluir pede uma confirmação em duas etapas antes de apagar de fato.

## 4. Visibilidade pública vs. privada

- Posts **públicos** aparecem no feed (`/`) e são indexáveis por buscadores.
- Posts **privados** só aparecem no feed e na página do post quando você está autenticado como admin; para qualquer outra pessoa, a URL retorna 404 e a página não é indexada.
- **Nota sobre mídia**: imagens/vídeos enviados ficam no Vercel Blob com URLs públicas, mas com nomes aleatórios e não-listados em lugar nenhum — ninguém encontra o arquivo sem ter o link exato. Isso é adequado para notas privadas, mas não é uma barreira de acesso real (não é um requisito de login para abrir o arquivo direto). Não é o lugar pra guardar algo verdadeiramente sensível.

## Trocar a senha

A senha do admin fica na variável de ambiente `ADMIN_PASSWORD`, configurada na Vercel (não está em nenhum arquivo do repositório). Para trocar:

```bash
npx vercel env rm ADMIN_PASSWORD production preview development
echo -n "sua-nova-senha" | npx vercel env add ADMIN_PASSWORD production
echo -n "sua-nova-senha" | npx vercel env add ADMIN_PASSWORD preview
echo -n "sua-nova-senha" | npx vercel env add ADMIN_PASSWORD development
npx vercel env pull .env.local --yes
```

Depois disso, todas as sessões já abertas continuam válidas até expirar (30 dias) — se quiser invalidar sessões antigas na hora, troque também `ADMIN_SESSION_SECRET` do mesmo jeito.

## Onde os dados ficam

- **Posts** (título, tags, conteúdo, visibilidade): Postgres (Neon), via Vercel Marketplace — tabela `posts`, schema em `src/db/schema.ts`
- **Imagens e vídeos**: Vercel Blob
- Não há mais arquivos Markdown no repositório — todo o conteúdo é editado pelo painel `/admin`
