<script lang="ts">
  import BasicSkillPage from "$lib/components/BasicSkillPage.svelte";
  let { data } = $props();
  let page = "motion";
</script>

<BasicSkillPage skillData={data.skills[page]} />
