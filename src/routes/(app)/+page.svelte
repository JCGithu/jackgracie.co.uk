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
    <div id="homeBox">
      <div id="titleText">
        <h1 id="title">
          <SplitText copy="jack gracie" />
        </h1>
        <!-- <div class="underline"></div> -->
        <p id="email">contact@jackgracie.co.uk</p>
        <p class="hidden">Pimento font</p>
      </div>
    </div>
  </div>

  <!-- Fullpage Menu Section -->
  <div class="menuSection">
    <Menu {skills} onNavigate={navigateToSkill} bottom={true} />
  </div>
</div>

<style lang="scss">
  @use "$lib/styles/scrollbars" as scrollbars;
  @use "$lib/styles/breakpoints" as *;

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
    background: radial-gradient(circle at left, #803cff, rgb(47, 35, 49));
    @include scrollbars.hide-scrollbar;
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

  .hidden {
    font-family: var(--font-pimento);
    visibility: hidden;
  }

  #homeBox {
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    color: white;

    h1 {
      z-index: 10;
      position: relative;
      text-align: center;
      margin: 0;
      font-size: 4rem;
      font-weight: 400;

      @media screen and (max-width: $bp-desktop) {
        font-size: 3rem;
      }

      @media screen and (max-width: $bp-mobile) {
        font-size: 2.5rem;
      }
    }
  }

  #titleText {
    width: 20rem;
    height: auto;
    position: relative;
    text-align: center;
    align-items: center;

    ::selection {
      background: #ff809a;
    }
  }

  #email {
    font-size: 0.75rem;
    opacity: 0.8;
    margin: 0;
    margin-top: -0.2rem;
    margin-bottom: 0.4rem;
    font-family: "Poppins", sans-serif;
  }
</style>
