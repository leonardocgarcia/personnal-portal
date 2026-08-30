// Shared width tokens so the chrome (header/footer bar), the page shell
// (hero, list views) and the narrower "reading column" (article body,
// forms) stay consistent across pages instead of each one picking its
// own max-w-*. BAR is wider than SHELL on purpose: it's what lets the
// logo and nav actually reach toward the browser's edges instead of
// sitting in a centered island — SHELL/READ stay narrower for legibility.
export const BAR = "mx-auto w-full max-w-7xl px-6 sm:px-10";
export const SHELL = "mx-auto w-full max-w-5xl px-6 sm:px-8";
export const READ = "mx-auto w-full max-w-2xl px-6 sm:px-8";
