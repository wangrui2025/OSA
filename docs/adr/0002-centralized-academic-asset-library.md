# Asset paths reference `/academic/` (centralized asset library), not project-local copies

All publication figures, logos, and supplementary images are stored in the `mykcs/academic` repository and deployed as a standalone site at `wangrui2025.github.io/academic/`. Both the main personal homepage and the OSA project reference these assets via absolute paths (`/academic/images/...`).

This was a deliberate choice to avoid asset duplication: updating a figure in `mykcs/academic/meta/image-map.json` propagates to all consumers on the next build. The alternative — copying assets into each project's `public/` — would require manual sync and risk divergence.

**Status:** accepted
