<script lang="ts">
  import ProjectFeature from "$lib/components/ProjectFeature.svelte";
  import { getToolIconUrl } from "$lib/utils/tools.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import "$lib/styles/markdown.scss";

  let { data } = $props();
  let project = data.project;

  // Convert hex to RGB for backdrop gradient
  function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return "191, 133, 246"; // fallback to purple
  }

  // Get skill from project path
  function getSkillFromPath(path: string): string {
    const pathParts = path.split("/");
    const skillIndex = pathParts.findIndex((part) => part === "skills");
    return skillIndex !== -1 && pathParts[skillIndex + 1] ? pathParts[skillIndex + 1] : "development";
  }

  const skillSlug = getSkillFromPath(project.path);

  // Apply gradient to body on mount
  onMount(() => {
    const body = document.body;
    const rgb = hexToRgb(project.accent);
    body.style.background = `conic-gradient(from 180deg at 50% 110%, rgba(${rgb}, 0.1) 0%, rgba(${rgb}, 0.05) 25%, rgba(0, 0, 0, 0.8) 70%)`;

    return () => {
      // Reset body background on cleanup
      body.style.background = "";
    };
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

<div class="project-page" style="--project-accent: {project.accent}; --project-accent-rgb: {hexToRgb(project.accent)}">
  <div class="back-button-container">
    <button class="back-button" onclick={() => goto(`/${skillSlug}`)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to {skillSlug}
    </button>
  </div>

  <div class="project-content">
    <div class="project-image">
      {#if project.feature && (project.feature.video || project.feature.embed || project.feature.youtube)}
        <ProjectFeature feature={project.feature} title={project.title} poster={project.poster} />
      {:else if project.image}
        <img src={project.image} alt={project.title} />
      {:else}
        <img src={project.poster} alt={project.title} />
      {/if}
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
            <img src={getToolIconUrl(tool)} alt={tool} class="tool-icon" title={tool} onerror={() => {}} />
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
</div>

<style lang="scss">
  .project-page {
    padding: 6rem 2rem 2rem 2rem;
    max-width: 900px;
    margin: 0 auto;
    color: var(--sinon-white);
    min-height: 100vh;
    position: relative;
  }

  .back-button-container {
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 1002;
  }

  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: var(--sinon-white);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: capitalize;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: var(--project-accent);
      transform: translateY(-1px);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .project-header {
    text-align: center;
    margin-bottom: 1rem;

    h1 {
      font-family: "DM Serif Display", serif;
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

    img,
    :global(iframe),
    :global(video) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }

    :global(iframe) {
      border: none;
    }

    :global(video) {
      background: #000;
    }
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

  .tool-icon {
    width: 20px;
    height: 20px;
    opacity: 0.8;
    transition: all 0.3s ease;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    padding: 2px;
    flex-shrink: 0;
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

    .back-button-container {
      top: 1rem;
      left: 1rem;
    }

    .back-button {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;

      svg {
        width: 14px;
        height: 14px;
      }
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
