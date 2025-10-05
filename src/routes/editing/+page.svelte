<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  import type { Skill } from "$lib/utils/types.js";

  let { data } = $props();

  const skillData: Skill = {
    name: "Editing",
    path: "/editing",
    description: "Projects I've produced, shot, or edited. Details are included in the individual project cards.",
    tools: ["Adobe Premiere", "After Effects", "Adobe Audition", "Ableton Live"],
    banner: [
      {
        url: "/images/video-banner.jpg",
        alt: "Video Banner",
      },
    ],
  };
</script>

<BasicSkillPage {skillData} projects={data.projects} />
