<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  import type { Skill } from "$lib/utils/types.js";

  let { data } = $props();

  const skillData: Skill = {
    name: "Motion Graphics",
    path: "/motion",
    description: "Dynamic animations and motion graphics that bring ideas to life.",
    tools: ["After Effects", "Cinema 4D", "Adobe Premiere", "Blender"],
    banner: [
      {
        url: "/images/motion_foreground.png",
        alt: "Motion Graphics Banner",
      },
      {
        url: "/images/motion_background.png",
        alt: "Motion Graphics Banner",
      },
    ],
  };
</script>

<BasicSkillPage {skillData} projects={data.projects} />
