---
title: "Dominion: BioSyn Expansion"
subtitle: "Secondary Trailers"
description: "The biggest DLC yet features an immersive new campaign inspired by Jurassic World Dominion."
accent: "#EC4E34"
tools: ["After Effects", "Premiere"]
role: "Scripted, Edited, Directed, Captured"
poster: "/images/capture/biosyn.png"
---

<script>
  import YouTube from '$lib/components/YouTube.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import TwoColumn from '$lib/components/TwoColumn.svelte';

  const videos = [
    { src: "https://www.youtube.com/watch?v=8N5ZAWEW2JE", title: "Species Field Guide | Quetzalcoatlus" },
    { src: "https://www.youtube.com/watch?v=AJXxjzBw5x0", title: "Species Field Guide | Pyroraptor" },
    { src: "https://www.youtube.com/watch?v=3UCNT7voFJI", title: "Species Field Guide | Therizinosaurus" },
  ];
</script>

<TwoColumn>

<YouTube url="https://www.youtube.com/watch?v=gUrRHlW9Rio" title="Dominion: BioSyn Expansion" />

The first of two large-scale DLCs tied to the release of Jurassic World Dominion. For these I worked on the supplimentary trailers such as the Species Field Guides and the Park Management Guide gameplay trailer.

_Fun fact_: While the scripts were verified by Universal, there's a line from the Park Management Guide that is directly contradicted in the film. So I'm glad to have written a lore inconsistency for a major franchise.

</TwoColumn>

> The biggest DLC yet for Jurassic World Evolution 2 features an immersive new campaign inspired by the events from Jurassic World Dominion.

<!-- <YouTube url="https://www.youtube.com/watch?v=8N5ZAWEW2JE" /> -->
<!-- <YouTube url="https://www.youtube.com/watch?v=AJXxjzBw5x0" />
<YouTube url="https://www.youtube.com/watch?v=3UCNT7voFJI" /> -->

<Gallery {videos} size=350 accent="#EC4E34" />
