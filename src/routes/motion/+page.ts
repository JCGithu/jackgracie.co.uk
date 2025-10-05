import { loadProjectsBySkill } from '$lib/utils/projects.js';

export async function load() {
  const skill = await loadProjectsBySkill("motion");

  return {
    projects: skill
  };
};