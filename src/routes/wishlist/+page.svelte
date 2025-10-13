<script lang="ts">
  import "../../app.scss";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let wishlist = data.wishlist;
</script>

<svelte:head>
  <title>{wishlist.title} - Jack Gracie</title>
  <meta name="description" content={wishlist.description} />
</svelte:head>

<div class="wishlist-container" style="--wishlist-accent: {wishlist.accent}">
  <div class="noise"></div>
  <div class="overlay"></div>
  <main>
    <h1>{wishlist.title}</h1>
    <p class="subtitle">{wishlist.subtitle}</p>
    <div class="wishlist-content">
      <wishlist.content />
    </div>
  </main>
</div>

<style lang="scss">
  // Variables
  $text-white: #ffffff;
  $text-light: #f8f8f8;
  $text-gray: #f0f0f0;
  $text-muted: #e0e0e0;
  $bg-dark: rgba(0, 0, 0, 0.3);
  $bg-darker: rgba(0, 0, 0, 0.4);
  $border-subtle: rgba(255, 255, 255, 0.1);
  $shadow-text: 0 1px 3px rgba(0, 0, 0, 0.5);
  $shadow-strong: 0 2px 4px rgba(0, 0, 0, 0.7);

  h1 {
    font-family: var(--font-serif);
    font-size: 3rem;
    font-weight: 400;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    text-align: center;
    color: $text-white;
    text-shadow: $shadow-text;

    @media screen and (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 2rem;
    }
  }

  .subtitle {
    font-family: var(--font-sans);
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0 0 2rem 0;
    line-height: 1.5;
    text-align: center;
    color: $text-light;
  }

  .wishlist-content {
    :global(.section) {
      margin-bottom: 2rem;
      display: flex;
      position: relative;
      flex-direction: column;

      &::after {
        content: "";
        display: block;
        width: 110%;
        margin-left: -5%;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.5);
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    }

    :global(.section h3) {
      width: 100%;
      text-align: start;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      margin-top: 0.5rem;
      color: $text-white;
      text-shadow: $shadow-strong;

      @media screen and (max-width: 768px) {
        font-size: 1.6rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 1.7rem;
        margin-bottom: 2.5rem;
      }
    }

    :global(.section p) {
      width: 100%;
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      color: $text-light;

      @media screen and (max-width: 768px) {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 2rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 1.15rem;
        line-height: 1.9;
      }
    }

    :global(.section ul) {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    :global(ul) {
      list-style: inside;
    }

    :global(ul li) {
      margin-bottom: 0.8rem;
      font-size: 1.05rem;
      line-height: 1.6;
      color: $text-gray;

      @media screen and (max-width: 768px) {
        font-size: 1.05rem;
        line-height: 1.7;
        margin-bottom: 1rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 1.2rem;
      }
    }

    :global(a) {
      color: #ff7f7f;
      text-decoration: underline;
      text-decoration-color: #ff7f7f;
      padding: 0;
      transition: color 0.2s ease;
      font-weight: 500;
    }

    :global(a:hover) {
      color: #ff9f9f;
      text-decoration-color: #ff9f9f;
    }

    :global(.highlight) {
      font-style: italic;
      overflow: hidden;
      font-size: 0.95rem;
      border-radius: 0.5rem;
      background-color: rgba(255, 255, 255, 0.1);
      color: $text-muted;
      padding: 0.2rem 0.6rem;
      margin: 0 0.2rem;
      display: inline;
      vertical-align: baseline;
    }

    :global(.scroll-area) {
      height: 400px;
      width: 100%;
      max-width: 500px;
      margin: 1.5rem auto;
      background-color: $bg-dark;
      border: 1px solid $border-subtle;
      padding: 1.5rem;
      border-radius: 1rem;
      overflow: auto;
      display: block;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      @media screen and (max-width: 768px) {
        height: 350px;
        padding: 1.2rem;
        margin: 2rem auto;
      }

      @media screen and (max-width: 480px) {
        height: 300px;
        padding: 1rem;
        margin: 2.5rem auto;
      }
    }

    :global(table) {
      width: 100%;
      border-collapse: collapse;
    }

    :global(th) {
      text-align: left;
      padding: 0.8rem 0.5rem;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
      font-weight: bold;
      font-size: 1.1rem;
      color: $text-white;
      background-color: rgba(255, 255, 255, 0.05);
    }

    :global(td) {
      text-align: left;
      padding: 0.8rem 0.5rem;
      border-bottom: 1px solid $border-subtle;
      font-size: 1rem;
      color: $text-gray;
    }

    :global(.card) {
      text-align: center;
      border-radius: 0.8rem;
      background-color: $bg-darker;
      border: 1px solid $border-subtle;
      padding: 2rem;
      margin: 2.5rem 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    :global(.card-header) {
      margin-bottom: 1rem;
    }

    :global(.card-title) {
      margin: 0 0 1rem 0;
      padding: 0;
      font-size: 1.4rem;
      font-weight: bold;
      color: $text-white;
      text-shadow: $shadow-strong;
    }

    :global(.card-content) {
      line-height: 1.7;
      font-size: 1.1rem;
      color: $text-gray;
    }

    :global(.accordion) {
      margin: 2rem 0;
    }

    :global(.accordion-item) {
      margin-bottom: 0.5rem;
    }

    :global(.accordion-trigger) {
      width: 100%;
      text-align: left;
      background-color: $bg-dark;
      border: 1px solid $border-subtle;
      padding: 1.2rem;
      border-radius: 0.6rem;
      color: $text-white;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s ease;
      text-shadow: $shadow-text;
    }

    :global(.accordion-trigger:hover) {
      background-color: rgba(0, 0, 0, 0.5);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    :global(.accordion-content) {
      padding: 1.5rem;
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-top: none;
      border-radius: 0 0 0.6rem 0.6rem;
      margin-top: -0.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    :global(hr) {
      border: none;
      height: 1px;
      background: linear-gradient(to right, transparent, $border-subtle, transparent);
      margin: 2.5rem 0;
      opacity: 0.8;
    }
  }

  .wishlist-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at left, #803cff, rgb(47, 35, 49));
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    /* Hide scrollbar */
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;

    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
  }

  .noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh;
    background-image: url("/images/noise.png");
    opacity: 0.3;
    z-index: 10;
    pointer-events: none;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 15;
    pointer-events: none;
  }

  main {
    position: relative;
    z-index: 25;
    color: $text-white;
    padding: 6rem 3rem 3rem 3rem;
    display: flex;
    flex-direction: column;
    justify-self: center;
    max-width: 800px;
    margin: 0 auto;
    transition: all 0.5s;
    text-shadow: $shadow-text;
    line-height: 1.6;

    @media (min-width: 1200px) {
      max-width: 900px;
    }

    @media screen and (max-width: 768px) {
      padding: 6rem 1.5rem 2rem 1.5rem;
      font-size: 1rem;
      line-height: 1.7;
    }

    @media screen and (max-width: 480px) {
      padding: 5rem 1.2rem 2rem 1.2rem;
      font-size: 1.05rem;
      line-height: 1.8;
    }
  }
</style>
