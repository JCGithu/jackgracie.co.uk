import type { PageServerLoad } from './$types';
import { loadProject } from '$lib/utils/projects.js';

export const load: PageServerLoad = async ({ params }) => {
  const project = await loadProject(params.slug);

  if (!project) {
    return {
      project: null,
      error: 'Project not found'
    };
  }

  return {
    project
  };
};
