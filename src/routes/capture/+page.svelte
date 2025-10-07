<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  let { data } = $props();
  let page = "capture";
</script>

<BasicSkillPage skillData={data.skills[page]} projects={data.skills[page].projects} />
