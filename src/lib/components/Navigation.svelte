<script lang="ts">
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { scrollY } from 'svelte/reactivity/window';
  import ArrowButton from "$lib/components/ArrowButton.svelte";
  import Hamburger from "./Hamburger.svelte";
  import Menu from "./Menu.svelte";
  import type { Skill } from "$lib/utils/types.js";

  interface Props {
    currentSkill: {
      name: string;
      showing: boolean;
    };
    data: { skills: Record<string, Skill> };
  }

  let { currentSkill, data }: Props = $props();
  let skills = data.skills;
  let menuOpen = $state(false);

  let navBarShow = $derived(scrollY.current > 50);

  function goHome() {
    goto("/");
  }

  function goBackToSkill() {
    currentSkill.name ? goto(`/${currentSkill.name}`) : goHome();
  }

  function navigateToSkill(skill: string) {
    goto(`/${skill}`);
    setTimeout(() => {
      menuOpen = false;
    }, 300);
  }

  function handleHamburgerClick() {
    menuOpen = !menuOpen;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && menuOpen) {
      menuOpen = false;
    }
  }

  let hamburgerColour = $derived.by(() => {
    if (menuOpen) return "white";
    return currentSkill.showing && !navBarShow ? "var(--sinon-black)" : "white";
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="navBar" class:navbarFill={navBarShow}>
  <div class="nav-left">
    <button id="monogram" class:skillpage={currentSkill.showing && !navBarShow} onclick={goHome}>jg</button>
    {#if currentSkill.showing && currentSkill.name}
      <ArrowButton onclick={goBackToSkill} direction="left" colour="black" fade={false} right={false} hover={"black"} fill={false} lightMode={navBarShow}>
        Back to {currentSkill.name}
      </ArrowButton>
    {/if}
  </div>
</nav>

<button class="hamburger" class:skillpage={currentSkill.showing && !navBarShow} aria-label="Toggle menu" onclick={handleHamburgerClick}>
  <Hamburger menu={menuOpen} colour={hamburgerColour} />
</button>

{#if menuOpen}
  <div class="menu" role="dialog" aria-modal="true" aria-label="Navigation menu" tabindex="0">
    <Menu {skills} onNavigate={navigateToSkill} />
  </div>
{/if}

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;
  @use "$lib/styles/menu" as *;

  .menu {
    position: fixed;
    top: 0;
    left: 0;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* pointer-events: auto; */
    flex: 1;
  }
  /* Navigation Styles */
  .navBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 4rem;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: transparent;
    transition: background 0.5s ease;
  }

  #monogram {
    align-self: baseline;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    margin-top: -0.2rem;
    font-weight: bold;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    pointer-events: auto;
  }

  .skillpage {
    color: var(--sinon-black) !important;
  }

  .navbarFill {
    background: var(--sinon-black);
    opacity: 1;
    #monogram {
      color: white;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: $bp-mobile) {
    .nav-left {
      gap: 0.75rem;
    }
  }

  /* Menu Styles */
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
</style>
