<script lang="ts">
  import "../app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import type { LayoutProps } from "./$types";
  import PageTransition from "$lib/transition.svelte";
  let { data, children }: LayoutProps = $props();

  const colours = new Map();
  for (const skill of Object.keys(data.skills)) {
    colours.set(skill, data.skills[skill].accent);
    for (const project of data.skills[skill].projects) {
      colours.set(project.slug, project.accent);
    }
  }
</script>

<Navigation />
<Menu {data} />

<main>
  <PageTransition url={data.url} {colours}>
    {@render children()}
  </PageTransition>
</main>
