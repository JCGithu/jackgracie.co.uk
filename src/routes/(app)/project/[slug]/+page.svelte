<script lang="ts">
  import ProjectFeature from "$lib/components/ProjectFeature.svelte";
  import DynamicBackground from "$lib/components/DynamicBackground.svelte";
  import ToolIcon from "$lib/components/ToolIcon.svelte";
  import "$lib/styles/markdown.scss";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import ProjectChapters from "$lib/components/ProjectChapters.svelte";
  import type { Chapter } from "$lib/utils/types.js";
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { ElementSize } from "runed";
  import { scrollY } from "svelte/reactivity/window";
  import { onMount } from "svelte";
  import { horizontalScroll } from "$lib/utils/horizontalScroll.js";
  let { data } = $props();

  let project = data.project;
  let relatedProjects = data.relatedProjects;
  let chapters = $derived(data.chapters);
  let activeChapter: Chapter | undefined = $state();
  let showMetadata = $derived((scrollY?.current ?? 0) > 50);
  onMount(() => {
    let scrollHeight = document.documentElement.scrollHeight;
    if (scrollHeight <= window.innerHeight) showMetadata = true;
  });
</script>

<svelte:head>
  {#if project}
    <title>{project.title} - Jack</title>
    <meta name="description" content={project.description} />
  {:else}
    <title>Jack Gracie</title>
    <meta name="description" content="Project page" />
  {/if}
</svelte:head>

<div class="project-page" class:on-accent={activeChapter} style="--project-accent: {project.accent}">
  <div class="title-container">
    <div class="feature-container">
      <ProjectFeature {project} priority />
    </div>
    <h1>{project.title}</h1>
    <p class="project-year">{project.year}</p>
  </div>

  <div class="project-body">
    <div class="project-content">
      {#if chapters.length}
        <nav class="chapter-nav" aria-label="Chapters">
          <span class="chapter-nav-label">Chapters</span>
          {#each chapters as chapter (chapter.slug)}
            <a href="#{chapter.slug}" style={chapter.accent ? `--chapter-accent: ${chapter.accent}` : undefined}>{chapter.title}</a>
          {/each}
        </nav>
      {/if}
      <project.content />
      <ProjectChapters {chapters} bind:active={activeChapter} />
    </div>
    <aside class="sidebar">
      {#if showMetadata}
        <div class="metadata" transition:fly={{ x: -200 }}>
          <div class="metadata-inner">
            {#if project.subtitle}
              <div class="metadata-item">
                <span class="metadata-value">{project.subtitle}</span>
              </div>
            {/if}
            <div class="description">
              {@html project.description}
            </div>

            {#if project.client}
              <div class="metadata-item">
                <span class="metadata-label">Client:</span>
                <span class="metadata-value">{project.client}</span>
              </div>
            {/if}

            <div class="tools-list">
              {#each project.tools as tool}
                <ToolIcon toolName={tool} />
              {/each}

              {#if project.links && project.links.length > 0}
                <div class="links-list">
                  {#each project.links as link}
                    <a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link">
                      {link.text}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </aside>
  </div>

  {#if relatedProjects.length}
    <h3>Related Projects</h3>
    <div class="projects-horizontal-scroll" use:horizontalScroll>
      {#each relatedProjects as related}
        <ProjectCard
          project={related}
          horizontal={true}
          onProjectClick={() => {
            goto(`/project/${related.slug}`);
          }}
        />
      {/each}
    </div>
  {/if}
</div>

<DynamicBackground />

<style lang="scss">
  @use "$lib/styles/projects.scss" as projectStyles;
  @use "$lib/styles/_breakpoints" as *;
  @use "$lib/styles/_scrollbars.scss" as *;
  @include projectStyles.projects-horizontal-scroll;

  :global(html) {
    --project-accent: var(--project-accent);
  }

  .project-page {
    padding: 6rem 2rem 2rem 2rem;
    max-width: 1100px;
    position: fixed;
    margin: 0 auto;
    color: var(--sinon-black);
    position: static;

    gap: 2rem;
  }

  .title-container {
    text-align: center;
    margin-bottom: 1rem;

    h1 {
      font-family: var(--font-pimento);
      font-size: 2.5rem;
      margin: 2rem 0 0.5rem;
      color: var(--project-accent);
    }

    .project-year {
      margin: 0 0 2rem 0;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }
  }

  .project-body {
    display: grid;
    grid-template-columns: 1fr 0.3fr;
    grid-gap: 2rem;
    align-items: baseline !important;
  }

  .project-content {
    z-index: 5;
  }

  // The sidebar sits over the active chapter's accent band, so it switches to off-white
  .on-accent {
    .metadata-inner {
      background: var(--off-white);
    }

    .metadata-value {
      color: var(--sinon-black);
    }
  }

  .chapter-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    a {
      --chapter-accent: var(--project-accent);
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      border: 2px solid var(--chapter-accent);
      color: var(--chapter-accent);
      font-weight: 600;
      text-decoration: none;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;

      &:hover {
        background-color: var(--chapter-accent);
        color: var(--sinon-white);
      }
    }
  }

  .chapter-nav-label {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.8rem;
  }

  .sidebar {
    position: sticky !important;
    top: 5rem;
    align-self: start;
    z-index: 4;
  }

  @keyframes skew {
    from {
      transform: skew(-20deg);
    }
    to {
      transform: skew(0deg);
    }
  }

  .metadata-inner {
    background: var(--project-accent);
    border-radius: 1rem;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.8rem !important;
    animation: skew 0.4s ease-out;
    transition: background-color 0.8s ease;
  }

  .metadata-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .metadata-label {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .metadata-value {
    color: var(--sinon-white);
    opacity: 0.9;
    transition: color 0.8s ease;
  }

  .feature-container {
    width: 100%;
    //max-width: 800px;
    //aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    // background-color: red;
  }

  .description {
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
    //font-size: 1rem;
  }

  .tools-list {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-link {
    color: var(--sinon-white);
    text-decoration: none;
    padding: 0.875rem 1.5rem;
    background: transparent;
    border-radius: 0.5rem;
    border: 1px solid var(--project-accent);
    transition: all 0.3s ease;
    text-align: center;
    font-weight: 600;
    display: block;

    &:hover {
      background: var(--project-accent);
      color: var(--sinon-black);
      transform: translateY(-1px);
    }
  }

  @media screen and (max-width: $bp-mobile-small) {
    .project-page {
      padding: 6rem 0.5rem 0.5rem 0.5rem;
    }
  }

  // Mobile responsive styles
  @media screen and (max-width: $bp-mobile) {
    .project-page {
      padding: 6rem 1rem 1rem 1rem;
      flex-direction: column;
      gap: 2rem;
    }

    .project-body {
      grid-template-columns: 1fr;
    }

    .sidebar {
      margin-bottom: 1rem;
    }

    .title-container {
      flex: none;
    }

    .title-container h1 {
      font-size: 2rem;
    }

    .metadata {
      position: static; // Remove sticky on mobile
      top: auto;
    }

    .metadata-inner {
      padding: 1.5rem;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .links-list {
      flex-direction: column;
    }
  }
</style>
