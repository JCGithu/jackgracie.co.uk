<script lang="ts">
  import type { Picture } from "vite-imagetools";
  import { getEnhancedImage, hasEnhancedImage } from "$lib/utils/image-imports";
  import YouTube from "./YouTube.svelte";

  interface ImageData {
    picture?: Picture;
    src: string;
    alt: string;
    width?: number; // in pixels
    accent?: string;
    align?: "top" | "bottom" | "left" | "right" | "center";
  }

  interface VideoData {
    src: string;
    title: string;
  }

  interface Props {
    size?: number;
    images?: ImageData[];
    videos?: VideoData[];
    grow?: boolean;
    accent?: string;
  }

  let { size = 200, images = [], videos = [], grow = true, accent }: Props = $props();

  let validImages = images.map((image) => {
    if (hasEnhancedImage(image.src)) {
      image.picture = getEnhancedImage(image.src);
    }
    return image;
  });

  // Modal state
  let selectedImage = $state<ImageData | null>(null);
  let modalOpen = $state(false);

  function openModal(image: ImageData) {
    selectedImage = image;
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
  }

  let itemStyles = validImages.map((image, index) => {
    return `height: ${size}px; width: ${image.width || size}px;`;
  });

  let videoItemStyles = videos.map((video, index) => {
    return `width: ${size}px;`;
  });

  let imageSizes = validImages.map((image) => {
    if (!image.picture) return undefined;
    const minWidth = Math.round((size * image.picture.img.w) / image.picture.img.h);
    return minWidth >= 1040 ? `${minWidth}px` : `(max-width: ${minWidth}px) ${minWidth}px, (max-width: 1100px) 100vw, 1040px`;
  });

  let imageStyles = validImages.map((image, index) => {
    const align = image.align || "center";

    switch (align) {
      case "top":
        return "object-position: center top;";
      case "bottom":
        return "object-position: center bottom;";
      case "left":
        return "object-position: left center;";
      case "right":
        return "object-position: right center;";
      case "center":
      default:
        return "object-position: center center;";
    }
  });
</script>

<div class="gallery">
  <div class="flex-container">
    {#each validImages as image, index (image.alt + index)}
      <div class="flex-item" style={itemStyles[index]} class:grow onclick={() => openModal(image)} onkeydown={(e) => e.key === "Enter" && openModal(image)} role="button" tabindex="0" aria-label="Open image preview">
        {#if image.picture}
          <enhanced:img src={image.picture} alt={image.alt || ""} style={imageStyles[index]} loading="lazy" sizes={imageSizes[index]} />
        {:else}
          <img src={image.src} alt={image.alt || ""} style={imageStyles[index]} loading="lazy" />
        {/if}
      </div>
    {/each}
    {#each videos as video, index (video.title + index)}
      <div class="flex-item" style={videoItemStyles[index]} class:grow>
        <YouTube url={video.src} title={video.title} />
      </div>
    {/each}
  </div>
</div>

{#if modalOpen && selectedImage}
  <!-- showModal() puts the preview in the browser's top layer, above the site-wide grain and outside any ancestor's stacking context or clip-path. Escape is handled natively and fires `close` -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <dialog class="modal-overlay" style:--accent-color={accent} aria-label={selectedImage.alt || "Image preview"} {@attach (dialog) => dialog.showModal()} onclose={closeModal} onclick={closeModal}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()} role="none">
      <button class="modal-close" onclick={closeModal} aria-label="Close modal">×</button>
      {#if selectedImage.picture}
        <enhanced:img src={selectedImage.picture} alt={selectedImage.alt || ""} class="modal-image" sizes="90vw" />
      {:else}
        <img src={selectedImage.src} alt={selectedImage.alt || ""} class="modal-image" />
      {/if}
      <a class="modal-full-size" href={selectedImage.picture?.img.src ?? selectedImage.src} target="_blank" rel="noopener">View full size</a>
    </div>
  </dialog>
{/if}

<style>
  .gallery {
    width: 100%;
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }

  .grow {
    flex-grow: 1;
  }

  .flex-item {
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
  }

  .flex-item:hover {
    transform: scale(1.02);
  }

  .flex-item :global(enhanced\:img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: relative;
  }

  /* Reflection overlay */
  .flex-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%, transparent 100%);
    transform: translateX(-100%) translateY(-100%);
    transition: none;
    z-index: 1;
    pointer-events: none;
  }

  .flex-item:hover::before {
    transform: translateX(100%) translateY(100%);
    transition: transform 0.6s ease;
  }

  /* Modal styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    margin: 0;
    padding: 0;
    border: none;
    background: color-mix(in srgb, var(--accent-color) 70%, transparent);
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  .modal-overlay[open] {
    display: flex;
  }

  .modal-overlay::backdrop {
    background: transparent;
  }

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
  }

  .modal-close:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .modal-full-size {
    position: absolute;
    bottom: 10px;
    right: 15px;
    z-index: 1001;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  .modal-full-size:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .modal-image {
    display: block;
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }
</style>
