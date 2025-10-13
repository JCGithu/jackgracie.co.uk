<script lang="ts">
  import { onMount } from "svelte";
  import Backdrop from "$lib/components/Backdrop.svelte";
  import SplitText from "$lib/components/SplitText.svelte";

  onMount(() => {
    // Animation for the underline using anime.js
    const underline = document.querySelector(".underline") as HTMLElement;
    if (underline) {
      underline.style.width = "0";
      underline.style.opacity = "0";
      underline.style.background = "white";
    }
  });
</script>

<svelte:head>
  <title>Jack Gracie</title>
  <meta name="description" content="Jack Gracie - Motion Graphics, Video, and Web Design Portfolio" />
</svelte:head>

<div class="noise"></div>
<div class="home">
  <Backdrop />
  <div class="titleBox">
    <div class="titleText">
      <h1 class="DMserif">
        <SplitText copy="jack gracie" />
      </h1>
      <!-- <div class="underline"></div> -->
      <p class="mini">contact@jackgracie.co.uk</p>
    </div>
  </div>
</div>

<style>
  .noise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("/images/noise.png");
    opacity: 0.3;
    z-index: 10;
  }
</style>
