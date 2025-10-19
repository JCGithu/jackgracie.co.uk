<script>
  import { goto } from "$app/navigation";
  import "../../app.scss";
  import ArrowButton from "$lib/components/ArrowButton.svelte";
  function goHome() {
    goto("/");
  }
</script>

<svelte:head>
  <title>404 - Jack Gracie</title>
</svelte:head>

<div class="error-container">
  <div class="noise"></div>

  <div class="error-content">
    <div class="error-box">
      <h1 class="error-title">Uh oh</h1>
      <p class="error-subtitle">Page not found. I'm sure it's hiding somewhere...</p>

      <div style="display: flex; justify-content: center; align-items: center; margin-top: 2rem;">
        <ArrowButton onclick={goHome} direction="left" colour="white" fade={false} right={false} hover="white" fill={false}>Take me home</ArrowButton>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .error-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at left, #803cff, rgb(47, 35, 49));
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("/images/noise.png");
    opacity: 0.3;
    z-index: 10;
    pointer-events: none;
  }

  .error-content {
    position: relative;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .error-box {
    text-align: center;
    color: white;
    max-width: 600px;
    padding: 2rem;
  }

  .error-title {
    font-family: var(--font-serif);
    font-size: 3rem;
    font-weight: 400;
    margin: 0 0 1rem 0;
    line-height: 1.2;

    @media screen and (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 2rem;
    }
  }

  .error-subtitle {
    font-family: var(--font-sans);
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0 0 2rem 0;
    line-height: 1.5;
  }
</style>
