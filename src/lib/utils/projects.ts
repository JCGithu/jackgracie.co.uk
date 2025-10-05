import type { Project, Skill } from './types';
import { error } from '@sveltejs/kit';


let skillData: Record<string, Skill> = {
  editing: {
    name: "Editing",
    slug: "editing",
    accent: "purple",
    description: "Projects I've produced, shot, or edited. Details are included in the individual project cards.",
    tools: ["Adobe Premiere", "After Effects", "Adobe Audition", "Ableton Live"],
    banner: [
      {
        url: "/images/editing/videoBanner.jpg",
        alt: "Video Banner",
      },
    ],
    projects: [],
  },
  motion: {
    name: "Motion Graphics",
    slug: "motion",
    accent: "#ebc170",
    description: "Dynamic animations and motion graphics that bring ideas to life.",
    tools: ["After Effects", "Cinema 4D", "Adobe Premiere", "Blender"],
    banner: [
      {
        url: "/images/motion/motion_foreground.png",
        alt: "Motion Graphics Banner",
      },
      {
        url: "/images/motion/motion_background.png",
        alt: "Motion Graphics Banner",
      },
    ],
    projects: [],
  },
  development: {
    name: "Development",
    slug: "development",
    accent: "blue",
    description: "Modern, responsive web design and development.",
    tools: ["HTML/CSS", "JavaScript", "React", "Svelte", "Tailwind CSS"],
    banner: [
      {
        url: "/images/development/Desk.png",
        alt: "Web Design Banner",
      },
    ],
    projects: [],
  },
}


export async function loadProjectsAndSkills() {
  let projects = new Set<Project>();

  const paths = import.meta.glob('/src/content/skills/*/*.md', { eager: true })

  for (const path in paths) {
    const splitPath = path.split('/');
    const folderName = splitPath[splitPath.length - 2];
    const file = paths[path]
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const { default: content, metadata } = await import(path);
      const project = { ...metadata, slug, path, content } satisfies Project
      projects.add(project);
      if (folderName && skillData[folderName]) {
        skillData[folderName].projects.push(project);
      }
    }
  }

  return {
    projects: Array.from(projects),
    skills: skillData
  }
}

export async function loadAllProjects(): Promise<Project[]> {
  const { projects } = await loadProjectsAndSkills();
  return projects;
}

export async function loadSkills(): Promise<Record<string, Skill>> {
  const { skills } = await loadProjectsAndSkills();
  return skills;
}

export async function loadSkill(skill: string): Promise<Skill> {
  const { skills } = await loadProjectsAndSkills();
  if (!skills[skill]) {
    error(404, 'Skill not found');
  }
  return skills[skill];
}

export async function loadProjectsBySkill(skill: string): Promise<Project[]> {
  const { skills } = await loadProjectsAndSkills();
  if (!skills[skill]) {
    error(404, 'Skill not found');
  }
  return skills[skill].projects;
}

export async function loadProject(slug: string): Promise<Project> {
  const { projects } = await loadProjectsAndSkills();
  const project = projects.find(project => project.slug === slug);

  if (!project) {
    error(404, 'Project not found');
  }

  return project;
}
