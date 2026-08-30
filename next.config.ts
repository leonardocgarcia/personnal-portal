import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /sobre was the page's URL before the English translation pass;
      // redirect any existing bookmarks/inbound links/indexed results.
      { source: "/sobre", destination: "/about", permanent: true },
      // The 3 seed posts were re-slugged to English along with their
      // translated content — same reasoning.
      { source: "/posts/bem-vindo", destination: "/posts/welcome", permanent: true },
      {
        source: "/posts/notas-sobre-foco",
        destination: "/posts/notes-on-focus",
        permanent: true,
      },
      {
        source: "/posts/livro-clean-architecture",
        destination: "/posts/book-clean-architecture",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
