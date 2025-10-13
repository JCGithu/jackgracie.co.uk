<script lang="ts">
  // Generate a random number between 0 and 360
  const randomAngle = Math.floor(Math.random() * 361) + "deg";
</script>

<svg style="transform: rotate({randomAngle});" preserveAspectRatio="none" class="swirl" version="1.2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="m12.8 7.6c0 0-10.1 0.6-9.8 9.4 0.2 6 13.1 9.1 19.8 5.3 8-4.5 10-21.2-15.5-16.3" />
</svg>

<style lang="scss">
  .swirl {
    fill: none;
    stroke: var(--sinon-black);
    stroke-miterlimit: 10;
    stroke-width: 0.3px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    path {
      fill: none;
    }
    --length: 130;

    stroke-dasharray: var(--length);
    stroke-dashoffset: var(--length);
    animation: draw 0.6s ease-out forwards;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
