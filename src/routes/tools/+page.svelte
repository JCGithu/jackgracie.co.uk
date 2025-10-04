<script lang="ts">
  import ToolsGrid from "$lib/components/ToolsGrid.svelte";
</script>

<svelte:head>
  <title>Tools - Jack Gracie</title>
  <meta name="description" content="Tools and technologies used by Jack Gracie" />
</svelte:head>

<div class="tools-page">
  <div class="tools-header">
    <h1>Tools & Technologies</h1>
    <p>A collection of tools and technologies I use in my work, powered by SVGL.app</p>
  </div>

  <ToolsGrid />
</div>

<style>
  .tools-page {
    min-height: 100vh;
    color: var(--sinon-white);
  }

  .tools-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem 2rem 0;
  }

  .tools-header h1 {
    color: var(--sinon-white);
    font-size: 3rem;
    margin-bottom: 1rem;
    font-family: "DM Serif Display", serif;
  }

  .tools-header p {
    color: var(--sinon-white);
    font-size: 1.2rem;
    opacity: 0.8;
    max-width: 600px;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    .tools-header {
      padding: 1rem 1rem 0;
    }

    .tools-header h1 {
      font-size: 2rem;
    }

    .tools-header p {
      font-size: 1rem;
    }
  }
</style>
