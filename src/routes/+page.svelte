<script lang="ts">
  import { onMount } from "svelte";
  import Backdrop from "$lib/components/Backdrop.svelte";
  import SplitText from "$lib/components/SplitText.svelte";
  import ContentGrid from "$lib/components/ContentGrid.svelte";

  onMount(() => {
    // Animation for the underline
    const underline = document.querySelector(".underline") as HTMLElement;
    if (underline) {
      underline.style.width = "0";
      underline.style.opacity = "0";

      setTimeout(() => {
        underline.style.transition = "width 2s ease-out, opacity 2s ease-out";
        underline.style.width = "17rem";
        underline.style.opacity = "1";
        underline.style.background = "linear-gradient(90deg, #ffffff 30%, #bdbdbd 39%, #ffffff 48%)";
      }, 500);
    }
  });
</script>

<svelte:head>
  <title>Jack Gracie</title>
  <meta name="description" content="Jack Gracie - Motion Graphics, Video, and Web Design Portfolio" />
</svelte:head>

<div class="home">
  <Backdrop />
  <div class="titleBox">
    <div class="titleText">
      <h1 class="DMserif">
        <SplitText copy="jack gracie" />
      </h1>
      <div class="underline"></div>
      <p class="mini">contact@jackgracie.co.uk</p>
    </div>
  </div>
  <ContentGrid />
</div>
