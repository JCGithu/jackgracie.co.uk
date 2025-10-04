<script lang="ts">
  import "../app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import Menu from "$lib/components/Menu.svelte";
</script>

<Navigation />
<Menu />

<main>
  <slot />
</main>
