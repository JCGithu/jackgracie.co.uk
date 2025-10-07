<script lang="ts">
  import { onMount } from "svelte";

  import { waapi, splitText, stagger, spring } from "animejs";
  export let copy: string;
  let container: HTMLElement;

  let easing = spring({
    bounce: 0.4,
    duration: 500,
  });

  onMount(() => {
    const split = splitText(container, { chars: true });
    waapi.animate(split.chars, {
      x: ["-50px", "0px"],
      opacity: [0, 0, 1],
      delay: stagger(60),
      ease: easing,
    });
    waapi.animate(".underline", {
      width: ["0%", "90%"],
      ease: "outCirc",
      duration: 1500,
    });
  });
</script>

<span bind:this={container}>
  {copy}
  <div class="underline"></div>
</span>

<style>
  span {
    position: relative;
  }
  .underline {
    position: absolute;
    bottom: 17%;
    left: 8%;
    width: 90%;
    height: 2px;
    background-color: white;
  }
</style>
