import type { LayoutLoad } from './$types';
import { loadSkills } from '$lib/utils/projects';

export const prerender = true;

export const load: LayoutLoad = async ({ url }) => {
  const skills = await loadSkills();

  return {
    skills,
    url: url.pathname
  };
};
