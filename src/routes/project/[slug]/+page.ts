import { loadProject, loadAllProjects } from '$lib/utils/projects.js';
import type { Project } from '$lib/utils/types.js';
export const prerender = true;

export async function entries() {
  const projects = await loadAllProjects();
  return projects.map(project => ({ slug: project.slug }));
}

export async function load({ params }) {
  let projectSlug: string = params.slug.split('/').pop() || '';

  const project = await loadProject(projectSlug);
  let relatedProjects: Project[] = [];
  if (project.related) {
    relatedProjects = await Promise.all(project.related.map(async (related) => await loadProject(related)));
  }

  return {
    project,
    relatedProjects
  };
};