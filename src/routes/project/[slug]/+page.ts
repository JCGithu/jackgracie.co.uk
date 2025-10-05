import { loadProject } from '$lib/utils/projects.js';
export const prerender = true;

export async function load({ params }) {
  let projectSlug: string = params.slug.split('/').pop() || '';

  const project = await loadProject(projectSlug);

  return {
    project
  };
};