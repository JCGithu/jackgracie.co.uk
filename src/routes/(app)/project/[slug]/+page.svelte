<script lang="ts">
  import ProjectFeature from "$lib/components/ProjectFeature.svelte";
  import DynamicBackground from "$lib/components/DynamicBackground.svelte";
  import ToolIcon from "$lib/components/ToolIcon.svelte";
  import "$lib/styles/markdown.scss";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { goto } from "$app/navigation";
  import { horizontalScroll } from "$lib/utils/horizontalScroll.js";
  let { data } = $props();

  let project = data.project;
  let relatedProjects = data.relatedProjects;
</script>

<DynamicBackground accent={project.accent} scrollable={true} />

<svelte:head>
  {#if project}
    <title>{project.title} - Jack</title>
    <meta name="description" content={project.description} />
  {:else}
    <title>Jack Gracie</title>
    <meta name="description" content="Project page" />
  {/if}
</svelte:head>

<div class="project-page" style="--project-accent: {project.accent}">
  <div class="project-content">
    <div class="project-image">
      <ProjectFeature feature={project.feature} title={project.title} poster={project.poster} />
    </div>

    <div class="project-header">
      <h1>{project.title}</h1>
    </div>

    <div class="description">
      {@html project.description}
    </div>

    <div class="project-content-body">
      <project.content />
    </div>
  </div>

  <div class="project-metadata">
    <div class="metadata-left">
      {#if project.subtitle}
        <div class="metadata-item">
          <span class="metadata-label">Project:</span>
          <span class="metadata-value">{project.subtitle}</span>
        </div>
      {/if}

      {#if project.client}
        <div class="metadata-item">
          <span class="metadata-label">Client:</span>
          <span class="metadata-value">{project.client}</span>
        </div>
      {/if}
    </div>

    <div class="metadata-right">
      <div class="tools-list">
        {#each project.tools as tool}
          <div class="tool-item">
            <ToolIcon toolName={tool} />
            <span class="tool-name">{tool}</span>
          </div>
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

  {#if relatedProjects.length}
    <div class="projects-horizontal-scroll" use:horizontalScroll>
      {#each relatedProjects as related}
        <ProjectCard
          project={related}
          onProjectClick={() => {
            goto(`/project/${related.slug}`);
          }}
        />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use "$lib/styles/projects.scss" as projectStyles;
  @include projectStyles.projects-horizontal-scroll;

  .project-page {
    padding: 6rem 2rem 2rem 2rem;
    max-width: 900px;
    margin: 0 auto;
    //color: var(--sinon-white);
    color: var(--sinon-black);
    min-height: 100vh;
    position: relative;
  }

  .project-header {
    text-align: center;
    margin-bottom: 1rem;

    h1 {
      font-family: var(--font-pimento);
      font-size: 2.5rem;
      margin: 0;
      color: var(--project-accent);
    }
  }

  .project-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: start;
    margin-bottom: 2rem;
  }

  .project-metadata {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    position: sticky;
    bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .metadata-left,
  .metadata-right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .metadata-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .metadata-label {
    font-size: 0.9rem;
    color: var(--project-accent);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .metadata-value {
    font-size: 1rem;
    color: var(--sinon-white);
    opacity: 0.9;
  }

  .project-image {
    width: 100%;
    max-width: 800px;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
  }

  .description {
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
    font-size: 1rem;
  }

  .tools-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .tool-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--project-accent);
      transform: translateX(3px);
    }
  }

  .tool-name {
    font-size: 0.85rem;
    color: var(--sinon-white);
    font-weight: 500;
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

  // Mobile responsive styles
  @media screen and (max-width: 768px) {
    .project-page {
      padding: 6rem 1rem 1rem 1rem;
    }

    .project-header h1 {
      font-size: 2rem;
    }

    .project-content {
      gap: 1.5rem;
    }

    .project-metadata {
      padding: 1.5rem;
      position: relative;
      bottom: auto;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .metadata-left,
    .metadata-right {
      gap: 1rem;
    }

    .links-list {
      flex-direction: column;
    }
  }
</style>
