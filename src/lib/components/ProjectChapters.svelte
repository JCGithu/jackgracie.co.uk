<script lang="ts">
  import type { Chapter } from "$lib/utils/types.js";
  import { scrollY, innerHeight } from "svelte/reactivity/window";
  import ProjectFeature from "./ProjectFeature.svelte";
  import ToolIcon from "./ToolIcon.svelte";

  let { chapters, active = $bindable() }: { chapters: Chapter[]; active?: Chapter } = $props();

  const sections: HTMLElement[] = [];
  let onScreen: string[] = $state([]);

  // Matches the sticky sidebar's `top: 5rem`; `active` is the chapter behind the sidebar
  const SIDEBAR_LINE_PX = 80;

  $effect(() => {
    scrollY.current;
    const viewportHeight = innerHeight.current ?? 0;
    let current: Chapter | undefined;
    const visible: string[] = [];
    chapters.forEach((chapter, i) => {
      const rect = sections[i]?.getBoundingClientRect();
      if (!rect) return;
      if (rect.top < viewportHeight && rect.bottom > 0) visible.push(chapter.slug);
      if (rect.top <= SIDEBAR_LINE_PX) current = chapter;
    });
    const last = sections[chapters.length - 1];
    if (last && last.getBoundingClientRect().bottom < SIDEBAR_LINE_PX) current = undefined;
    active = current;
    if (visible.join() !== onScreen.join()) onScreen = visible;
  });
</script>

<div class="chapters">
  {#each chapters as chapter, i (chapter.slug)}
    <section bind:this={sections[i]} id={chapter.slug} class="chapter" class:active={onScreen.includes(chapter.slug)} style={chapter.accent ? `--chapter-accent: ${chapter.accent}` : undefined}>
      <header class="chapter-header">
        <h2>{chapter.title}</h2>
        {#if chapter.subtitle || chapter.role}
          <p class="chapter-meta">
            {#if chapter.subtitle}<strong>{chapter.subtitle}</strong>{/if}
            {#if chapter.subtitle && chapter.role}<span aria-hidden="true">·</span>{/if}
            {#if chapter.role}Role: {chapter.role}{/if}
          </p>
        {/if}
        <!-- {#if chapter.tools?.length}
          <div class="chapter-tools">
            {#each chapter.tools as tool}
              <ToolIcon toolName={tool} />
            {/each}
          </div>
        {/if} -->
      </header>

      {#if chapter.feature}
        <div class="chapter-feature">
          <ProjectFeature project={{ ...chapter, feature: chapter.feature }} />
        </div>
      {/if}

      <chapter.content />
    </section>
  {/each}
</div>

<style lang="scss">
  .chapters {
    margin-top: 3rem;
  }

  // The box-shadow plus horizontal clip-path stretches the band to the full viewport width
  // while keeping the section itself inside the content column
  .chapter {
    --chapter-accent: var(--project-accent);
    padding: 3rem 0;
    scroll-margin-top: 4rem;
    background-color: transparent;
    box-shadow: 0 0 0 100vmax transparent;
    clip-path: inset(0 -100vmax);
    transition:
      background-color 0.8s ease,
      box-shadow 0.8s ease;

    &.active {
      background-color: var(--chapter-accent);
      box-shadow: 0 0 0 100vmax var(--chapter-accent);
    }
  }

  .chapter-header {
    margin-bottom: 1.5rem;

    h2 {
      font-family: var(--font-pimento);
      color: var(--chapter-accent);
      margin: 0 0 0.5rem 0;
      transition: color 0.8s ease;
    }
  }

  .chapter.active .chapter-header h2 {
    color: var(--off-white);
  }

  .chapter-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0 0 0.75rem 0;
    color: var(--sinon-black);
    opacity: 0.8;
  }

  .chapter-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .chapter-feature {
    margin-bottom: 1.5rem;
  }
</style>
