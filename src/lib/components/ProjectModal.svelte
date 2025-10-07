<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/utils/types.js";
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getToolIconUrl } from "$lib/utils/tools.js";
  import ProjectFeature from "./ProjectFeature.svelte";
  import "$lib/styles/markdown.scss";

  interface Props {
    project: Project;
    isOpen: boolean;
    closeModal: () => void;
  }

  let { project, isOpen, closeModal }: Props = $props();

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

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && project}
  <div class="modal-backdrop" style="--project-accent: {project.accent}; --project-accent-rgb: {hexToRgb(project.accent)}" onclick={handleBackdropClick} onkeydown={handleKeydown} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1" transition:fade={{ duration: 300, easing: quintOut }}>
    <div class="modal-content" style="--project-accent: {project.accent}" transition:fly={{ y: 50, duration: 400, easing: quintOut }}>
      <!-- Two Column Grid Layout -->
      <div class="modal-body">
        <button class="close-button" onclick={closeModal} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <!-- Left Column: Content -->
        <div class="content-column">
          <div class="featured-media">
            <ProjectFeature feature={project.feature} title={project.title} poster={project.poster} />
          </div>

          <h2 id="modal-title" class="project-title">{project.title}</h2>

          <div class="project-content">
            <project.content />
          </div>
        </div>

        <!-- Right Column: Metadata -->
        <div class="metadata-column">
          <div class="metadata-section">
            {#if project.subtitle}
              <p class="subtitle-text"><strong>{project.subtitle}</strong></p>
            {/if}

            {#if project.description}
              <p class="description-text">{project.description}</p>
            {/if}

            {#if project.client}
              <p class="client-text">Client: {project.client}</p>
            {/if}
          </div>

          <div class="divider"></div>

          <div class="tools-section">
            <div class="tools-list">
              {#each project.tools as tool}
                <img src={getToolIconUrl(tool)} alt={tool} class="tool-icon" title={tool} onerror={() => {}} />
              {/each}
            </div>
          </div>

          <div class="modal-actions">
            <button class="primary-button" onclick={() => goto(`/project/${project.slug}`)}> View Full Project </button>
            <button class="secondary-button" onclick={closeModal}> Close </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    background-image: radial-gradient(circle at center, rgba(var(--project-accent-rgb), 0.1) 0%, rgba(0, 0, 0, 0.8) 70%);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    box-sizing: border-box;
  }

  .modal-content {
    background: rgba(20, 20, 20, 0.95);
    border-radius: 1rem;
    max-width: 1000px;
    width: 100%;
    max-height: 80vh;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;

    // Custom scrollbar styling
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }

    // Content column scrollbar styling
    .content-column {
      &::-webkit-scrollbar {
        width: 8px !important;
      }

      &::-webkit-scrollbar-track {
        background: transparent !important;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--project-accent) !important;
        border-radius: 4px !important;

        &:hover {
          background: var(--project-accent) !important;
          opacity: 0.8 !important;
        }
      }

      // Firefox scrollbar styling
      scrollbar-width: thin !important;
      scrollbar-color: var(--project-accent) transparent !important;
    }
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    z-index: 10;
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .featured-media {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    iframe,
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    iframe {
      border: none;
    }
  }

  .modal-body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    height: 100%;
    padding: 2rem;
    scrollbar-width: none;
    overflow: hidden;
    min-width: 0;
    position: relative;
  }

  .content-column {
    color: var(--sinon-white);
    overflow-y: scroll !important;
    padding-bottom: 2rem;
    padding-right: 1rem;
  }

  .project-title {
    font-family: "DM Serif Display", serif;
    font-size: 2.5rem;
    margin: 0;
    color: var(--project-accent);
  }

  .metadata-column {
    color: var(--sinon-white);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .metadata-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .subtitle-text {
    margin: 0;
    font-size: 1.1rem;
    color: var(--project-accent);
    font-weight: 600;
  }

  .client-text {
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
  }

  .divider {
    height: 1px;
    background: var(--project-accent);
    opacity: 0.3;
    margin: 0.5rem 0;
  }

  .tools-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tools-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }

  .tool-icon {
    width: 32px;
    height: 32px;
    opacity: 0.8;
    transition: all 0.3s ease;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .modal-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .primary-button {
    background: var(--project-accent);
    color: var(--sinon-black);
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      background: var(--project-accent);
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }

  .secondary-button {
    background: transparent;
    color: var(--sinon-white);
    border: 1px solid var(--project-accent);
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      background: var(--project-accent);
      color: var(--sinon-black);
      transform: translateY(-1px);
    }
  }

  // Mobile responsive styles
  @media screen and (max-width: 768px) {
    .modal-backdrop {
      padding: 1rem;
    }

    .modal-content {
      max-height: 85vh;
    }

    .modal-body {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1.5rem;
      display: grid;
    }

    .project-title {
      font-size: 2rem;
    }

    .metadata-column {
      gap: 1.5rem;
      order: 2;
    }

    .content-column {
      order: 1;
    }

    .modal-actions {
      flex-direction: column;
    }
  }
</style>
