<script lang="ts">
  import ProjectModal from "./ProjectModal.svelte";
  import type { Skill, Project } from "$lib/utils/types.js";

  export let skillData: Skill;
  export let projects: Project[];

  console.log(skillData);
  console.log(projects);

  let selectedProject: Project = projects[0];
  let isModalOpen = false;

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

<div class="skill-page">
  <div class="skill-banner">
    {#each skillData.banner as banner, index}
      <img src={banner.url} alt={banner.alt} class="banner-layer" style="z-index: {skillData.banner.length - index};" />
    {/each}
  </div>

  <div class="skill-content">
    <h1>{skillData.name}</h1>
    <p class="skill-description">{@html skillData.description}</p>

    <div class="tools-used">
      <h3>Tools Used</h3>
      <div class="tools-list">
        {#each skillData.tools as tool}
          <span class="tool-tag">{tool}</span>
        {/each}
      </div>
    </div>

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
            <div class="project-tools">
              {#each project.tools as tool}
                <span class="tool" title={tool}>{tool}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<ProjectModal project={selectedProject} isOpen={isModalOpen} on:close={closeModal} />

<style>
  .skill-page {
    min-height: 100vh;
    color: var(--sinon-white);
  }

  .skill-banner {
    width: 100%;
    height: 50vh;
    overflow: hidden;
    position: relative;
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
  }

  .skill-content h1 {
    font-family: "DM Serif Display", serif;
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--sinon-red);
  }

  .skill-description {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    opacity: 0.9;
  }

  .tools-used {
    margin-bottom: 3rem;
  }

  .tools-used h3 {
    font-family: "DM Serif Display", serif;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--sinon-red);
  }

  .tools-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tool-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
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
    transform: translateY(-5px);
    border-color: var(--accent);
  }

  .project-card:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .project-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
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

  .project-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .tool {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
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
