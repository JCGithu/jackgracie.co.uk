<script lang="ts">
  import { page } from "$app/stores";
  import { projects } from "$lib/data/projects.js";
  import type { Project } from "$lib/data/projects.js";

  $: project = projects.find((p: Project) => p.slug === $page.params.slug);
</script>

<svelte:head>
  {#if project}
    <title>{project.title} - Jack Gracie</title>
    <meta name="description" content={project.description} />
  {:else}
    <title>Project - Jack Gracie</title>
    <meta name="description" content="Project page" />
  {/if}
</svelte:head>

{#if project}
  <div class="project-page">
    <h1>{project.title}</h1>
    <p>{project.description}</p>
    <img src={project.image} alt={project.title} />
  </div>
{:else}
  <h1>Project not found</h1>
{/if}

<style>
  .project-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: var(--sinon-white);
  }

  .project-page h1 {
    font-family: "DM Serif Display", serif;
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--sinon-red);
  }

  .project-page p {
    font-family: "Poppins", sans-serif;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .project-page img {
    width: 100%;
    max-width: 800px;
    border-radius: 1rem;
  }
</style>
