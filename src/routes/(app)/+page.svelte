<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import Backdrop from "$lib/components/Backdrop.svelte";
  import SplitText from "$lib/components/SplitText.svelte";
  import { IsInViewport } from "runed";
  import type { PageProps } from "./$types";
  import type { Skill } from "$lib/utils/types.js";
  import Menu from "$lib/components/Menu.svelte";

  let { data }: PageProps = $props();
  let skills = data.skills;

  onMount(() => {
    // Animation for the underline using anime.js
    const underline = document.querySelector(".underline") as HTMLElement;
    if (underline) {
      underline.style.width = "0";
      underline.style.opacity = "0";
      underline.style.background = "white";
    }
  });

  function navigateToSkill(skill: string) {
    goto(`/${skill}`);
  }
</script>

<svelte:head>
  <title>Jack Gracie</title>
  <meta name="description" content="Jack Gracie - Motion Graphics, Video, and Web Design Portfolio" />
</svelte:head>

<div class="scrollContainer">
  <div class="noise"></div>

  <!-- Title Section -->
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

  <!-- Fullpage Menu Section -->
  <div class="menuSection">
    <Menu {skills} onNavigate={navigateToSkill} />
  </div>
</div>

<style lang="scss">
  // @use "$lib/styles/menu" as *;

  .scrollContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    //background: linear-gradient(to top right, #803cff, rgb(47, 35, 49));
    background: radial-gradient(circle at left, #803cff, rgb(47, 35, 49));

    /* Hide scrollbar - enhanced for all browsers */
    scrollbar-width: none !important; /* Firefox */
    -ms-overflow-style: none !important; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none !important; /* Chrome, Safari, Opera */
      width: 0 !important;
      height: 0 !important;
    }

    &::-webkit-scrollbar-track {
      display: none !important;
    }

    &::-webkit-scrollbar-thumb {
      display: none !important;
    }
  }

  .noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh; /* Cover the full height of both sections */
    background-image: url("/images/noise.png");
    opacity: 0.3;
    z-index: 10;
    pointer-events: none;
  }

  .home {
    width: 100vw;
    height: 100vh;
    position: relative;
    //background-color: var(--notion-black);
    //background: linear-gradient(to top right, #803cff, rgb(47, 35, 49));
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menuSection {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
</style>
