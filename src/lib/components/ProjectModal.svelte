<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import type { Project } from "$lib/utils/types.js";

  export let project: Project | null = null;
  export let isOpen: boolean = false;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function openProjectPage() {
    if (project) {
      goto(`/project/${project.slug}`);
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
  <div class="modal-backdrop" on:click={handleBackdropClick} on:keydown={(e) => e.key === "Enter" && closeModal()} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
    <div class="modal-content">
      <button class="close-button" on:click={closeModal} aria-label="Close modal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="modal-body">
        <div class="project-image">
          <img src={project.poster} alt={project.title} />
        </div>

        <div class="project-details">
          <h2 id="modal-title" style="--accent: {project.accent}">{project.title}</h2>

          <p class="subtitle">{project.subtitle}</p>

          <div class="description">
            {@html project.description}
          </div>

          {#if project.client}
            <p class="client">Client: {project.client}</p>
          {/if}

          <div class="project-tools">
            <h4>Tools Used:</h4>
            <div class="tools-list">
              {#each project.tools as tool}
                <span class="tool-tag" title={tool}>{tool}</span>
              {/each}
            </div>
          </div>

          <div class="modal-actions">
            <button class="primary-button" on:click={openProjectPage}> View Full Project </button>
            <button class="secondary-button" on:click={closeModal}> Close </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
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
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
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
    z-index: 1001;
    transition: background-color 0.2s ease;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .modal-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .project-image {
    width: 100%;
    height: 300px;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-details {
    color: var(--sinon-white);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-details h2 {
    font-family: "DM Serif Display", serif;
    font-size: 2rem;
    margin: 0;
    color: var(--accent);
  }

  .subtitle {
    color: var(--accent);
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0;
  }

  .description {
    line-height: 1.6;
    opacity: 0.9;
  }

  .client {
    color: var(--accent);
    font-weight: 600;
    margin: 0;
  }

  .project-tools h4 {
    font-family: "DM Serif Display", serif;
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
    color: var(--sinon-red);
  }

  .tools-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tool-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .primary-button {
    background: var(--sinon-red);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .primary-button:hover {
    background: #d63031;
  }

  .secondary-button {
    background: transparent;
    color: var(--sinon-white);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .secondary-button:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }

  @media screen and (max-width: 768px) {
    .modal-backdrop {
      padding: 1rem;
    }

    .modal-body {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }

    .project-image {
      height: 200px;
    }

    .project-details h2 {
      font-size: 1.5rem;
    }

    .modal-actions {
      flex-direction: column;
    }
  }
</style>
