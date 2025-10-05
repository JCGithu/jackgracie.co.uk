<script lang="ts">
  import { getToolIconUrl } from "$lib/utils/tools.js";

  export let toolName: string;
  export let size: number = 24;
  export let className: string = "";
  export let fallbackColor: string = "#ffffff";

  // Get the icon URL for the tool
  $: iconUrl = getToolIconUrl(toolName);

  // Fallback icon for when loading fails
  const fallbackIcon = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fallbackColor}">
    <rect x="2" y="2" width="20" height="20" rx="2" stroke="${fallbackColor}" stroke-width="2" fill="none"/>
    <text x="12" y="16" text-anchor="middle" font-size="8" fill="${fallbackColor}">?</text>
  </svg>`;
</script>

<div class="tool-icon {className}" style="width: {size}px; height: {size}px;">
  <img
    src={iconUrl}
    alt={toolName}
    title={toolName}
    style="width: 100%; height: 100%; object-fit: contain;"
    onerror={(e) => {
      const img = e.currentTarget as HTMLImageElement;
      const fallback = img.nextElementSibling as HTMLElement;
      img.style.display = "none";
      if (fallback) fallback.style.display = "block";
    }}
  />
  <div style="display: none; width: 100%; height: 100%;" class="fallback-icon">
    {@html fallbackIcon}
  </div>
</div>

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
