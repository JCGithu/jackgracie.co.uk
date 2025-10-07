<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  let { data } = $props();
</script>

<BasicSkillPage skillData={data.skills.editing} projects={data.skills.editing.projects} />
