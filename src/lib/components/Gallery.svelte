<script lang="ts">
  interface GapConfig {
    horizontal?: string;
    vertical?: string;
  }

  interface ImageData {
    src: string;
    rowspan?: number;
    columnspan?: number;
    [key: string]: any;
  }

  export let images: ImageData[] = [];
  console.log(images);

  export let minColumnSize = "10rem";
  export let columns = 3;
  export let rows: number | "auto" = "auto";
  export let gap: string | GapConfig = "0.5rem";

  // Process gap configuration
  $: gapValue = typeof gap === "string" ? { horizontal: gap, vertical: gap } : { horizontal: gap.horizontal || "0.5rem", vertical: gap.vertical || "0.5rem" };

  // Generate grid template columns
  $: gridTemplateColumns = `repeat(${columns}, minmax(${minColumnSize}, 1fr))`;

  // Generate grid template rows
  $: gridTemplateRows = rows === "auto" ? "auto" : `repeat(${rows}, minmax(${minColumnSize}, 1fr))`;

  // Generate grid gap
  $: gridGap = `${gapValue.vertical} ${gapValue.horizontal}`;

  function getImageStyle(image: ImageData) {
    const rowspan = image.rowspan || 1;
    const columnspan = image.columnspan || 1;

    return {
      gridRow: `span ${rowspan}`,
      gridColumn: `span ${columnspan}`,
    };
  }
</script>

<div class="gallery">
  <div
    class="grid-container"
    style="
      grid-template-columns: {gridTemplateColumns};
      grid-template-rows: {gridTemplateRows};
      gap: {gridGap};
    "
  >
    {#each images as image, index}
      <div
        class="grid-item"
        style={Object.entries(getImageStyle(image))
          .map(([key, value]) => `${key}: ${value}`)
          .join("; ")}
      >
        <slot {index} {image}>
          <img {...image} />
        </slot>
      </div>
    {/each}
  </div>
</div>

<style>
  .gallery {
    width: 100%;
  }

  .grid-container {
    display: grid;
    width: 100%;
  }

  .grid-item {
    position: relative;
    overflow: hidden;
  }

  .grid-item > :global(*) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
