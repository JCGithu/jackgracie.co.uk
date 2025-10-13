<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ArrowButton from "$lib/components/ArrowButton.svelte";
  let { link = "/", colour = "black", children }: { link: string; colour: string; children: any } = $props();
  let url = $derived(page.url.pathname);
  let isProjectPage = $derived(url.includes("/project/"));
</script>

{#if isProjectPage}
  <div>
    {@render children()}
  </div>
{:else}
  <ArrowButton onclick={() => goto(link)} direction="right" hover={colour} colour="var(--sinon-black)" right={true}>Read More</ArrowButton>
{/if}
