<div class="noise" aria-hidden="true"></div>

<style lang="scss">
  // Sits above everything except the navigation menu (z-index 2001+) and gallery previews (native top layer)
  .noise {
    position: fixed;
    inset: 0;
    background-image: url("/images/noise.png");
    opacity: 0.3;
    z-index: 2000;
    pointer-events: none;
  }
</style>
