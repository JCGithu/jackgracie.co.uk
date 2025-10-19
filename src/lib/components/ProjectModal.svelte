<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/utils/types.js";
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ProjectFeature from "./ProjectFeature.svelte";
  import "$lib/styles/markdown.scss";
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

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && project}
  <div class="modal-backdrop" style="--project-accent: {project.accent}" onclick={handleBackdropClick} onkeydown={handleKeydown} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1" transition:fade={{ duration: 300, easing: quintOut }}>
    <div class="modal-content" style="--project-accent: {project.accent}">
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
            <ProjectFeature {project} />
          </div>

          <h2 id="modal-title" class="project-title">{project.title}</h2>

          <div class="project-content">
            <project.content />
          </div>
        </div>

        <div class="metadata-column">
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
          </div>
          <div class="metadata-bottom">
            <div class="tools-compact">
              {#each project.tools as tool}
                <ToolIcon toolName={tool} />
              {/each}
            </div>
          </div>
          <button class="primary-button" onclick={() => goto(`/project/${project.slug}`)}> View Project </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;
  @use "$lib/styles/_scrollbars" as *;

  .modal-body {
    display: grid;
    background-color: var(--off-white);
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    height: 100%;
    padding: 2rem;
    scrollbar-width: none;
    overflow: hidden;
    min-width: 0;
    position: relative;
  }

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
    color: var(--sinon-white);
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
    animation: flyIn 0.4s cubic-bezier(0.29, 1.64, 0.45, 1);
    // Custom scrollbar styling for main modal using mixin
    @include modal-scrollbar;

    // Content column scrollbar styling using mixin
    .content-column {
      @include project-scrollbar;
    }
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    //background: rgba(255, 255, 255, 0.1);
    background: var(--project-accent);
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
      background: var(--sinon-black);
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
  }

  .content-column {
    //color: var(--sinon-white);
    overflow: visible;
    overflow-y: scroll;
    padding-bottom: 2rem;
    padding-right: 1rem;
  }

  .project-title {
    font-family: var(--font-pimento);
    font-size: 2.5rem;
    margin: 0;
    color: var(--project-accent);
  }

  .metadata-column {
    color: var(--sinon-black);
    display: grid;
    grid-template-columns: 1fr;
    padding-top: 2rem;
    //border: 2px solid var(--project-accent);
    //background: var(--project-accent);
    color: var(--project-accent);
    border-radius: 0.5rem;
    flex-direction: column;
    margin-top: 2rem;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    height: fit-content;
  }

  .metadata-top {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid var(--project-accent);
    gap: 0.25rem;
    padding-bottom: 0.5rem;

    p {
      margin: 0;
      margin-bottom: 0.25rem;
    }
  }

  .metadata-bottom {
    display: grid;
    gap: 0.5rem;
    margin: 0;
    margin-top: 0.5rem;
  }

  .tools-compact {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin: 0;
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
      background: var(--project-accent);
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  // Mobile responsive styles
  @media screen and (max-width: $bp-mobile) {
    .modal-backdrop {
      padding: 0.5rem;
      align-items: flex-start;
      padding-top: 4rem;
    }

    .modal-content {
      max-height: 85dvh;
      width: 100%;
      max-width: 92vw;
      height: 85dvh;
    }

    .modal-body {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 0.75rem;
      display: grid;
      grid-template-rows: 1fr auto;
      height: 100%;
      overflow: hidden;
    }

    .project-title {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }

    .content-column {
      order: 1;
      overflow-y: auto;
      padding: 0.5rem;
      padding-bottom: rem;
      flex: 1;
      min-height: 0;
    }

    .metadata-column {
      order: 2;
      gap: 0.75rem;
      padding: 0.75rem;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 0.5rem;
      margin-top: 0.5rem;
      display: grid;
      grid-template-columns: 1fr 0.5fr;
      grid-template-rows: 1fr 0.2fr;
      flex-direction: column;
    }

    .featured-media {
      aspect-ratio: 16 / 9;
      margin-bottom: 1rem;
    }

    .metadata-top {
      gap: 0.25rem;
      border: none;
      justify-content: center;
      padding: 0;
      p {
        margin: 0;
        padding: 0;
      }
    }

    .subtitle-text {
      font-size: 1rem;
      //margin-bottom: 0.25rem;
    }

    .role-text {
      font-size: 0.9rem;
      //margin: 0;
    }

    .metadata-bottom {
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .tools-compact {
      gap: 0.25rem;
      align-items: center;
      justify-content: end;
    }

    .primary-button {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      grid-column: 1 / span 2;
    }
  }

  // Small mobile optimizations
  @media screen and (max-width: $bp-mobile-small) {
    .modal-backdrop {
      padding: 0.25rem;
      padding-top: 3.5rem;
    }

    .modal-content {
      border-radius: 0.5rem;
    }

    .modal-body {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .project-title {
      font-size: 1.5rem;
    }

    .metadata-column {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .metadata-bottom {
      gap: 0.25rem;
    }

    .primary-button {
      padding: 0.75rem;
      font-size: 0.85rem;
    }
  }
</style>
