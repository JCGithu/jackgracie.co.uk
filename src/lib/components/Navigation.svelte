<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { ScrollState } from "runed";
  interface Props {
    currentSkill: {
      name: string;
      showing: boolean;
    };
  }

  let { currentSkill }: Props = $props();
  // let el = $state<HTMLElement>();
  const scroll = new ScrollState({
    element: () => window,
  });
  let navBarBlack = $derived(scroll.y > 50);

  function goHome() {
    goto("/");
  }

  function goBackToSkill() {
    currentSkill.name ? goto(`/${currentSkill.name}`) : goHome();
  }
</script>

<nav class="navBar" class:navbarFill={navBarBlack}>
  <div class="nav-left">
    <button id="monogram" onclick={goHome}>jg</button>
    {#if currentSkill.showing && currentSkill.name}
      <button id="back-button" out:fly={{ x: -150 }} onclick={goBackToSkill}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to {currentSkill.name}
      </button>
    {/if}
  </div>
</nav>

<style>
  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    /* pointer-events: auto; */
    flex: 1;
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

  #back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    margin-left: 0.35rem;
    color: var(--sinon-white);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: capitalize;
    font-family: "Poppins", sans-serif;
    pointer-events: auto;
    opacity: 0;
    transition: all 0.3s ease;
    animation: fadeIn 2s 1s ease forwards;
  }

  #back-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: var(--sinon-white);
    margin-left: 0.2rem;
  }

  #back-button svg {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 768px) {
    .nav-left {
      gap: 0.75rem;
    }

    #back-button {
      padding: 0.4rem 0.6rem;
      font-size: 0.75rem;
    }

    #back-button svg {
      width: 14px;
      height: 14px;
    }
  }
</style>
