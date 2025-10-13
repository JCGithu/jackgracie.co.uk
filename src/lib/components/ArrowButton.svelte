<script lang="ts">
  interface Props {
    onclick?: () => void;
    children?: any;
    direction: "left" | "right" | "up" | "down";
    colour: string;
    hover?: string;
    right?: boolean;
    fill?: boolean;
    fade?: boolean;
    lightMode?: boolean;
  }

  let { onclick, children = null, direction = "left", colour = "var(--sinon-white)", hover = "var(--sinon-white)", right = false, fill = false, fade = true, lightMode = false }: Props = $props();

  let cssDirection = $derived(direction === "left" ? "0deg" : direction === "right" ? "180deg" : direction === "up" ? "90deg" : "270deg");
  let cssMargin = $derived(direction === "left" ? "0 0 0 0.2rem" : direction === "right" ? "0 .2rem 0 0" : direction === "up" ? "0.2rem 0 0 0" : "0 0 0.2rem 0");
  let hoverClass = $derived(hover.length > 0);
</script>

<button {onclick} style="--arrow-colour: {colour}; --css-margin: {cssMargin}; --hover-colour: {hover}" class:hoverClass class:fade class:fill class:light-mode={lightMode}>
  {#if !right}
    <svg width="20" height="20" viewBox="0 0 24 24" style="transform: rotate({cssDirection})">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  {/if}
  {@render children()}
  {#if right}
    <svg width="20" height="20" viewBox="0 0 24 24" style="transform: rotate({cssDirection})">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  {/if}
</button>

<style lang="scss">
  @use "$lib/styles/_breakpoints" as *;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    margin-left: 0.35rem;
    color: var(--arrow-colour);
    border-color: color-mix(in srgb, var(--arrow-colour) 50%, transparent);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: capitalize;
    font-family: "Poppins", sans-serif;
    pointer-events: auto;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: var(--hover-colour);
      margin: var(--css-margin);
    }
  }

  .fade {
    opacity: 0;
    animation: fadeIn 2s 1s ease forwards;
  }

  .fill {
    background: var(--off-white);
    color: var(--sinon-black);
    border-color: var(--arrow-colour);
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: var(--sinon-black);
      border-color: var(--arrow-colour);
    }
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: var(--arrow-colour);
    fill: none;
    stroke-width: 2;
  }

  .hoverClass {
    &:hover {
      border-color: var(--hover-colour);
      color: var(--hover-colour);
      svg {
        stroke: var(--hover-colour);
      }
    }
  }

  .light-mode {
    color: var(--sinon-white) !important;
    border-color: var(--sinon-white) !important;
    &:hover {
      border-color: var(--sinon-white) !important;
    }
    svg {
      stroke: var(--sinon-white) !important;
    }
  }

  @media screen and (max-width: $bp-mobile) {
    button {
      padding: 0.4rem 0.6rem;
      font-size: 0.75rem;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
</style>
