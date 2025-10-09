<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  type Props = {
    children: Snippet;
    url: string;
    colours: Map<string, string>;
  };

  let { children, url, colours }: Props = $props();
  let wipeElement = $state<HTMLDivElement>();
  let isTransitioning = $state(false);
  let previousUrl = $state(url);

  let time = $state(500);

  let viewBox = "0 0 1440 320";
  let xmlns = "http://www.w3.org/2000/svg";

  let wipeColour = $state("#a67cf3");

  $effect(() => {
    if (url !== previousUrl) {
      let slug = url.split("/").pop() || "";
      wipeColour = colours.get(slug) || "#a67cf3";
      isTransitioning = true;
      previousUrl = url;
      setTimeout(() => {
        isTransitioning = false;
      }, time);
    }
  });
</script>

{#key url}
  <div transition:fade={{ duration: 200, delay: 500 }}>
    {@render children()}
  </div>
  <div id="transition-container" bind:this={wipeElement} class:wipe-active={isTransitioning} class:showTransition={isTransitioning} class:hideTopTransition={!isTransitioning} style="--time: {time}ms;">
    <svg id="transitionTop" {xmlns} {viewBox}>
      <path
        fill={wipeColour}
        fill-opacity="1"
        d="M0,256L17.1,234.7C34.3,213,69,171,103,176C137.1,181,171,235,206,234.7C240,235,274,181,309,133.3C342.9,85,377,43,411,26.7C445.7,11,480,21,514,58.7C548.6,96,583,160,617,186.7C651.4,213,686,203,720,181.3C754.3,160,789,128,823,138.7C857.1,149,891,203,926,213.3C960,224,994,192,1029,165.3C1062.9,139,1097,117,1131,90.7C1165.7,64,1200,32,1234,58.7C1268.6,85,1303,171,1337,197.3C1371.4,224,1406,192,1423,176L1440,160L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
      ></path>
    </svg>
    <div id="transitionBody" style="background-color: {wipeColour};"></div>
    <svg id="transitionBottom" {xmlns} {viewBox}>
      <path
        fill={wipeColour}
        fill-opacity="1"
        d="M0,256L17.1,234.7C34.3,213,69,171,103,176C137.1,181,171,235,206,234.7C240,235,274,181,309,133.3C342.9,85,377,43,411,26.7C445.7,11,480,21,514,58.7C548.6,96,583,160,617,186.7C651.4,213,686,203,720,181.3C754.3,160,789,128,823,138.7C857.1,149,891,203,926,213.3C960,224,994,192,1029,165.3C1062.9,139,1097,117,1131,90.7C1165.7,64,1200,32,1234,58.7C1268.6,85,1303,171,1337,197.3C1371.4,224,1406,192,1423,176L1440,160L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
      ></path>
    </svg>
  </div>
{/key}

<style lang="scss">
  #transition-container {
    position: fixed;
    z-index: 1000;
    width: 200vw;
    bottom: -100%;
    transform: rotate(20deg);
    left: -40%;
    pointer-events: none;
    --wipe-time: var(--time) cubic-bezier(0, 0.4, 0, 0.4);
  }

  #transitionTop {
    transform: translateY(20px);
  }
  #transitionBottom {
    transform: rotate(180deg) translateY(20px);
  }
  .hideTopTransition {
    animation: hideTopTransition ease-in var(--time);
    animation-fill-mode: forwards;
  }
  @keyframes hideTopTransition {
    0% {
      bottom: -50%;
      left: -40%;
    }
    to {
      bottom: 110%;
      left: -10%;
    }
  }
  .showTransition {
    animation: showTransition ease-in var(--time);
    animation-fill-mode: forwards;
  }
  @keyframes showTransition {
    0% {
      bottom: -450%;
      left: -60%;
    }
    to {
      bottom: -120%;
      left: -40%;
    }
  }
  #transitionBody {
    height: 200vh;
  }
  @media (max-aspect-ratio: 12/10) {
    #transition-container {
      transform: translateY(-20%) scale(1.2) rotate(10deg);
    }
  }
</style>
