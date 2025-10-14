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

  .bottom {
    height: 100vh !important;
  }
</style>
