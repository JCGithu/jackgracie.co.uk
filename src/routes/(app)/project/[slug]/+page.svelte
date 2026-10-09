<script lang="ts">
  import ProjectFeature from "$lib/components/ProjectFeature.svelte";
  import DynamicBackground from "$lib/components/DynamicBackground.svelte";
  import ToolIcon from "$lib/components/ToolIcon.svelte";
  import "$lib/styles/markdown.scss";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import ProjectChapters from "$lib/components/ProjectChapters.svelte";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import { ElementSize } from "runed";
  import { horizontalScroll } from "$lib/utils/horizontalScroll.js";
  let { data } = $props();

  let project = data.project;
  let relatedProjects = data.relatedProjects;
  let chapters = $derived(data.chapters);
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

<div class="project-layout" style="--project-accent: {project.accent}">
  <div class="project-page">
    <div class="title-container">
      <div class="feature-container">
        <ProjectFeature {project} priority />
      </div>
      <h1>{project.title}</h1>
      <p class="project-year">{project.year}</p>
    </div>

    <div class="project-content">
      {#if chapters.length}
        <nav class="chapter-nav" aria-label="Chapters">
          <span class="chapter-nav-label">Chapters</span>
          <div>
            {#each chapters as chapter (chapter.slug)}
              <a href="#{chapter.slug}" style={chapter.accent ? `--chapter-accent: ${chapter.accent}` : undefined}>{chapter.title}</a>
            {/each}
          </div>
        </nav>
      {/if}
      <project.content />
      <ProjectChapters {chapters} />
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

  <footer class="project-banner">
    <div class="banner-inner">
      <div class="banner-main">
        {#if project.subtitle}
          <span class="metadata-value banner-subtitle">{project.subtitle}</span>
        {/if}
        <div class="description">
          {@html project.description}
        </div>
      </div>

      <div class="banner-meta">
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
        </div>

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
  </footer>
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

  // The banner grows to fill any space left below short pages, so it always reaches the bottom
  .project-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .project-page {
    width: 100%;
    padding: 6rem 2rem 2rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
    color: var(--sinon-black);
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

  .project-content {
    z-index: 5;
  }

  .chapter-nav {
    // display: flex;
    display: grid;
    grid-template-columns: 1fr 4fr;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    div {
      display: flex;
      flex-wrap: wrap;
      a {
        margin: 2px;
      }
    }

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

  .project-banner {
    --banner-value: var(--sinon-white);
    flex: 1;
    width: 100%;
    background: var(--project-accent);
    color: var(--sinon-black);
    font-size: 0.9rem;
  }

  .banner-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .banner-main,
  .banner-meta {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .banner-subtitle {
    font-weight: 600;
    font-size: 1rem;
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
    color: var(--banner-value);
    opacity: 0.9;
  }

  // Capped by viewport height so a 16:9 feature never fills more than ~70% of the screen
  .feature-container {
    width: 100%;
    max-width: min(100%, calc(70vh * 16 / 9));
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
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-link {
    color: var(--banner-value);
    text-decoration: none;
    padding: 0.875rem 1.5rem;
    background: transparent;
    border-radius: 0.5rem;
    border: 1px solid currentColor;
    transition: all 0.3s ease;
    text-align: center;
    font-weight: 600;
    display: block;

    &:hover {
      background: var(--sinon-black);
      border-color: var(--sinon-black);
      color: var(--sinon-white);
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
    }

    .title-container h1 {
      font-size: 2rem;
    }

    .banner-inner {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.5rem 1rem;
    }
  }
</style>
