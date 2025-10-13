<script lang="ts">
  let { feature, title, poster, compact = false }: { feature: string; title: string; poster: string; compact?: boolean } = $props();

  import YouTube from "$lib/components/YouTube.svelte";

  let url = feature.includes("http");
  let youtube = feature.includes("youtube.com") || feature.includes("youtu.be");
  let video = feature.includes("webm");
  let image = feature.includes("jpg") || feature.includes("jpeg") || feature.includes("png") || feature.includes("gif");
</script>

{#if url}
  {#if youtube}
    <div class="feature-video" style="--aspect-ratio: {compact ? '21 / 9' : '16 / 9'};">
      <YouTube url={feature} {title} />
    </div>
  {/if}
{:else if video}
  <div class="feature-video" style="--aspect-ratio: {compact ? '21 / 9' : '16 / 9'};">
    <video controls loop autoplay preload="metadata" {poster} {title}>
      <source src={feature} type="video/webm" />
      <track kind="captions" src="" label="No captions available" />
      Your browser does not support the video tag.
    </video>
  </div>
{:else}
  <div class="feature-image" style="--aspect-ratio: {compact ? '21 / 9' : '16 / 9'};">
    <img src={feature} alt={title} />
  </div>
{/if}

<style lang="scss">
  .feature-video,
  .feature-image {
    width: 100%;
    aspect-ratio: var(--aspect-ratio, 16 / 9);
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
</style>
