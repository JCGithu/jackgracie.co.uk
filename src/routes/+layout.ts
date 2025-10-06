import type { LayoutLoad } from './$types';
import { loadSkills } from '$lib/utils/projects';

export const prerender = true;

export const load: LayoutLoad = async () => {
  const skills = await loadSkills();

  console.log(skills);

  return {
    ...skills
  };
};
