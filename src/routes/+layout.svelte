<script lang="ts">
  import "../app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import type { LayoutProps } from "./$types";
  import PageTransition from "./transition.svelte";
  let { data, children }: LayoutProps = $props();
</script>

<Navigation />
<Menu {data} />

<main>
  <PageTransition url={data.url}>
    {@render children()}
  </PageTransition>
</main>
