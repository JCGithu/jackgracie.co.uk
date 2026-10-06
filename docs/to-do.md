- Design the cards
- Fix the banners
- Make reels like holographic card packs

## Quick fixes

### Packages

- Remove `@types/animejs`. Version 4.0.0 is an empty, deprecated stub because animejs 4 ships its own types. Run `bun remove @types/animejs`.
- Remove `poline`. Nothing in the project imports it. Run `bun remove poline`.
- Keep `typescript` on `~6` for now. svelte-check can only use TypeScript 7 if both 6 and 7 are installed (`typescript@~6` plus `@typescript/native@npm:typescript@7`) and the check scripts pass `--tsgo`. Not worth it yet.

### Content

- Senua's `poster` is the tall card art from the image-card design, so it looks squashed in the old card layout. Swap it for a landscape image like the other projects use.

### Git

- Commit the `netlify.toml` change. It adds the `/alison` redirect, which was in `src/lib/redirects.ts` but had never been synced.
- Delete `src/app.css` and `src/app.css.map`. Nothing imports them. They look like output from a Sass compiler watching `src/app.scss`, so turn that off or add them to `.gitignore`.

### `bun check` warnings: props copied into plain variables

Svelte warns when a prop is copied into a normal `let` or `const`. The copy won't update if the prop changes. On most of these pages the data never changes after load, so nothing is broken, but the fix is quick: wrap the value in `$derived(...)` or read the prop directly.

- `src/lib/transition.svelte:14`: `let previousUrl = $state(url);`
- `src/lib/components/YouTube.svelte:15`: `let videoId = extractVideoId(url);`
- `src/lib/components/ProjectFeature.svelte:7-10`: the `url`, `youtube`, `video` and `image` flags all read `project.feature` once.
- `src/lib/components/Gallery.svelte:23`: `let validImages = images.map(...)`
- `src/lib/components/Instagram.svelte:11`: `embedUrl` reads `reelId` and `hideCaption` once.
- `src/lib/components/Navigation.svelte:19`: `let skills = data.skills;`
- `src/routes/(app)/+layout.svelte:11-13`: the `colours` map loop reads `data.skills` once.
- `src/routes/(app)/+page.svelte:13`: `let skills = data.skills;`
- `src/routes/(app)/project/[slug]/+page.svelte:16-17`: `project` and `relatedProjects`. Likely a real bug, because going from one project to a related project reuses the page and keeps the old values.
- `src/routes/wishlist/+page.svelte:6`: `let wishlist = data.wishlist;`

### `bun check` warnings: unused CSS

- `src/lib/components/BasicSkillPage.svelte`: `.description p` is unused because the skill description paragraph is commented out.
- `src/routes/(app)/+page.svelte`: `.menuSection` is unused because its markup is commented out.
