<script>
  import { tools } from "$lib/data/tools.js";
</script>

<svelte:head>
  <title>Tools - Jack Gracie</title>
  <meta name="description" content="Tools and technologies used by Jack Gracie" />
</svelte:head>

<div class="tools-page">
  <div class="tools-header">
    <h1>Tools & Technologies</h1>
    <p>A collection of tools and technologies I use in my work</p>
  </div>

  <div class="tools-grid">
    {#each tools as tool}
      <div class="tool-card">
        <img src={tool.icon} alt={tool.name} class="tool-icon" />
        <h3>{tool.name}</h3>
      </div>
    {/each}
  </div>
</div>

<style>
  .tools-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tools-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .tools-header h1 {
    color: var(--sinon-white);
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: "DM Serif Display", serif;
  }

  .tools-header p {
    color: var(--sinon-white);
    font-size: 1.1rem;
    opacity: 0.8;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .tool-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    transition:
      transform 0.3s ease,
      background 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .tool-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }

  .tool-icon {
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  .tool-card h3 {
    color: var(--sinon-white);
    font-size: 1.1rem;
    margin: 0;
    font-family: "Poppins", sans-serif;
  }
</style>
