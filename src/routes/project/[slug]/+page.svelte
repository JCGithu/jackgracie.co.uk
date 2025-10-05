<script lang="ts">
  let { data } = $props();
  console.log(data.project);
</script>

<svelte:head>
  {#if data.project}
    <title>{data.project.title} - Jack</title>
    <meta name="description" content={data.project.description} />
  {:else}
    <title>Jack Gracie</title>
    <meta name="description" content="Project page" />
  {/if}
</svelte:head>

<div class="project-page">
  <div class="project-header">
    <h1>{data.project.title}</h1>
    <p class="subtitle">{data.project.subtitle}</p>
  </div>

  <div class="project-content">
    <div class="project-image">
      {#if data.project.image}
        <img src={data.project.image} alt={data.project.title} />
      {:else}
        <img src={data.project.poster} alt={data.project.title} />
      {/if}
    </div>

    <div class="project-details">
      <div class="description">
        {@html data.project.description}
      </div>

      {#if data.project.client}
        <p class="client">Client: {data.project.client}</p>
      {/if}

      <div class="project-tools">
        <h3>Tools Used:</h3>
        <div class="tools-list">
          {#each data.project.tools as tool}
            <span class="tool-tag" title={tool}>{tool}</span>
          {/each}
        </div>
      </div>

      <data.project.content />

      {#if data.project.links && data.project.links.length > 0}
        <div class="project-links">
          <h3>Links:</h3>
          <div class="links-list">
            {#each data.project.links as link}
              <a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link">
                {link.text}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .project-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: var(--sinon-white);
    min-height: 100vh;
  }

  .project-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .project-header h1 {
    font-family: "DM Serif Display", serif;
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: var(--sinon-red);
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--sinon-white);
    opacity: 0.8;
    margin: 0;
  }

  .project-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .project-image {
    width: 100%;
  }

  .project-image img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .project-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
  }

  .client {
    color: var(--sinon-red);
    font-weight: 600;
    margin: 0;
  }

  .project-tools h3,
  .project-links h3 {
    font-family: "DM Serif Display", serif;
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: var(--sinon-red);
  }

  .tools-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tool-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .links-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-link {
    color: var(--sinon-white);
    text-decoration: none;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
  }

  .project-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--sinon-red);
    transform: translateX(5px);
  }

  @media screen and (max-width: 768px) {
    .project-page {
      padding: 1rem;
    }

    .project-header h1 {
      font-size: 2rem;
    }

    .project-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
