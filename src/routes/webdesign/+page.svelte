<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  import type { Skill, Project } from "$lib/utils/types.js";

  export let data: Record<number, Project>;
  let projects: Project[] = [];
  Object.entries(data).map(([key, value]) => {
    projects.push(value);
  });

  const skillData: Skill = {
    name: "Web Design",
    path: "/webdesign",
    description: "Modern, responsive web design and development.",
    tools: ["HTML/CSS", "JavaScript", "React", "Svelte", "Tailwind CSS"],
    banner: [
      {
        url: "/images/webdesign-banner.jpg",
        alt: "Web Design Banner",
      },
    ],
  };
</script>

<BasicSkillPage {skillData} {projects} />
