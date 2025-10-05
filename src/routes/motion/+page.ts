import { loadProjectsBySkill } from '$lib/utils/projects.js';

export async function load() {
  const projects = await loadProjectsBySkill("motion");

  return {
    projects
  };
};