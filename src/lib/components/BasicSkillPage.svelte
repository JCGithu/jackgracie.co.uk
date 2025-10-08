<script lang="ts">
  import ProjectModal from "./ProjectModal.svelte";
  import type { Skill, Project } from "$lib/utils/types.js";
  import { onMount, onDestroy } from "svelte";

  let { skillData }: { skillData: Skill } = $props();

  let projects = skillData.projects;
  let selectedProject: Project = $state(projects[0]);
  let isModalOpen = $state(false);

  function openModal(project: Project) {
    selectedProject = project;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<svelte:head>
  <title>{skillData.name} - Jack Gracie</title>
  <meta name="description" content="{skillData.name} projects by Jack Gracie" />
</svelte:head>

<div class="skill-page" class:modal-open={isModalOpen}>
  <div class="skill-banner">
    {#each skillData.banner as banner, index}
      <img src={banner.url} alt={banner.alt} class="banner-layer" style="z-index: {skillData.banner.length - index};" />
    {/each}
  </div>

  <div class="skill-content" style="--skill-accent: {skillData.accent}">
    <h1>{skillData.name}</h1>
    <p class="skill-description">{@html skillData.description}</p>
    <div class="projects-grid">
      {#each projects as project, projectIndex}
        <div class="project-card" style="--accent: {project.accent}" role="button" tabindex="0" onclick={() => openModal(project)} onkeydown={(e) => e.key === "Enter" && openModal(project)}>
          <div class="project-image">
            <img src={project.poster} alt={project.title} />
          </div>
          <div class="project-info">
            <h3>{project.title}</h3>
            <p class="subtitle">{project.subtitle}</p>
            <p class="description">{project.description}</p>
            {#if project.client}
              <p class="client">Client: {project.client}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<ProjectModal project={selectedProject} isOpen={isModalOpen} {closeModal} />

<style lang="scss">
  .skill-page {
    min-height: 100vh;
    color: var(--sinon-white);
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    &.modal-open {
      overflow: hidden;
      //position: fixed;
    }
  }

  .skill-banner {
    width: 30rem;
    flex-shrink: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100vh;
  }

  .banner-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .skill-content {
    flex: 1;
    padding: 3rem 2rem;
    margin-left: 30rem;
    position: relative;
    z-index: 1;
    overflow-y: auto;
    height: 100vh;

    h1 {
      font-family: "DM Serif Display", serif;
      font-size: 4rem;
      margin-bottom: 1rem;
      color: var(--skill-accent);
    }
  }

  .skill-description {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    position: relative;
    padding-left: 1rem;
    border-left: 3px solid var(--skill-accent);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
    transition:
      transform 0.3s ease,
      border-color 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }

    &:focus {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }

  .project-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .project-info {
    padding: 1.5rem;

    h3 {
      font-family: "DM Serif Display", serif;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--sinon-white);
    }
  }

  .subtitle {
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .description {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .client {
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  // Mobile responsive styles
  @media screen and (max-width: 1024px) {
    .skill-page {
      flex-direction: column;
    }

    .skill-banner {
      width: 100%;
      height: auto;
      min-height: auto;
    }

    .banner-layer {
      position: relative;
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .skill-content {
      max-width: 100%;
      margin-left: 0;
      padding: 2rem 1rem;
      height: auto;
      overflow-y: visible;

      h1 {
        font-size: 2.5rem;
      }
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }

  // Custom scrollbar styling for skill content
  .skill-content::-webkit-scrollbar {
    width: 8px !important;
  }

  .skill-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1) !important;
    border-radius: 4px !important;
  }

  .skill-content::-webkit-scrollbar-thumb {
    background: var(--skill-accent) !important;
    border-radius: 4px !important;
  }

  .skill-content::-webkit-scrollbar-thumb:hover {
    background: color-mix(in srgb, var(--skill-accent) 80%, white) !important;
  }

  .skill-content {
    scrollbar-width: thin !important;
    scrollbar-color: var(--skill-accent) rgba(255, 255, 255, 0.1) !important;
  }
</style>
