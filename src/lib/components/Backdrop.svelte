<script lang="ts">
  import { onMount } from "svelte";
  import lottie from "lottie-web";
  import backdrop from "../../lottie/backdrop.json";

  let animationContainer: HTMLElement;

  import { outerWidth, outerHeight } from "svelte/reactivity/window";

  let aspectRatio = $derived(outerWidth.current && outerHeight.current ? (outerWidth.current >= outerHeight.current * 1.78 ? "xMinYMid meet" : "xMidYMax slice") : "xMidYMax slice");

  onMount(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer,
      animationData: backdrop,
    });

    function windowResize() {
      if (animationContainer) {
        const lott = animationContainer.children[0] as HTMLElement;
        lott.setAttribute("preserveAspectRatio", aspectRatio);
        if (animationContainer.children[1]) {
          const del = animationContainer.children[1];
          animationContainer.removeChild(del);
        }
      }
    }

    window.addEventListener("resize", windowResize);
    windowResize();

    return () => {
      animation.destroy();
      window.removeEventListener("resize", windowResize);
    };
  });
</script>

<div id="backdrop" bind:this={animationContainer}></div>

<style lang="scss">
  #backdrop {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    top: 0;
  }
</style>
