<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  let { data } = $props();
  console.log(data);
</script>

<BasicSkillPage skillData={data.motion} projects={data.motion.projects} />
