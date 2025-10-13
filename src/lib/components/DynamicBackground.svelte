<script lang="ts">
</script>

<div class="dynamic-background"></div>

<style lang="scss">
  .dynamic-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 110vh;
    z-index: -10;
    pointer-events: none;
    opacity: 1;
    background: var(--off-white);
    background-repeat: repeat;
    background-image: url(/images/noisedark.png);
    overflow: hidden;
  }

  :global(html),
  :global(body) {
    position: relative;
    background: transparent !important;
  }
</style>
