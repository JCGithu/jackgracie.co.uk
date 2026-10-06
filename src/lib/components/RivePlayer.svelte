<script lang="ts">
  import { onMount } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";
  import type { Alignment, Fit, Rive, ViewModelInstanceNumber } from "@rive-app/webgl2";

  let {
    src,
    label,
    artboard,
    stateMachine,
    cursorX,
    cursorY,
    fit = "cover",
    alignment = "center",
    class: className = "",
    style = "",
  }: {
    src: string;
    label: string;
    artboard?: string;
    stateMachine?: string;
    // View model number properties that receive the cursor position, 0-100 across the window
    cursorX?: string;
    cursorY?: string;
    fit?: `${Fit}`;
    alignment?: `${Alignment}`;
    class?: string;
    style?: string;
  } = $props();

  let canvas: HTMLCanvasElement;
  let loaded = $state(false);
  let xProperty: ViewModelInstanceNumber | null = null;
  let yProperty: ViewModelInstanceNumber | null = null;

  const toPercent = (offset: number, size: number) => (Math.min(Math.max(offset, 0), size) / size) * 100;

  function setCursor(x: number, y: number) {
    if (xProperty) xProperty.value = x;
    if (yProperty) yProperty.value = y;
  }

  function centreCursor() {
    setCursor(50, 50);
  }

  function trackCursor(clientX: number, clientY: number) {
    if (!xProperty && !yProperty) return;
    setCursor(toPercent(clientX, window.innerWidth), toPercent(clientY, window.innerHeight));
  }

  onMount(() => {
    let rive: Rive | undefined;
    let destroyed = false;
    const resizeObserver = new ResizeObserver(() => rive?.resizeDrawingSurfaceToCanvas());

    (async () => {
      const [{ Rive, Layout, RuntimeLoader }, { default: wasmUrl }] = await Promise.all([import("@rive-app/webgl2"), import("@rive-app/webgl2/rive.wasm?url")]);
      if (destroyed) return;

      RuntimeLoader.setWasmUrl(wasmUrl);
      rive = new Rive({
        canvas,
        src,
        artboard,
        stateMachine,
        layout: new Layout({ fit: fit as Fit, alignment: alignment as Alignment }),
        autoplay: !prefersReducedMotion.current,
        autoBind: true,
        // Scripts that call context:canvas() or context:gpuCanvas() only get a render context in this mode
        enableGPUCanvas: true,
        isTouchScrollEnabled: true,
        onLoad: () => {
          rive?.resizeDrawingSurfaceToCanvas();
          resizeObserver.observe(canvas);

          const viewModel = rive?.viewModelInstance;
          xProperty = cursorX ? (viewModel?.number(cursorX) ?? null) : null;
          yProperty = cursorY ? (viewModel?.number(cursorY) ?? null) : null;
          if ((cursorX && !xProperty) || (cursorY && !yProperty)) {
            console.warn(`Rive file ${src} has no view model number property for cursor tracking`, { cursorX, cursorY });
          }
          centreCursor();

          loaded = true;
        },
        onLoadError: (event) => console.error(`Failed to load Rive file ${src}`, event.data),
      });
    })();

    return () => {
      destroyed = true;
      resizeObserver.disconnect();
      xProperty = yProperty = null;
      rive?.cleanup();
    };
  });
</script>

<svelte:window
  onmousemove={(event) => trackCursor(event.clientX, event.clientY)}
  onmouseout={(event) => !event.relatedTarget && centreCursor()}
  ontouchmove={(event) => event.touches[0] && trackCursor(event.touches[0].clientX, event.touches[0].clientY)}
  ontouchend={centreCursor}
/>

<div class="rive-player {className}" class:loaded {style} role="img" aria-label={label}>
  <canvas bind:this={canvas}></canvas>
</div>

<style lang="scss">
  .rive-player {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.4s ease;

    &.loaded {
      opacity: 1;
    }
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
