<script lang="ts">
  import { onMount } from "svelte";
  import { getToolIconUrl, fetchToolIcon } from "$lib/utils/tools.js";

  export let toolName: string;
  export let size: number = 24;
  export let className: string = "";
  export let fallbackColor: string = "#ffffff";

  let iconContent = "";
  let isLoading = true;
  let hasError = false;

  onMount(async () => {
    try {
      isLoading = true;
      hasError = false;
      iconContent = await fetchToolIcon(toolName);
    } catch (error) {
      console.warn(`Failed to load icon for ${toolName}:`, error);
      hasError = true;
    } finally {
      isLoading = false;
    }
  });

  // Fallback icon for when loading fails
  const fallbackIcon = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fallbackColor}">
    <rect x="2" y="2" width="20" height="20" rx="2" stroke="${fallbackColor}" stroke-width="2" fill="none"/>
    <text x="12" y="16" text-anchor="middle" font-size="8" fill="${fallbackColor}">?</text>
  </svg>`;

  // Loading spinner
  const loadingIcon = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="${fallbackColor}" stroke-width="2" opacity="0.3"/>
    <path d="M12 2a10 10 0 0 1 10 10" stroke="${fallbackColor}" stroke-width="2" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" dur="1s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
    </path>
  </svg>`;
</script>

<div class="tool-icon {className}" style="width: {size}px; height: {size}px;">
  {#if isLoading}
    {@html loadingIcon}
  {:else if hasError}
    {@html fallbackIcon}
  {:else}
    {@html iconContent}
  {/if}
</div>

<style>
  .tool-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .tool-icon :global(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .tool-icon :global(path),
  .tool-icon :global(circle),
  .tool-icon :global(rect) {
    fill: currentColor;
  }
</style>
