<script lang="ts">
  import { loadSkillCategories } from "$lib/utils/content.js";
  import { goto } from "$app/navigation";
  import type { SkillCategory } from "$lib/utils/types.js";

  let skillCategories: SkillCategory[] = [];

  // Load skill categories on mount
  loadSkillCategories().then((categories) => {
    skillCategories = categories;
  });
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
