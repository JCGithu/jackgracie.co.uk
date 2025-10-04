<script lang="ts">
  import { page } from "$app/stores";
  import { projects } from "$lib/data/projects.js";
  import type { Project } from "$lib/data/projects.js";

  $: skill = $page.params.skill as keyof typeof skillNames;
  $: skillProjects = projects.filter((p: Project) => p.category === skill);

  const skillNames = {
    motion: "Motion Graphics",
    video: "Video Editing",
    webdesign: "Web Design",
  } as const;

  $: skillTitle = skillNames[skill] || skill;
</script>

<svelte:head>
  <title>{skillTitle} - Jack Gracie</title>
  <meta name="description" content="{skillTitle} projects by Jack Gracie" />
</svelte:head>

<div class="skill-page">
  <h1>{skillNames[skill] || skill}</h1>

  <div class="projects-grid">
    {#each skillProjects as project}
      <a href="/projects/{project.slug}" class="project-card">
        <img src={project.image} alt={project.title} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </a>
    {/each}
  </div>
</div>

<style>
  .skill-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: var(--sinon-white);
  }

  .skill-page h1 {
    font-family: "DM Serif Display", serif;
    font-size: 3rem;
    margin-bottom: 2rem;
    color: var(--sinon-red);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.3s ease;
    text-decoration: none;
    color: inherit;
  }

  .project-card:hover {
    transform: translateY(-5px);
  }

  .project-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .project-card h3 {
    padding: 1rem;
    margin: 0;
    font-family: "DM Serif Display", serif;
    color: var(--sinon-white);
  }

  .project-card p {
    padding: 0 1rem 1rem;
    margin: 0;
    font-family: "Poppins", sans-serif;
    opacity: 0.8;
  }
</style>
