<script lang="ts">
  import { goto } from "$app/navigation";
  import hamburgerIcon from "../../images/hamburger.svg";
  import type { Skill } from "$lib/utils/types.js";
  interface Props {
    data: { skills: Record<string, Skill> };
  }
  let { data }: Props = $props();
  let skills = data.skills;
  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }

  function closeMenu() {
    menuOpen = false;
    document.body.classList.remove("modal-open");
  }

  function navigateToSkill(skill: string) {
    closeMenu();
    goto(`/${skill}`);
  }

  // Handle hamburger button click
  function handleHamburgerClick() {
    toggleMenu();
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Hamburger button positioned in nav bar -->
<button class="hamburger hamburger-nav" aria-label="Toggle menu" onclick={handleHamburgerClick}>
  <img src={hamburgerIcon} alt="Menu" />
</button>

<div id="menu" class:menu__on={menuOpen} role="dialog" aria-modal="true" aria-label="Navigation menu" tabindex="0">
  <button class="menu_close" aria-label="Close menu" onclick={closeMenu}>×</button>
  <div class="menu_inner">
    {#each Object.keys(skills) as skill}
      <button class="menu_item" style="--accent-color: {skills[skill].accent}" onclick={() => navigateToSkill(skills[skill].slug)}> {skills[skill].name} </button>
    {/each}
  </div>
</div>

<style>
  .hamburger-nav {
    position: fixed;
    top: 1rem;
    right: 2rem;
    z-index: 60;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hamburger-nav img {
    width: 100%;
    height: 100%;
  }
</style>
