<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Skill } from "$lib/utils/types.js";

  const skillCategories: Skill[] = [
    {
      name: "Motion Graphics",
      path: "/motion",
      description: "Dynamic animations and motion graphics that bring ideas to life.",
      tools: ["After Effects", "Cinema 4D", "Adobe Premiere", "Blender"],
      banner: [
        {
          url: "/images/motion-banner.jpg",
          alt: "Motion Graphics Banner",
        },
      ],
      posts: [],
    },
    {
      name: "Video",
      path: "/video",
      description: "Professional video editing and post-production services.",
      tools: ["Adobe Premiere", "Final Cut Pro", "DaVinci Resolve", "After Effects"],
      banner: [
        {
          url: "/images/video-banner.jpg",
          alt: "Video Production Banner",
        },
      ],
      posts: [],
    },
    {
      name: "Web Design",
      path: "/webdesign",
      description: "Modern, responsive web design and development.",
      tools: ["HTML/CSS", "JavaScript", "React", "Svelte", "Tailwind CSS"],
      banner: [
        {
          url: "/images/webdesign-banner.jpg",
          alt: "Web Design Banner",
        },
      ],
      posts: [],
    },
  ];
</script>

<div class="content_grid">
  {#each skillCategories as category}
    <div class="content_item" role="button" tabindex="0" on:click={() => goto(category.path)} on:keydown={(e) => e.key === "Enter" && goto(category.path)}>
      <div class="content_feature">
        <img src={category.banner[0].url} alt={category.banner[0].alt} />
      </div>
      <div class="content_text">
        <h1>{category.name}</h1>
        <p>{@html category.description}</p>
      </div>
    </div>
  {/each}
</div>
