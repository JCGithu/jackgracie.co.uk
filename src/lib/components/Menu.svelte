<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Skill } from "$lib/utils/types.js";
  import { fly } from "svelte/transition";
  import Hamburger from "./hamburger.svelte";
  interface Props {
    data: { skills: Record<string, Skill> };
  }
  let { data }: Props = $props();
  let skills = data.skills;
  let menuOpen = $state(false);

  function navigateToSkill(skill: string) {
    goto(`/${skill}`);
    setTimeout(() => {
      menuOpen = false;
    }, 300);
  }

  // Handle hamburger button click
  function handleHamburgerClick() {
    menuOpen = !menuOpen;
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && menuOpen) {
      menuOpen = false;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<button class="hamburger hamburger-nav" aria-label="Toggle menu" onclick={handleHamburgerClick}>
  <Hamburger menu={menuOpen} colour="white" />
</button>

{#if menuOpen}
  <div id="menu" role="dialog" aria-modal="true" aria-label="Navigation menu" tabindex="0">
    {#each Object.keys(skills) as skill, index (skill)}
      <button transition:fly|global={{ x: 100, delay: index * 100, duration: 300 }} class="menu_item" style="--accent-color: {skills[skill].accent}" onclick={() => navigateToSkill(skills[skill].slug)}> {skills[skill].name} </button>
    {/each}
  </div>
{/if}

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;

  .hamburger {
    position: fixed;
    top: 1rem;
    right: 2rem;
    z-index: 1001;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
  }

  #menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0);
    z-index: 1000;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    button {
      font-family: "Pimento";
      height: 100%;
      background: var(--accent-color);
    }
  }

  #close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
    transition: color 0.3s ease;
    z-index: 1001;
    &:hover {
      color: var(--sinon-red);
    }
  }

  .menu_item {
    list-style: none;
    color: white;
    font-size: 2rem;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    background: none;
    border: none;
    padding: 1rem;
    transition: color 0.3s ease;
    text-align: center;
    width: 100%;
    display: inline-block;
  }
</style>
