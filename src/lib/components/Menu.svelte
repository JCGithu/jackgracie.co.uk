<script lang="ts">
  import { goto } from "$app/navigation";

  let menuOpen = false;

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

<svelte:window on:keydown={handleKeydown} />

<!-- Hamburger button positioned in nav bar -->
<button class="hamburger hamburger-nav" aria-label="Toggle menu" on:click={handleHamburgerClick}>
  <img src="/images/hamburger.svg" alt="Menu" />
</button>

<div id="menu" class:menu__on={menuOpen} role="dialog" aria-modal="true" aria-label="Navigation menu" tabindex="0">
  <button class="menu_close" aria-label="Close menu" on:click={closeMenu}>×</button>
  <div class="menu_inner">
    <button class="menu_item" style="--accent-color: #97A3E3" on:click={() => navigateToSkill("motion")}> Motion Graphics </button>
    <button class="menu_item" style="--accent-color: #fbcb71" on:click={() => navigateToSkill("video")}> Video </button>
    <button class="menu_item" style="--accent-color: #519872" on:click={() => navigateToSkill("webdesign")}> Web Design </button>
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
