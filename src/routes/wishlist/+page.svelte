<script lang="ts">
    import './wishlist.scss';
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import * as Card from "$lib/components/ui/card/index.js";  
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
  import * as Table from "$lib/components/ui/table/index.js";
  import Storygraph from './storygraph.json';
  import { draggable } from '@neodrag/svelte';
  function getRandomPercent() {
    return Math.floor(Math.random() * 15);
  }
  function getRandomStar() {
    let stars = ['⭐', '🌟', '✨', '💫'];
    return stars[Math.floor(Math.random() * stars.length)];
  }
</script>
 
<main>
<h1 class="p-5 w-full underline decoration-orange-400 underline-offset-4">Wishlist</h1>
{#each Array(3) as _, i}
<span id="star" style:top={getRandomPercent() + '%'} style:left={getRandomPercent() * 5 + '%'} use:draggable >
  {getRandomStar()}
</span>
{/each}
<Card.Root class="text-center rounded-[6px]">
  <Card.Content class="p-0 relative">
    <p>This is full of things that will make you say: <i>"Oh that's a little boring..."</i>
    </p>
  </Card.Content>
</Card.Root>

<Accordion.Root type="single">
  <Accordion.Item value="item-1" class="m-0">
    <Accordion.Trigger>🌄 Experiences</Accordion.Trigger>
    <Accordion.Content>
      I’d like anything that’s crafty or a one-off experience.
      <ul>
        <li>Whiplash in concert is on at the Barbican in May.</li>
      </ul>
      Previous great experiences:
      <ul>
        <li>Coffee tasting at Hot Numbers</li>
        <li>Pottery class with Alice</li>
        <li>Croissant cooking class</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>🤖 Tech</Accordion.Trigger>
    <Accordion.Content>
      If you have (or see someone throwing out) an old iPod, camera, or games console I would love this as a gift. I have a number of modification projects for these kinds of things I am interested in. 
      <ul>
        <li>Headtorch <span class="highlight">Nothing fancy, preferably a rechargable one.</span></li>
        <li>Polaroid - Color 600 Film <span class="highlight">Can be purchased via Polaroid direct now </span></li>
        <li>Anker 735 Charger</li>
        <li>Lomography <a href="https://shop.lomography.com/uk/digitaliza-plus-scanning-kit">DigitaLIZA+</a> film holder</li> 
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>🏡 Home</Accordion.Trigger>
    <Accordion.Content>
      <ul>
        <li><a href="https://kinto-europe.com/collections/mug-cup/products/20754?variant=18332156493882">Nice mug</a></li>
        <li>Hasami porcelain coffee dripper, unglazed <span class="highlight">(I also like these mugs too)</span></li>
        <li>Campbell’s dough knife scraper. <span class="highlight">(8’ version preferably)</span></li>
        <li>Bread lame</li>
        <li>Bread banneton</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-4">
    <Accordion.Trigger>📙 Books</Accordion.Trigger>
    <Accordion.Content>
      Here is my full ‘To Read’ list, in no particular order:
      <ScrollArea class="h-[300px] bg-slate-800 bg-opacity-50 my-2 px-4 rounded-2xl overflow-auto">
        <Table.Root>
          <Table.Caption>Hello!</Table.Caption>
          <Table.Header>
            <Table.Head> Title</Table.Head>
            <Table.Head> Author</Table.Head>
          </Table.Header>
          <Table.Body>
            {#each Storygraph.children as child}  
              <Table.Row>
                <Table.Cell>{child.title}</Table.Cell>
                <Table.Cell>{child.author}</Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </ScrollArea>
      
      <h4>Cook Books & Others:</h4>
      <ul>
        <li>Aran: Recipes and Stories from a Bakery in the Heart of Scotland</li>
        <li>Lune - Croissants all day all night</li>
        <li>Supa Ya Ramen</li>
        <li>Super Sourdough - James Morton</li>
        <li>Hirayasumi, Vol. 1</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-5">
    <Accordion.Trigger>🤷 Misc</Accordion.Trigger>
    <Accordion.Content>
      <ul>
        <li>Record player repaired <span class="highlight">(The hinge on the lid is broken, I have no idea who could fix it or how much)</span></li>
        <li>Mossy Earth subscription. <span class="highlight">(Basically a charity subscription for a year)</span></li>
        <li>Nice coffee beans. Caffeinated or not.</li>
        <li>Molecule 01 fragrance</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-6">
    <Accordion.Trigger>🎻 Vinyl</Accordion.Trigger>
    <Accordion.Content>
      You can find what albums I'm after on my <a href="https://www.discogs.com/wantlist?user=JCGracie">Discogs account</a>! You can buy from trusted sellers direct on the site.      
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>

<Card.Root class="text-center rounded">
  <Card.Header>
    <Card.Title class="m-0 p-0">If there is nothing here you want to get...</Card.Title>
  </Card.Header>
  <Card.Content>
      Please just get me something that you've personally enjoyed <i>or</i> think that I will, for example:<br>
      <span class="highlight">A favourite book, film, or album</span><br>
      <span class="highlight">A board or card game that looks fun</span><br>
      <span class="highlight">Tickets for museum events.</span>
    </Card.Content>
</Card.Root>

<h2>More Expensive</h2>
<p>These are here  because I also keep this list for myself — they are above present price.</p>

<Accordion.Root type="single">
<Accordion.Item value="item-1">
  <Accordion.Trigger>🥼 Clothes</Accordion.Trigger>
  <Accordion.Content>
    <p>Please do not get me any clothes I'm not specifically asking for.</p>
    <ul>
      <li>Portuguese Flannel Overshirts / Shirts. <span class="highlight">This is a brand not a style.</span></li>
      <li><a href="https://uskees.com/products/3003-yellow-button-workshirt?variant=31257971359884">Uskees #3003 buttoned workshirt - Yellow</a></li>
      <li>Black Jeans. <span class="highlight">My jean size is W 31/32 L 32/33. Preferably not polyester.</span></li>
      <li>Forest green cardigan.</li>
      <li><a href="https://labomono.com/">LaboMono</a></li>
    </ul>
  </Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item-2">
  <Accordion.Trigger>🏡 Home</Accordion.Trigger>
  <Accordion.Content>
    <ul>
      <li>Sourdough slicer</li>
    </ul>
  </Accordion.Content>
</Accordion.Item>
</Accordion.Root>
</main>

<style lang="scss">
  h1 {
    position: relative;
  }
  @function tint($color, $percentage) {
    @return mix(white, $color, $percentage);
  }
  #star {
    position: absolute;
    font-size: 1rem;
    cursor: pointer;
    z-index: 2;
    transform-origin: center;
    filter: drop-shadow(1px 1px 5px #232323);
  }
  ul {
    list-style:inside;
    li {
      margin-bottom: 0.5rem;
    }
  }
  a {
    color: coral;
    text-decoration: underline;
    padding: 0;
  }
  .highlight {
    font-style: italic;
    text-decoration: underline;
    text-decoration-color: yellow;
    overflow: hidden;
    border-radius: 1rem;
    padding: 0.5rem;
  }
</style>