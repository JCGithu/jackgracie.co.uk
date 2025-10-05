<script lang="ts">
  import type { ProjectFeature } from "$lib/utils/types.js";

  interface Props {
    feature: ProjectFeature;
    title: string;
  }

  let { feature, title }: Props = $props();

  // Check if URL is a YouTube link
  function isYouTubeUrl(url: string): boolean {
    return url.includes("youtube.com") || url.includes("youtu.be");
  }

  // Convert YouTube watch URL to embed URL
  function getYouTubeEmbedUrl(url: string): string {
    // Extract video ID from various YouTube URL formats
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  }

  // Check if URL is a webm file
  function isWebmUrl(url: string): boolean {
    return url.toLowerCase().endsWith(".webm");
  }

  // Check if URL is a video file
  function isVideoFile(url: string): boolean {
    const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  }
</script>

{#if feature.url}
  {#if feature.youtube || (feature.embed && isYouTubeUrl(feature.url))}
    <!-- YouTube embeds -->
    <div class="feature-embed">
      <iframe src={getYouTubeEmbedUrl(feature.url)} {title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
    </div>
  {:else if feature.embed}
    <!-- Other embedded content (websites, etc.) -->
    <div class="feature-embed">
      <iframe src={feature.url} {title} frameborder="0" loading="lazy"></iframe>
    </div>
  {:else if feature.video}
    <!-- Video file (mp4, webm, etc.) -->
    <div class="feature-video">
      <video controls loop autoplay preload="metadata" poster="" {title}>
        <source src={feature.url} type={isWebmUrl(feature.url) ? "video/webm" : "video/mp4"} />
        <track kind="captions" src="" label="No captions available" />
        Your browser does not support the video tag.
      </video>
    </div>
  {:else}
    <!-- Fallback to image if no video/embed specified -->
    <div class="feature-image">
      <img src={feature.url} alt={title} />
    </div>
  {/if}
{/if}

<style>
  .feature-embed,
  .feature-video,
  .feature-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-embed iframe,
  .feature-video video,
  .feature-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .feature-embed iframe {
    border: none;
  }

  .feature-video video {
    background: #000;
  }
</style>
