<script lang="ts">
    import './wishlist.scss';
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import * as Card from "$lib/components/ui/card/index.js";  
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
  import * as Table from "$lib/components/ui/table/index.js";
  import Storygraph from './storygraph.json';

</script>
 
<main>
<h1 class="p-5 w-full underline decoration-orange-400 underline-offset-4">Wishlist</h1>
<div class='section'>
  <h3 class="text-xl font-bold">🌄 Experiences</h3>
  <p>I’d like anything that’s crafty or a one-off experience.
  Previous great experiences: </p>
  <ul>
    <li>Coffee tasting at Hot Numbers</li>
    <li>Pottery class</li>
    <li>Croissant cooking class</li>
  </ul>
</div>
<div class='section'> 
  <h3 class="text-xl font-bold">🤖 Tech</h3>
  <p> If you have (or see someone throwing out) an old iPod, camera, or games console I would love this as a gift. I have a number of modification projects for these kinds of things I am interested in.</p>
    <ul>
      <li>Polaroid - Color 600 Film <span class="highlight">Can be purchased via Polaroid direct now </span></li>
      <li>Anker 735 Charger</li>
      <li>Lomography <a href="https://shop.lomography.com/uk/digitaliza-plus-scanning-kit">DigitaLIZA+</a> film holder</li> 
    </ul>
</div>
<div class='section'>
  <h3 class="text-xl font-bold">🏡 Home</h3>
  <ul>
    <li><a href="https://kinto-europe.com/collections/mug-cup/products/20754?variant=18332156493882">Nice mug</a></li>
    <li>Hasami porcelain coffee dripper, unglazed</li>
    <li>Bread lame</li>
    <li>Bread banneton</li>
  </ul>
</div>
<div class='section'>
  <h3 class="text-xl font-bold">📙 Books</h3>
  <p>
    I use a platform called <a href="https://xigxag.co.uk/gifting/?country_code=GB">XigXag</a> for audiobooks instead of Audible, which I'd recommend. They do easy gift cards. <br><br>
    Here is my full ‘To Read’ list, in no particular order:
  </p>
  <ScrollArea class="h-[400px] w-[500px] self-center bg-slate-800 bg-opacity-50 my-2 px-4 rounded-2xl overflow-auto">
    <Table.Root>
      <Table.Caption>Hello!</Table.Caption>
      <Table.Header>
        <Table.Row>
        <Table.Head> Title</Table.Head>
        <Table.Head> Author</Table.Head>
      </Table.Row>
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
</div>
<div  class='section'>
  <h3 class="text-xl font-bold">🤷 Misc</h3>
  <ul>
    <li>A new phone case? Phone is a OnePlus 6T, so may be harder for an old model.</li>
    <li>Record player repaired <span class="highlight">(The hinge on the lid is broken, I have no idea who could fix it or how much)</span></li>
    <li>Mossy Earth subscription. <span class="highlight">(Basically a charity subscription for a year)</span></li>
    <li>Nice coffee beans. Caffeinated or not.</li>
  </ul>
</div>
<div  class='section'>
  <h3 class="text-xl font-bold">🎻 Vinyl</h3>
  <p>You can find what albums I'm after on my <a href="https://www.discogs.com/wantlist?user=JCGracie">Discogs account</a>! You can buy from trusted sellers direct on the site.</p>      
</div>
<div  class='section'>
  <h3 class="text-xl font-bold">🥼 Clothes</h3>
  <ul>
    <li>I'm looking to get a lightweight waterproof jacket. Something for daily wear or light hiking.</li>
    <li><a href="https://uskees.com/products/3003-yellow-button-workshirt?variant=31257971359884">Uskees #3003 buttoned workshirt - Yellow</a></li>
    <li><a href="https://labomono.com/">LaboMono Coats/Jackets</a></li>       
</div>

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
    <ul>
      <li>I'm looking to get a lightweight waterproof jacket. Something for daily wear or light hiking.</li>
      <li><a href="https://uskees.com/products/3003-yellow-button-workshirt?variant=31257971359884">Uskees #3003 buttoned workshirt - Yellow</a></li>
      <li><a href="https://labomono.com/">LaboMono Coats/Jackets</a></li>
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
  .section {
    margin-bottom: 2rem;
    display: flex;
    position: relative;
    flex-direction: column;
    h3{
      width: 100%;
      text-align: start;
    }
    p, ul {
      width: 100%;
    }
    &::after {
      content: '';
      display: block;
      width: 110%;
      margin-left: -5%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.5);
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
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
    //text-decoration: underline;
    //text-decoration-color: yellow;
    overflow: hidden;
    font-size: 0.9rem;
    border-radius: 1rem;
    opacity: 0.5;
    padding: 0.5rem;
  }
</style>