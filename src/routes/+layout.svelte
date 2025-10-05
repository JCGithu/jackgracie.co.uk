<script lang="ts">
  import "../app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import type { LayoutProps } from "./$types";
  let { data, children }: LayoutProps = $props();
</script>

<Navigation />
<Menu skills={data} />

<main>
  {@render children()}
</main>
