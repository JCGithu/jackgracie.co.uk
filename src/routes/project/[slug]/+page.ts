import { loadProject, loadAllProjects } from '$lib/utils/projects.js';
export const prerender = true;

export async function entries() {
  const projects = await loadAllProjects();
  return projects.map(project => ({ slug: project.slug }));
}

export async function load({ params }) {
  let projectSlug: string = params.slug.split('/').pop() || '';

  const project = await loadProject(projectSlug);

  return {
    project
  };
};