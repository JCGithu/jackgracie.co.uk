<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  import type { Skill, Project } from "$lib/utils/types.js";

  export let data: Record<number, Project>;
  let projects: Project[] = [];
  Object.entries(data).map(([key, value]) => {
    projects.push(value);
  });

  const skillData: Skill = {
    name: "Video",
    path: "/video",
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

<BasicSkillPage {skillData} {projects} />
