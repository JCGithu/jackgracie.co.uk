<script lang="ts">
  import { onMount } from "svelte";
  import ToolIcon from "./ToolIcon.svelte";
  import { getAllTools, getToolsByCategory, type Tool } from "$lib/utils/tools.js";

  export let selectedCategory: string | null = null;
  export let showCategories: boolean = true;

  let tools: Tool[] = [];
  let categories: string[] = [];
  let isLoading = true;

  onMount(async () => {
    try {
      tools = getAllTools();
      categories = [...new Set(tools.map((tool) => tool.category))];
    } catch (error) {
      console.error("Failed to load tools:", error);
    } finally {
      isLoading = false;
    }
  });

  $: filteredTools = selectedCategory ? getToolsByCategory(selectedCategory as any) : tools;

  function selectCategory(category: string | null) {
    selectedCategory = category;
  }
</script>

<div class="tools-container">
  {#if isLoading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading tools...</p>
    </div>
  {:else}
    {#if showCategories}
      <div class="categories">
        <button class="category-btn" class:active={selectedCategory === null} on:click={() => selectCategory(null)}> All Tools </button>
        {#each categories as category}
          <button class="category-btn" class:active={selectedCategory === category} on:click={() => selectCategory(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        {/each}
      </div>
    {/if}

    <div class="tools-grid">
      {#each filteredTools as tool}
        <div class="tool-item" data-category={tool.category}>
          <div class="tool-icon-wrapper">
            <ToolIcon toolName={tool.name} size={32} className="tool-icon" />
          </div>
          <span class="tool-name">{tool.name}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .tools-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    color: var(--sinon-white);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid var(--sinon-red);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .category-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--sinon-white);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .category-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--sinon-red);
    transform: translateY(-1px);
  }

  .category-btn.active {
    background: var(--sinon-red);
    border-color: var(--sinon-red);
    color: white;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .tool-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .tool-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--sinon-red);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  .tool-icon-wrapper {
    margin-bottom: 1rem;
    color: var(--sinon-white);
    opacity: 0.9;
  }

  .tool-item:hover .tool-icon-wrapper {
    opacity: 1;
    color: var(--sinon-red);
  }

  .tool-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--sinon-white);
    line-height: 1.4;
  }

  /* Category-specific colors */
  .tool-item[data-category="motion"]:hover {
    border-color: #97a3e3;
  }

  .tool-item[data-category="motion"]:hover .tool-icon-wrapper {
    color: #97a3e3;
  }

  .tool-item[data-category="design"]:hover {
    border-color: #fbcb71;
  }

  .tool-item[data-category="design"]:hover .tool-icon-wrapper {
    color: #fbcb71;
  }

  .tool-item[data-category="development"]:hover {
    border-color: #519872;
  }

  .tool-item[data-category="development"]:hover .tool-icon-wrapper {
    color: #519872;
  }

  .tool-item[data-category="audio"]:hover {
    border-color: #e74c3c;
  }

  .tool-item[data-category="audio"]:hover .tool-icon-wrapper {
    color: #e74c3c;
  }

  @media screen and (max-width: 768px) {
    .tools-container {
      padding: 1rem;
    }

    .tools-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }

    .tool-item {
      padding: 1rem;
    }

    .categories {
      justify-content: flex-start;
    }
  }
</style>
