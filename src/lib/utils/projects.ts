import type { Project } from './types';

export async function loadProjectsAndSkills() {
  let projects = new Set<Project>();
  const folders = new Map<string, Project[]>();

  const paths = import.meta.glob('/src/content/skills/*/*.md', { eager: true })

  for (const path in paths) {
    const splitPath = path.split('/');
    const folderName = splitPath[splitPath.length - 2];
    const file = paths[path]
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (folderName && !folders.has(folderName)) folders.set(folderName, [])

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Project, 'slug'>
      const project = { ...metadata, slug } satisfies Project
      projects.add(project);
      if (folderName && folders.get(folderName)) {
        folders.get(folderName)!.push(project);
        folders.get(folderName)!.sort((first, second) =>
          first.order - second.order
        )
      }
    }
  }

  return {
    projects: Array.from(projects),
    skills: Object.fromEntries(folders)
  }
}

export async function loadAllProjects(): Promise<Project[]> {
  const { projects } = await loadProjectsAndSkills();
  return projects;
}

export async function loadSkills(): Promise<Record<string, Project[]>> {
  const { skills } = await loadProjectsAndSkills();
  return skills;
}

export async function loadProjectsBySkill(skill: string): Promise<Project[]> {
  const { skills } = await loadProjectsAndSkills();
  return skills[skill] || [];
}

export async function loadProject(slug: string): Promise<Project | null> {
  const { projects } = await loadProjectsAndSkills();
  return projects.find(project => project.slug === slug) || null;
}
