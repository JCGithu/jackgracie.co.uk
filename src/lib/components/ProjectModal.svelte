<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/utils/types.js";
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ProjectFeature from "./ProjectFeature.svelte";
  import ToolIcon from "./ToolIcon.svelte";

  interface Props {
    project: Project;
    isOpen: boolean;
    closeModal: () => void;
  }

  let { project, isOpen, closeModal }: Props = $props();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen && project}
  <div class="modal-backdrop" style="--project-accent: {project.accent}" onclick={handleBackdropClick} onkeydown={handleKeydown} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1" transition:fade={{ duration: 300, easing: quintOut }}>
    <div class="modal-content">
      <div class="featured-media">
        <ProjectFeature {project} priority />
      </div>

      <div class="info-box">
        <button class="close-button" onclick={closeModal} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="info-header">
          <h2 id="modal-title" class="project-title">{project.title}</h2>
        </div>

        <div class="metadata-top">
          {#if project.subtitle}
            <p class="subtitle-text"><strong>{project.subtitle}</strong></p>
          {/if}
          {#if project.role}
            <p class="role-text">
              <strong>Role:</strong>
              {project.role}
            </p>
          {/if}
          <p class="year-text">
            <strong>Year:</strong>
            {project.year}
          </p>
        </div>

        <div class="tools-compact">
          {#each project.tools as tool}
            <ToolIcon toolName={tool} />
          {/each}
        </div>

        <button class="primary-button" onclick={() => goto(`/project/${project.slug}`)}> View Project </button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: color-mix(in srgb, var(--sinon-black) 50%, transparent);
    background-image: radial-gradient(circle at center, rgba(var(--project-accent-rgb), 0.1) 0%, rgba(0, 0, 0, 0.8) 70%);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    box-sizing: border-box;
  }

  @keyframes flyIn {
    from {
      transform: translateY(200px);
    }
    to {
      transform: translateY(0);
    }
  }

  .modal-content {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(16rem, 1fr);
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 1400px;
    max-height: 90vh;
    animation: flyIn 0.4s cubic-bezier(0.29, 1.64, 0.45, 1);
  }

  .featured-media {
    width: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .info-box {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    background-color: var(--off-white);
    position: relative;
    color: var(--project-accent);
    border-radius: 0.5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .info-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .project-title {
    font-family: var(--font-pimento);
    // font-size: 2rem;
    line-height: 1.1;
    margin: 0;
    color: var(--project-accent);
  }

  .close-button {
    flex-shrink: 0;
    background: var(--project-accent);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -12px;
    top: -12px;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s ease;

    &:hover {
      background: var(--sinon-black);
    }
  }

  .metadata-top {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--project-accent);

    p {
      margin: 0;
    }
  }

  .tools-compact {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  button {
    font-family: var(--font-sans);
  }

  .primary-button {
    background: var(--project-accent);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  @media screen and (max-width: $bp-mobile) {
    .modal-backdrop {
      padding: 1.25rem;
      padding-top: 4rem;
      align-items: flex-start;
    }

    .modal-content {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      max-height: calc(100dvh - 5rem);
      overflow-y: auto;
    }

    .info-box {
      padding: 1rem;
      width: 90%;
      margin-left: 5%;
    }

    .project-title {
      font-size: 1.5rem;
    }

    .primary-button {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
