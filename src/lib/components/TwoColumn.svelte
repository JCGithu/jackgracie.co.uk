<!--
  The nested video, gallery or image becomes one column and the text around it the other.
  Order sets the side: media first sits on the left, media after the text sits on the right.
  In markdown, leave blank lines around the nested content so it's still parsed as markdown:

  <TwoColumn>

  <YouTube url="..." title="..." />

  Some text beside the video.

  </TwoColumn>
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div class="two-column">
  {@render children()}
</div>

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;

  $media: ":is(.youtube-container, .gallery, picture, img, video, figure, p:has(> img:only-child))";

  .two-column {
    display: grid;
    grid-template-columns: 45% minmax(0, 1fr);
    // The final 1fr row absorbs any height the media has over the text, so paragraphs aren't spread apart
    grid-template-rows: repeat(19, auto) 1fr;
    column-gap: 1.5rem;
    align-items: start;
    margin: 1.5rem 0;

    > :global(*) {
      grid-column: 2;
    }

    > :global(#{$media}) {
      grid-column: 1;
      grid-row: 1 / -1;
      margin: 0;
    }

    > :global(:not(#{$media})) {
      margin-inline: 0;
    }

    > :global(:first-child),
    > :global(#{$media} + *) {
      margin-top: 0;
    }

    &:has(> :global(:first-child:not(#{$media}))) {
      grid-template-columns: minmax(0, 1fr) 45%;

      > :global(*) {
        grid-column: 1;
      }

      > :global(#{$media}) {
        grid-column: 2;
      }
    }
  }

  @media screen and (max-width: $bp-mobile) {
    .two-column,
    .two-column:has(> :global(:first-child:not(#{$media}))) {
      display: block;

      > :global(#{$media}) {
        margin: 1rem 0;
      }
    }
  }
</style>
