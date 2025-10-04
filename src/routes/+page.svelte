<script>
  import Backdrop from "$lib/components/Backdrop.svelte";
  import ContentGrid from "$lib/components/ContentGrid.svelte";
</script>

<svelte:head>
  <title>Jack Gracie</title>
  <meta name="description" content="Jack Gracie - Motion Graphics, Video, and Web Design Portfolio" />
</svelte:head>

<div class="home">
  <Backdrop />
  <div class="titleBox">
    <div class="titleText">
      <h1>Jack Gracie</h1>
      <p class="mini">Creative Portfolio</p>
      <div class="underline" style="background: var(--sinon-red); width: 15rem;"></div>
    </div>
  </div>
  <ContentGrid />
</div>
