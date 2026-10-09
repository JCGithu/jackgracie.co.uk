<script lang="ts">
  import type { Chapter } from "$lib/utils/types.js";
  import ProjectFeature from "./ProjectFeature.svelte";
  import ToolIcon from "./ToolIcon.svelte";

  let { chapters }: { chapters: Chapter[] } = $props();
</script>

<div class="chapters">
  {#each chapters as chapter (chapter.slug)}
    <section id={chapter.slug} class="chapter" style={chapter.accent ? `--chapter-accent: ${chapter.accent}` : undefined}>
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

  .chapter {
    --chapter-accent: var(--project-accent);
    padding: 2.5rem 0;
    border-top: 3px solid var(--chapter-accent);
    scroll-margin-top: 4rem;
  }

  .chapter-header {
    margin-bottom: 1.5rem;

    h2 {
      font-family: var(--font-pimento);
      color: var(--chapter-accent);
      margin: 0 0 0.5rem 0;
    }
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
