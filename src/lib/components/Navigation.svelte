<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let navBarClass = "navBar";

  function handleScroll() {
    if (window.scrollY > 50) {
      navBarClass = "navBar navBar_black";
    } else {
      navBarClass = "navBar";
    }
  }

  function goHome() {
    goto("/");
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:window on:scroll={handleScroll} />

<nav class={navBarClass}>
  <button class="monogram" on:click={goHome}>jg</button>
</nav>
