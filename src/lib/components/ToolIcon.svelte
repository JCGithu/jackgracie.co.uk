<script lang="ts">
  import { toolMap } from "$lib/utils/icons.js";
  let { toolName }: { toolName: string } = $props();

  let size = 24;
</script>

{#if toolMap.has(toolName)}
  <div class="tool-icon {toolName}" style="width: {size}px; height: {size}px;">
    <img src={toolMap.get(toolName)} alt={toolName} title={toolName} />
  </div>
{/if}

<style>
  .tool-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .tool-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .fallback-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fallback-icon :global(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .fallback-icon :global(path),
  .fallback-icon :global(circle),
  .fallback-icon :global(rect) {
    fill: currentColor;
  }
</style>
