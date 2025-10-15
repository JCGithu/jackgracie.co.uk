<script lang="ts">
  import YouTube from "$lib/components/YouTube.svelte";
  import type { Project } from "$lib/utils/types.js";

  let { project }: { project: Project } = $props();

  let url = project.feature.includes("http") || false;
  let youtube = project.feature.includes("youtube.com") || project.feature.includes("youtu.be") || false;
  let video = project.feature.includes("webm") || false;
  let image = project.feature.includes("jpg") || project.feature.includes("jpeg") || project.feature.includes("png") || project.feature.includes("gif") || false;
</script>

{#if project.featureImage}
  <div class="feature-image">
    <enhanced:img src={project.featureImage} alt={project.title} loading="eager" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px" />
  </div>
{:else if youtube}
    <div class="feature-video">
      <YouTube url={project.feature || ""} title={project.title} />
    </div>
{:else if video}
  <div class="feature-video">
    <video controls loop autoplay preload="metadata" poster={project.posterImage ? project.posterImage : project.poster} title={project.title}>
      <source src={project.feature} type="video/webm" />
      <track kind="captions" src="" label="No captions available" />
      Your browser does not support the video tag.
    </video>
  </div>
{:else}
  <div class="feature-image">
      <img src={project.feature} alt={project.title} loading="eager" />
  </div>
{/if}

<style lang="scss">
  .feature-video,
  .feature-image {
    width: 100%;
    aspect-ratio: var(--aspect-ratio, 16 / 9);
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-video {
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      background: #000;
    }
  }

  .feature-image {
    :global(enhanced\:img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
</style>
