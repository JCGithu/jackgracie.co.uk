<script lang="ts">
  interface TooltipProps {
    content: string;
  }

  let { content, children }: TooltipProps & { children: any } = $props();

  let isVisible = $state(false);

  function showTooltip() {
    isVisible = true;
  }

  function hideTooltip() {
    isVisible = false;
  }
</script>

<div class="tooltip-trigger" role="button" tabindex="0" onmouseenter={showTooltip} onmouseleave={hideTooltip}>
  {@render children()}

  {#if isVisible && content}
    <div class="tooltip-content" role="tooltip">
      {content}
    </div>
  {/if}
</div>

<style>
  .tooltip-trigger {
    display: inline-block;
    position: relative;
  }

  .tooltip-content {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    background: var(--sinon-black);
    color: white;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    font-weight: 500;
    max-width: 20rem;
    word-wrap: break-word;
    pointer-events: none;
    animation: tooltip-fade-in 0.15s ease-out;
    z-index: 1003;

    &::after {
      content: "▲";
      font-size: 1.2rem;
      line-height: 1rem;
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
      color: var(--sinon-black);
    }
  }

  @keyframes tooltip-fade-in {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }
</style>
