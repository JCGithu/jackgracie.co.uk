import type { PageLoad } from './$types';
import { loadSkills } from '$lib/utils/projects';

export const load: PageLoad = async () => {
  const skills = await loadSkills();

  return {
    skills
  };
};
