<script lang="ts">
  import type { Project } from "$lib/utils/types.js";

  interface Props {
    project: Project;
    horizontal?: boolean;
    onProjectClick: (project: Project) => void;
  }

  let { project, horizontal = false, onProjectClick }: Props = $props();
  let imgSrc = import.meta.glob("/images/editing/playlist.png");
</script>

<div class="project-card" class:horizontal style="--accent: {project.accent}" role="button" tabindex="0" onclick={() => onProjectClick(project)} onkeydown={(e) => e.key === "Enter" && onProjectClick(project)}>
  <div class="project-image">
    <img src={project.poster} alt={project.title} />
    <!-- {#if project.poster}
      <enhanced:img src={project.poster} alt={project.title} />
    {/if} -->
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

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;
  // Card width variable - 300px for wide, 240px for mobile
  .project-card {
    --cardWidth: 300px;

    --cardRatio: 2.5 / 3.5;

    background: rgba(255, 255, 255, 0.05);
    background-color: var(--accent);
    border-radius: 1rem;
    overflow: hidden;
    transition:
      transform 0.3s ease,
      outline 0.3s ease;
    //border: 2px solid rgba(255, 255, 255, 0);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    outline: 2px solid transparent;
    outline-offset: -2px;

    aspect-ratio: var(--cardRatio) !important;
    width: 100%;
    height: auto;
    max-width: var(--cardWidth);

    &:hover {
      transform: translateY(-2px);
      outline: 2px solid var(--sinon-black);
    }

    // Horizontal variant for categorized projects
    &.horizontal {
      width: var(--cardWidth);
      max-width: var(--cardWidth);
      flex-shrink: 0;
      height: 380px;
      //aspect-ratio: unset;
    }
  }

  .project-image {
    width: 100%;
    height: 45%; // Take up 45% of card height for good balance
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .project-info {
    padding: 0 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      margin: 0.5rem 0;
      color: var(--sinon-white);
      line-height: 1.3;
      line-break: loose;
      font-weight: 600;
      font-family: var(--font-pimento);
    }

    .subtitle {
      color: var(--accent);
      color: black;
      color: var(--sinon-black);
      font-weight: 600;
      margin: 0;
      font-size: 0.9rem;
    }

    .description {
      margin-bottom: 0.5rem;
      line-height: 1.4;
      font-size: 0.85rem;
      flex: 1;
      overflow: hidden;
    }

    .client {
      color: var(--accent);
      color: black;
      font-weight: 600;
      margin-bottom: 0;
      font-size: 0.8rem;
    }
  }

  //Single file layout
  @media screen and (min-width: $bp-desktop) {
    @container (max-width: calc(600px + 1.5rem)) {
      .project-card {
        width: 100%;
        max-width: 100%;
        //aspect-ratio: unset !important;
      }
    }
  }

  // Mobile responsive styles
  @media screen and (max-width: $bp-desktop) {
    .project-card {
      --cardWidth: 240px;

      // Maintain aspect ratio on mobile, but allow smaller base size
      aspect-ratio: var(--cardRatio);
      height: auto;

      &.horizontal {
        width: var(--cardWidth);
        max-width: var(--cardWidth);
      }

      .project-image {
        height: 40%; // Slightly smaller on mobile for better text space
      }

      .project-info {
        padding: 0.75rem;

        h3 {
          font-size: 1.1rem;
        }

        .subtitle {
          font-size: 0.85rem;
        }

        .description {
          font-size: 0.8rem;
          -webkit-line-clamp: 2;
          line-clamp: 2;
        }

        .client {
          font-size: 0.75rem;
        }
      }
    }
    @container (max-width: calc(480px + 1.5rem)) {
      .project-card {
        width: 100%;
        max-width: 100%;
        aspect-ratio: unset !important;
      }
    }
  }
</style>
