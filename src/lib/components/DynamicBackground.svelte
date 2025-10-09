<script lang="ts">
  interface Props {
    accent: string;
    scrollable?: boolean;
  }
  import { Poline } from "poline";
  import HexToHSL from "$lib/utils/HexToHSL";

  let { accent, scrollable = false }: Props = $props();

  const hsl = HexToHSL(accent);
  let poline = new Poline({
    anchorColors: [
      [hsl.h, hsl.s, hsl.l],
      [hsl.h, 0, 0],
    ],
    numPoints: 10,
  });
  poline.shiftHue(-25);
  let coloursCSS = poline.colorsCSS.toString();
  // Convert hex to RGB for backdrop gradient
  function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return "191, 133, 246"; // fallback to purple
  }
</script>

<div class="dynamic-background" class:scrollable>
  <div class="gradient-overlay" style="--poline: {coloursCSS}; --accent-color: {accent};"></div>
</div>

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
    // background: conic-gradient(from 180deg at 50% 110%, rgba(var(--accent-color-rgb), 0.1) 0%, rgba(var(--accent-color-rgb), 0.05) 25%, rgba(0, 0, 0, 0.8) 70%);
    //background-color: var(--color-sinon-black);
    background: #232323;
    background-color: var(--off-white) !important;
    // background: linear-gradient(to top right, #803cff, rgb(47, 35, 49));
    overflow: hidden;
    &.scrollable {
      height: 100%;
    }
  }

  .gradient-overlay {
    opacity: 0.2;
    width: 100%;
    height: 100%;

    //background: linear-gradient(to top right, #803cff, rgb(47, 35, 49));
    //background: radial-gradient(circle at 0%, var(--accent-color), rgba(256, 0, 0, 0), rgba(256, 0, 0, 0)), conic-gradient(from 180deg at 110% 80% in hsl, var(--poline));
  }

  // Ensure the background stays behind all content and overrides body/html background
  :global(html),
  :global(body) {
    position: relative;
    background: transparent !important;
  }
</style>
