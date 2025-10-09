<script lang="ts">
  interface Props {
    onclick?: () => void;
    children: any;
    direction: "left" | "right" | "up" | "down";
    color: string;
    right: boolean;
    fill: boolean;
    fade: boolean;
  }

  let { onclick, children, direction = "left", color = "white", right = false, fill = false, fade = true }: Props = $props();

  let cssDirection = $derived(direction === "left" ? "0deg" : direction === "right" ? "180deg" : direction === "up" ? "90deg" : "270deg");
  let cssMargin = $derived(direction === "left" ? "0 0 0 0.2rem" : direction === "right" ? "0 .2rem 0 0" : direction === "up" ? "0.2rem 0 0 0" : "0 0 0.2rem 0");
</script>

<button {onclick} style="--arrow-color: {color}; --css-margin: {cssMargin}" class:fade class:fill>
  {#if !right}
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="transform: rotate({cssDirection})">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  {/if}
  {@render children()}
  {#if right}
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="transform: rotate({cssDirection})">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  {/if}
</button>

<style lang="scss">
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
    color: var(--sinon-white);
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
      border-color: var(--sinon-white);
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
    border-color: var(--arrow-color);
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: var(--sinon-black);
      border-color: var(--arrow-color);
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 768px) {
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
