<script>
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
    // Navigation logic would go here
    console.log(`Navigate to ${skill}`);
  }
</script>

<div id="menu" class:menu__on={menuOpen} role="dialog" aria-modal="true" aria-label="Navigation menu" tabindex="0">
  <button class="menu_close" aria-label="Close menu" on:click={closeMenu}>×</button>
  <div class="menu_inner">
    <button class="menu_item" style="--accent-color: #97A3E3" on:click={() => navigateToSkill("motion")}> Motion Graphics </button>
    <button class="menu_item" style="--accent-color: #fbcb71" on:click={() => navigateToSkill("video")}> Video </button>
    <button class="menu_item" style="--accent-color: #519872" on:click={() => navigateToSkill("webdesign")}> Web Design </button>
  </div>
</div>
