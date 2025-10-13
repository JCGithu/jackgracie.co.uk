<script lang="ts">
  import "../../app.scss";
  import Navigation from "$lib/components/Navigation.svelte";
  import type { LayoutProps } from "./$types";
  import PageTransition from "$lib/transition.svelte";
  import { page } from "$app/stores";
  import type { SkillNames } from "$lib/utils/types";
  let { data, children }: LayoutProps = $props();

  const colours = new Map();
  for (const skill of Object.keys(data.skills)) {
    colours.set(skill, data.skills[skill].accent);
    for (const project of data.skills[skill].projects) {
      colours.set(project.slug, project.accent);
    }
  }

  let currentSkill = $state({
    name: "",
    showing: false,
  });

  $effect(() => {
    let slug = $page.url.pathname.split("/").pop()!;
    if (Object.values(data.skills).some((skill) => skill.slug === slug)) {
      currentSkill.name = slug;
      currentSkill.showing = false;
    } else {
      for (const skill of Object.keys(data.skills)) {
        if (data.skills[skill].projects.some((project) => project.slug === slug)) {
          currentSkill.name = skill;
          currentSkill.showing = true;
        }
      }
      currentSkill.showing = slug.length > 1;
    }
  });
</script>

<Navigation {currentSkill} {data} />

<main>
  <PageTransition url={data.url} {colours}>
    {@render children()}
  </PageTransition>
</main>
