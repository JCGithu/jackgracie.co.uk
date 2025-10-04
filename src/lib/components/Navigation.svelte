<script>
  import { onMount } from "svelte";

  let navBarClass = "navBar";

  function handleScroll() {
    if (window.scrollY > 50) {
      navBarClass = "navBar navBar_black";
    } else {
      navBarClass = "navBar";
    }
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:window on:scroll={handleScroll} />

<nav class={navBarClass}>
  <button class="monogram">jg</button>
  <button class="hamburger" aria-label="Toggle menu">
    <img src="/images/hamburger.svg" alt="Menu" />
  </button>
</nav>
