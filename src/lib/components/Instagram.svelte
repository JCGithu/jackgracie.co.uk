<script lang="ts">
  interface Props {
    reelId: string;
    width?: number;
    height?: number;
    hideCaption?: boolean;
  }

  let { reelId, width = 540, height = 960, hideCaption = false }: Props = $props();

  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/?cr=1&v=14${hideCaption ? "&hide_caption=1" : ""}`;
</script>

<div class="instagram-container">
  <iframe src={embedUrl} {width} {height} frameborder="0" scrolling="no" allowtransparency allowfullscreen title="Instagram Reel Embed" class="instagram-embed"></iframe>
</div>

<style>
  .instagram-container {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  .instagram-embed {
    max-width: 100%;
    border-radius: 3px;
    box-shadow:
      0 0 1px 0 rgba(0, 0, 0, 0.5),
      0 1px 10px 0 rgba(0, 0, 0, 0.15);
  }
</style>
