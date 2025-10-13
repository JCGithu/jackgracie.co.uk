<script lang="ts">
  let { menu, colour = "var(--off-white)" }: { menu: boolean; colour: string } = $props();
</script>

<svg version="1.2" id="hamburger" style="--colour: {colour}" class:menu xmlns="http://www.w3.org/2000/svg">
  <path d="m4 8l24 0" id="path1" />
  <path d="m4 16h24" id="path2" />
  <path d="m4 24l24 0" id="path3" />
</svg>

<style lang="scss">
  #hamburger {
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    background: none;
    border: none;
    transition: 0.2s;
    path {
      stroke: var(--colour);
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 4;
      stroke-miterlimit: 100;
      transition: 0.2s;
      transition-property: d, stroke, opacity;
      fill-rule: evenodd;
    }
  }
  .menu {
    // background: var(--sinon-black) !important;

    &:hover {
      path {
        stroke: var(--sinon-red) !important;
      }
    }
    #path1 {
      d: path("m4 25l24-20");
    }
    #path2 {
      d: path("m16.5 16h0.5");
    }
    #path3 {
      d: path("m4 5l24 20");
    }
  }
</style>
