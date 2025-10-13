<script lang="ts">
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { ScrollState } from "runed";
  import ArrowButton from "$lib/components/ArrowButton.svelte";
  interface Props {
    currentSkill: {
      name: string;
      showing: boolean;
    };
  }

  let { currentSkill }: Props = $props();

  const scroll = new ScrollState({
    element: () => window,
  });
  let navBarShow = $derived(scroll.y > 50);

  function goHome() {
    goto("/");
  }

  function goBackToSkill() {
    currentSkill.name ? goto(`/${currentSkill.name}`) : goHome();
  }
</script>

<nav class="navBar" class:navbarFill={navBarShow}>
  <div class="nav-left">
    <button id="monogram" onclick={goHome}>jg</button>
    {#if currentSkill.showing && currentSkill.name}
      <ArrowButton onclick={goBackToSkill} direction="left" colour="black" fade={false} right={false} hover={"black"} fill={false} lightMode={navBarShow}>
        Back to {currentSkill.name}
      </ArrowButton>
    {/if}
  </div>
</nav>

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* pointer-events: auto; */
    flex: 1;
  }
  /* Navigation Styles */
  .navBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 4rem;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: transparent;
    transition: background 0.5s ease;
  }

  #monogram {
    align-self: baseline;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    pointer-events: auto;
  }

  .navbarFill {
    background: var(--sinon-black);
    opacity: 1;
  }

  #monogram {
    margin-top: -0.2rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: $bp-mobile) {
    .nav-left {
      gap: 0.75rem;
    }
  }
</style>
