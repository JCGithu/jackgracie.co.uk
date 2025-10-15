---
title: Arid Pack
subtitle: "DLC Trailers"
description: "Discover the miraculous wildlife of the world’s dunes, deserts and dusty plains by welcoming eight incredible new species to your zoo"
skill: ["capture"]
category: Planet Zoo
accent: "#e1ad77"
role: "Shot, Edited"
order: 1
tools: ["After Effects", "Premiere"]
feature: "https://www.youtube.com/watch?v=c2cY0NoVMC8"
poster: "/images/capture/arid.png"
---

<script>
  import YouTube from '$lib/components/YouTube.svelte';
  import Gallery from '$lib/components/Gallery.svelte';

  let images = [{
    "src": "/images/capture/porcupine.png", "alt": "Porcupines"
  }, {
    "src": "/images/capture/capturereel.png", "alt": "Capture Reel"
  }]
</script>

A very tight schedule for this pack, and a real challenge given the maximalist nature of Planet Zoo (decorations everywhere!) versus the minimalist environment of the desert. The species for this pack were also much smaller than usual — making it much harder to get quality shots without showcasing low-fidelity textures. I did manage to incorporate some camera moves developed on [JWE2](/project/jwe2) that would later feed into the Oceania pack, such as the whip pan in the Dama Gazelle enclosure.

> Discover the miraculous wildlife of the world’s dunes, deserts and dusty plains by welcoming eight incredible new species to your zoo.

<YouTube url="https://www.youtube.com/watch?v=YsYsKv67usE" />

<Gallery {images} size=350 accent="#e1ad77"/>
