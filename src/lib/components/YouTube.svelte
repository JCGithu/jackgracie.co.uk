<script lang="ts">
  let { url, title }: { url: string; title: string } = $props();

  let isLoaded: boolean = $state(false);

  function extractVideoId(url: string): string {
    const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /youtube\.com\/v\/([^&\n?#]+)/, /youtube\.com\/watch\?.*v=([^&\n?#]+)/];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return "";
  }

  let videoId = extractVideoId(url);
  let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  function loadVideo() {
    isLoaded = true;
  }
</script>

{#if isLoaded}
  <iframe src="https://www.youtube.com/embed/{videoId}?autoplay=1" {title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:else}
  <div class="youtube-thumbnail" role="button" tabindex="0" onclick={loadVideo} onkeydown={(e) => e.key === "Enter" && loadVideo()} aria-label="Play {title}">
    <img src={thumbnailUrl} alt="{title} thumbnail" class="thumbnail-image" loading="lazy" />

    <div class="play-button">
      <svg width="68" height="48" viewBox="0 0 68 48">
        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
      </svg>
    </div>
  </div>
{/if}

<style lang="scss">
  iframe {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .youtube-thumbnail {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      .play-button {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
    &:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  }

  .thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
</style>
