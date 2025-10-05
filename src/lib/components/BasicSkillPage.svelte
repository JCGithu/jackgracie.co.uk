<script lang="ts">
  import ProjectModal from "./ProjectModal.svelte";
  import type { Skill, Project } from "$lib/utils/types.js";
  import { onMount, onDestroy } from "svelte";

  export let skillData: Skill;
  export let projects: Project[];

  let selectedProject: Project = projects[0];
  let isModalOpen = false;

  function openModal(project: Project) {
    selectedProject = project;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  // Prevent scrolling when modal is open, but allow scrolling within modal
  function preventScroll(event: Event) {
    if (isModalOpen) {
      // Check if the event target is within the modal
      const target = event.target as Element;
      const modal = document.querySelector(".modal-backdrop");

      // If the event is not within the modal, prevent it
      if (modal && !modal.contains(target)) {
        event.preventDefault();
      }
    }
  }

  // Add/remove scroll prevention based on modal state
  $: if (isModalOpen) {
    if (typeof window !== "undefined") {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });
    }
  } else {
    if (typeof window !== "undefined") {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    }
  }

  // Prevent keyboard scrolling (arrow keys, page up/down, space, etc.)
  function preventKeyScroll(event: KeyboardEvent) {
    if (isModalOpen && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"].includes(event.key)) {
      // Check if the event target is within the modal
      const target = event.target as Element;
      const modal = document.querySelector(".modal-backdrop");

      // If the event is not within the modal, prevent it
      if (modal && !modal.contains(target)) {
        event.preventDefault();
      }
    }
  }

  // Cleanup on component destroy
  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    }
  });
</script>

<svelte:head>
  <title>{skillData.name} - Jack Gracie</title>
  <meta name="description" content="{skillData.name} projects by Jack Gracie" />
</svelte:head>

<div class="skill-page">
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
        <div class="project-card" style="--accent: {project.accent}" role="button" tabindex="0" on:click={() => openModal(project)} on:keydown={(e) => e.key === "Enter" && openModal(project)}>
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

<style>
  .skill-page {
    min-height: 100vh;
    color: var(--sinon-white);
    position: relative;
  }

  .skill-banner {
    width: 100%;
    height: 50vh;
    overflow: hidden;
    position: relative;
    z-index: 1;
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
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .skill-content h1 {
    font-family: "DM Serif Display", serif;
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--skill-accent);
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
  }

  .project-card:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
  }

  .project-card:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .project-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-info {
    padding: 1.5rem;
  }

  .project-info h3 {
    font-family: "DM Serif Display", serif;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--sinon-white);
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

  @media screen and (max-width: 768px) {
    .skill-content {
      padding: 2rem 1rem;
    }

    .skill-content h1 {
      font-size: 2.5rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
