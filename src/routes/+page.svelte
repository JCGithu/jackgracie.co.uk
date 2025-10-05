<script lang="ts">
  import { onMount } from "svelte";
  //import anime from "animejs";
  import Backdrop from "$lib/components/Backdrop.svelte";
  import SplitText from "$lib/components/SplitText.svelte";

  onMount(() => {
    // Animation for the underline using anime.js
    const underline = document.querySelector(".underline") as HTMLElement;
    if (underline) {
      // Set initial state
      underline.style.width = "0";
      underline.style.opacity = "0";
      underline.style.background = "white";

      // Animate with anime.js to match the original
      // anime({
      //   targets: underline,
      //   width: ["0", "17rem"],
      //   opacity: [0, 1],
      //   background: ["white", "linear-gradient(90deg, #ffffff 30%, #bdbdbd 39%, #ffffff 48% )"],
      //   easing: "easeOutCirc",
      //   duration: 2000,
      // });
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
      <!-- <div class="underline"></div> -->
      <p class="mini">contact@jackgracie.co.uk</p>
    </div>
  </div>
</div>
