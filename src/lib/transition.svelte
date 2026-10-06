<script lang="ts">
  import { onMount, untrack, type Snippet } from "svelte";
  import { beforeNavigate, onNavigate } from "$app/navigation";

  type Props = {
    children: Snippet;
    url: string;
    colours: Map<string, string>;
  };

  type Phase = "idle" | "covering" | "covered" | "revealing";

  let { children, url, colours }: Props = $props();

  const Timings = {
    cover: 500,
    reveal: 600,
    media: 1200,
  };

  const WAVE_PATH = "M0,256L17.1,234.7C34.3,213,69,171,103,176C137.1,181,171,235,206,234.7C240,235,274,181,309,133.3C342.9,85,377,43,411,26.7C445.7,11,480,21,514,58.7C548.6,96,583,160,617,186.7C651.4,213,686,203,720,181.3C754.3,160,789,128,823,138.7C857.1,149,891,203,926,213.3C960,224,994,192,1029,165.3C1062.9,139,1097,117,1131,90.7C1165.7,64,1200,32,1234,58.7C1268.6,85,1303,171,1337,197.3C1371.4,224,1406,192,1423,176L1440,160L1440,320L0,320Z";

  const colourFor = (path: string) => colours.get(path.split("/").pop() || "") || "#a67cf3";

  let band = $state<HTMLDivElement>();
  let page = $state<HTMLDivElement>();
  let phase = $state<Phase>("revealing");
  let intro = $state(true);
  let colour = $state(untrack(() => colourFor(url)));

  let animation: Animation | undefined;
  let covering: Promise<void> = Promise.resolve();
  let navId = 0;

  const travel = () => band!.offsetHeight + band!.offsetWidth * (320 / 1440);

  function slide(from: string, to: string, duration: number, easing: string) {
    animation?.cancel();
    animation = band!.animate([{ transform: from }, { transform: to }], { duration, easing, fill: "forwards" });
    return animation.finished.then(
      () => {},
      () => {},
    );
  }

  function cover(nextColour: string) {
    if (phase === "covering" || phase === "covered") return;
    const from = phase === "idle" ? `translateY(${travel()}px)` : getComputedStyle(band!).transform;
    if (phase === "idle") colour = nextColour;
    phase = "covering";
    intro = false;
    covering = slide(from, "none", Timings.cover, "cubic-bezier(0.3, 0, 0.2, 1)").then(() => {
      if (phase === "covering") phase = "covered";
    });
  }

  async function reveal(id: number) {
    await covering;
    if (id !== navId || phase !== "covered") return;
    phase = "revealing";
    await slide("none", `translateY(${-travel()}px)`, Timings.reveal, "cubic-bezier(0.6, 0, 0.4, 1)");
    if (phase === "revealing") {
      phase = "idle";
      animation?.cancel();
    }
  }

  function isOnScreen(el: Element) {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
  }

  function onScreenMediaReady() {
    const pending: Promise<unknown>[] = [document.fonts.ready];
    for (const img of page!.querySelectorAll("img")) {
      if (isOnScreen(img)) pending.push(img.decode().catch(() => {}));
    }
    for (const video of page!.querySelectorAll<HTMLVideoElement>("video[poster]")) {
      if (!isOnScreen(video)) continue;
      const poster = new Image();
      poster.src = video.poster;
      pending.push(poster.decode().catch(() => {}));
    }
    return Promise.race([Promise.all(pending), new Promise((resolve) => setTimeout(resolve, Timings.media))]);
  }

  beforeNavigate((navigation) => {
    if (navigation.willUnload || !navigation.to || navigation.to.url.pathname === navigation.from?.url.pathname) return;
    const id = ++navId;
    cover(colourFor(navigation.to.url.pathname));
    navigation.complete.catch(() => reveal(id));
  });

  onNavigate(async () => {
    if (phase !== "covering" && phase !== "covered") return;
    const id = navId;
    await covering;
    return async () => {
      await onScreenMediaReady();
      reveal(id);
    };
  });

  onMount(() => {
    Promise.all(band!.getAnimations().map((a) => a.finished)).finally(() => {
      if (intro) {
        intro = false;
        phase = "idle";
      }
    });
  });
</script>

<svelte:window
  onpageshow={(event) => {
    if (event.persisted) {
      animation?.cancel();
      phase = "idle";
    }
  }}
/>

<div bind:this={page} class="page">
  {#key url}
    {@render children()}
  {/key}
</div>

<div class="wipe" class:intro data-wipe data-phase={phase} style:--wipe-colour={colour} aria-hidden="true">
  <div class="frame">
    <div class="band" bind:this={band}>
      <svg class="wave top" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d={WAVE_PATH} /></svg>
      <svg class="wave bottom" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d={WAVE_PATH} /></svg>
    </div>
  </div>
</div>

<style lang="scss">
  .page {
    display: contents;
  }

  .wipe {
    --angle: 20deg;
    position: fixed;
    inset: 0;
    z-index: 1000;
    overflow: hidden;
    pointer-events: none;
    contain: strict;

    &[data-phase="idle"] {
      visibility: hidden;
    }

    @media (max-aspect-ratio: 12/10) {
      --angle: 10deg;
    }
  }

  .frame {
    position: absolute;
    top: 50%;
    left: 50%;
    rotate: var(--angle);
  }

  .band {
    --w: calc(100vw * cos(var(--angle)) + 100vh * sin(var(--angle)) + 4px);
    --h: calc(100vh * cos(var(--angle)) + 100vw * sin(var(--angle)) + 4px);
    --wave: calc(var(--w) * 320 / 1440);
    position: absolute;
    width: var(--w);
    height: var(--h);
    left: calc(var(--w) / -2);
    top: calc(var(--h) / -2);
    background: var(--wipe-colour);

    .wipe:not([data-phase="idle"]) & {
      will-change: transform;
    }
  }

  .wave {
    position: absolute;
    left: 0;
    width: 100%;
    height: var(--wave);
    display: block;
    fill: var(--wipe-colour);

    &.top {
      bottom: calc(100% - 1px);
    }

    &.bottom {
      top: calc(100% - 1px);
      rotate: 180deg;
    }
  }

  .intro .band {
    animation: wipe-intro 500ms ease-in forwards;
  }

  @keyframes wipe-intro {
    to {
      transform: translateY(calc(-100% - var(--wave)));
    }
  }
</style>
