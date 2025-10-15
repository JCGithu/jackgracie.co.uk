<script lang="ts">
  import { fly } from "svelte/transition";
  import { IsInViewport } from "runed";
  import type { Skill } from "$lib/utils/types.js";
  import Swirl from "./Swirl.svelte";

  interface Props {
    skills: Record<string, Skill>;
    onNavigate: (slug: string) => void;
    bottom?: boolean;
  }

  let { skills, onNavigate, bottom }: Props = $props();
  let targetNode = $state<HTMLElement>()!;
  const inViewport = new IsInViewport(() => targetNode);
  let swirlOn = $state([false, false, false, false]);
</script>

<div class="menu" bind:this={targetNode} class:bottom>
  {#if inViewport.current}
    {#each Object.keys(skills) as skill, index (skill)}
      <button transition:fly|global={{ x: 100, delay: index * 100, duration: 300 }} class="menu_item" style="--accent-color: {skills[skill].accent}" onclick={() => onNavigate(skills[skill].slug)} onmouseenter={() => (swirlOn[index] = true)} onmouseleave={() => (swirlOn[index] = false)}>
        {skills[skill].name}
        {#if swirlOn[index]}
          <div class="swirl_container">
            <Swirl />
          </div>
        {/if}
      </button>
    {/each}
  {/if}
</div>

<style lang="scss">
  @use "$lib/styles/menu" as *;
  @use "$lib/styles/breakpoints" as *;

  .bottom {
    height: 100vh !important;
  }
  .menu_item {
    position: relative;
    height: 100%;
    width: 100%;
    background: var(--accent-color);
    color: white;
    font-family: "Pimento";
    font-size: 2rem;
    cursor: pointer;
    border: none;
    transition: color 0.3s ease;
    &:hover {
      text-decoration: underline !important;
    }
    @media screen and (max-width: $bp-mobile-tablet) {
      font-size: 1.5rem;
      padding: 0.75rem;
    }

    @media screen and (max-width: $bp-mobile-small) {
      font-size: 1.25rem;
      padding: 0.5rem;
    }
  }

  .swirl_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scaleX(1.2) scaleY(0.5);
    width: 35vw;
    height: 35vw;
    z-index: 5;
    pointer-events: none;
    transition: transform 0.3s ease;

    @media screen and (max-width: $bp-mobile-tablet) {
      width: 28vw;
      height: 28vw;
      transform: translate(-50%, -50%) scaleX(1) scaleY(0.4);
    }

    @media screen and (max-width: $bp-mobile) {
      width: 40vw;
      height: 40vh;
      transform: translate(-50%, -50%) scaleX(0.9) scaleY(0.35);
    }
    @media screen and (max-width: $bp-mobile-small) {
      width: 50vw;
      height: 40vh;
      transform: translate(-50%, -50%) scaleX(0.9) scaleY(0.3);
    }
  }

</style>
