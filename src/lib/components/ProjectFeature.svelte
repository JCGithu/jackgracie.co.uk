<script lang="ts">
  let { feature, title, poster }: { feature: string; title: string; poster: string } = $props();

  console.log(feature);

  let url = feature.includes("http");
  let youtube = feature.includes("youtube.com") || feature.includes("youtu.be");
  let video = feature.includes("webm");
  let image = feature.includes("jpg") || feature.includes("jpeg") || feature.includes("png") || feature.includes("gif");

  if (youtube) {
    const videoId = feature.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
    if (videoId) {
      feature = `https://www.youtube.com/embed/${videoId}`;
    }
  }
</script>

{#if url}
  {#if youtube}
    <!-- YouTube embeds -->
    <div class="feature-embed">
      <iframe src={feature} {title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
    </div>
  {/if}
{:else if video}
  <div class="feature-video">
    <video controls loop autoplay preload="metadata" {poster} {title}>
      <source src={feature} type="video/webm" />
      <track kind="captions" src="" label="No captions available" />
      Your browser does not support the video tag.
    </video>
  </div>
{:else}
  <div class="feature-image">
    <img src={feature} alt={title} />
  </div>
{/if}

<style lang="scss">
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

  .feature-embed {
    iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border: none;
    }
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
