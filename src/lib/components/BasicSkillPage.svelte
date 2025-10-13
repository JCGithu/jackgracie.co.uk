<script lang="ts">
  import ProjectModal from "./ProjectModal.svelte";
  import ProjectCard from "./ProjectCard.svelte";
  import DynamicBackground from "./DynamicBackground.svelte";
  import type { Skill, Project } from "$lib/utils/types.js";
  import "$lib/styles/projects.scss";
  import { categoryMap } from "$lib/utils/icons.js";
  import { horizontalScroll } from "$lib/utils/horizontalScroll";
  import ProjectFeature from "./ProjectFeature.svelte";
  import ArrowButton from "./ArrowButton.svelte";
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";

  let { skillData }: { skillData: Skill } = $props();

  let projects = skillData.projects;
  let selectedProject: Project = $state(projects[0]);
  let isModalOpen = $state(false);
  let isReelExpanded = $state(false);

  // Group projects by category
  let groupedProjects = $derived(() => {
    const groups: Record<string, Project[]> = {};
    const uncategorized: Project[] = [];

    projects.forEach((project) => {
      if (project.category) {
        if (!groups[project.category]) {
          groups[project.category] = [];
        }
        groups[project.category].push(project);
      } else {
        uncategorized.push(project);
      }
    });

    // Sort projects within each category by order
    Object.keys(groups).forEach((category) => {
      groups[category].sort((a, b) => a.order - b.order);
    });

    // Sort uncategorized projects by order
    uncategorized.sort((a, b) => a.order - b.order);

    return { groups, uncategorized };
  });

  function openModal(project: Project) {
    selectedProject = project;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  function toggleReel() {
    isReelExpanded = !isReelExpanded;
  }
</script>

<svelte:head>
  <title>{skillData.name} - Jack Gracie</title>
  <meta name="description" content="{skillData.name} projects by Jack Gracie" />
</svelte:head>

<DynamicBackground />

<div id="skillpage" class:modal-open={isModalOpen}>
  <div id="banner">
    {#each skillData.banner as banner, index}
      <img src={banner.url} alt={banner.alt} style="z-index: {skillData.banner.length - index};" />
    {/each}
  </div>

  <div id="content" style="--skill-accent: {skillData.accent}">
    <div class="description-container" class:expanded={isReelExpanded}>
      <div class="page-padding">
        <div class="description">
          <h1>{skillData.name}</h1>
          <p>{@html skillData.description}</p>
        </div>
        {#if skillData.reel}
          <div class="reel-toggle">
            <ArrowButton onclick={toggleReel} direction={isReelExpanded ? "up" : "down"} colour={skillData.accent} hover={"black"} right={true} fill={true} fade={false}>
              {isReelExpanded ? "Hide" : "Reel"}
            </ArrowButton>
          </div>
        {/if}
      </div>

      {#if skillData.reel && isReelExpanded}
        <div class="reel-container" transition:slide={{ duration: 300 }}>
          <div class="reel-video">
            <ProjectFeature feature={skillData.reel.video} title={skillData.reel.title} poster={skillData.reel.title} compact={true} />
          </div>
        </div>
      {/if}
    </div>

    <div id="projects-container">
      <!-- Display categorized projects -->
      {#each Object.entries(groupedProjects().groups) as [category, categoryProjects]}
        <div class="category-section page-padding">
          {#if categoryMap.has(category)}
            <img src={categoryMap.get(category)} alt={category} class="category-icon" />
          {:else}
            <h2 class="category-title">{category}</h2>
          {/if}
          <div class="projects-horizontal-scroll" use:horizontalScroll>
            {#each categoryProjects as project}
              {#if !project.hide}
                <ProjectCard {project} horizontal={true} onProjectClick={openModal} />
              {/if}
            {/each}
          </div>
        </div>
      {/each}

      <!-- Display uncategorized projects in grid layout -->
      {#if groupedProjects().uncategorized.length > 0}
        <div class="projects-flex page-padding">
          {#each groupedProjects().uncategorized as project}
            {#if !project.hide}
              <ProjectCard {project} horizontal={false} onProjectClick={openModal} />
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<ProjectModal project={selectedProject} isOpen={isModalOpen} {closeModal} />

<style lang="scss">
  @use "$lib/styles/projects.scss" as projectStyles;
  @use "$lib/styles/_breakpoints" as *;
  @use "$lib/styles/_scrollbars" as *;

  @include projectStyles.projects-horizontal-scroll;
  @include projectStyles.projects-flex;

  #skillpage {
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

  #banner {
    width: 30rem;
    flex-shrink: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100vh;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  #content {
    flex: 1;
    padding: 3rem 0;
    margin-left: 30rem;
    position: relative;
    z-index: 1;
    overflow-y: auto;
    height: 100vh;
    h1 {
      font-family: var(--font-pimento);
      font-size: 4rem;
      margin-bottom: 1rem;
      color: var(--skill-accent);
      color: var(--sinon-white);
    }
    @include custom-scrollbar($thumb-color: var(--skill-accent), $track-color: transparent, $width: 12px, $border-radius: 6px, $hover-mix: 80);
  }

  .description-container {
    background-color: var(--skill-accent);
    padding-bottom: 1rem;
    padding-top: 3rem;
    margin-top: -3rem;
    position: relative;
    transition: all 0.3s ease;

    &.expanded {
      padding-bottom: 2rem;
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    position: relative;
    p {
      background-color: var(--skill-accent);
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      position: relative;
    }
  }

  .reel-toggle {
    position: absolute;
    bottom: -1rem;
    right: 2rem;
    right: calc(50% - 3rem);
    z-index: 10;
    width: auto;
  }

  .reel-container {
    padding: 2rem 2rem 0 2rem;
  }

  .reel-video {
    max-width: 800px;
    margin: 0 auto 1.5rem auto;
  }

  .reel-info {
    position: absolute;
    left: calc(50% - 4rem);
    bottom: 2rem;
    transform: scale(1.1);
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  #projects-container {
    :first-child.projects-flex {
      margin-top: 2rem;
    }
  }

  .category-section {
    padding-top: 1rem !important;
    padding-bottom: 20px !important;
    h2 {
      font-family: inherit;
      font-size: 2rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
      color: var(--sinon-black);
    }
  }

  .category-icon {
    height: 4rem;
    margin-bottom: 1.5rem;
    fill: var(--sinon-black);
  }

  .page-padding {
    padding: 0 2rem;
  }

  // Mobile responsive styles
  @media screen and (max-width: $bp-desktop) {
    #skillpage {
      flex-direction: column !important;
      overflow: visible !important;
      min-height: auto !important;
    }

    #banner {
      width: 100% !important;
      height: auto !important;
      min-height: auto !important;
      position: relative !important;
      top: auto !important;
      left: auto !important;
      z-index: auto !important;
      img {
        position: relative !important;
        width: 100% !important;
        height: auto !important;
        object-fit: contain !important;
      }
    }

    #content {
      max-width: 100% !important;
      margin-left: 0 !important;
      padding: 1.5rem 0 !important;
      height: auto !important;
      overflow-y: visible !important;
      position: relative !important;
      z-index: auto !important;

      h1 {
        font-size: 2rem !important;
        margin-bottom: 0.75rem !important;
      }
    }

    .description {
      p {
        font-size: 1rem;
        margin-bottom: 2rem;
      }
    }

    .category-section {
      margin-bottom: 2rem;
      h2 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
    }

    .reel-container {
      padding: 1.5rem 1rem 0 1rem;
    }

    .reel-video {
      margin-bottom: 1rem;
    }

    .reel-info {
      gap: 0.75rem;
    }
  }
</style>
