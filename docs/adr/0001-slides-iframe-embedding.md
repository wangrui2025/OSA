# Poster and slides rendered via iframe, not as Astro components

Poster (`poster.html`) and slides (`slides.html`) are complete third-party-generated documents (CVPR2026 artifacts). Rendering them as Astro components would require rewriting ~30KB and ~54KB of HTML/CSS into `.astro` files, including KaTeX math, Pokémon favicon CDN fetch, per-slide responsive scaling, and print stylesheet — a costly reimplementation for content that is owned externally.

We embed them via `<iframe>` inside a minimal Astro shell (`src/pages/[lang]/poster.astro`, `src/pages/[lang]/slides.astro`). The iframe URL resolves to the Astro base (`/poster.html`, `/slides.html` served from `public/`), keeping the shell thin and the artifacts faithful.

The slides shell additionally provides a zoom/print control bar (CSS-transform-based, keyboard-shortcut-enabled) that does not modify the iframe content — this is intentionally a layer on top, not part of the document itself.

**Status:** accepted
