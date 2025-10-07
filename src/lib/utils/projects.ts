import { error } from '@sveltejs/kit';
import type { Project, Skill } from './types';
import { ProjectMetadata } from './types';
import { validateOrThrow } from './validation';
import { render } from 'svelte/server';
export const prerender = true;

let skillData: Record<string, Skill> = {
  editing: {
    name: "Editing",
    slug: "editing",
    accent: "#379937",
    description: "Projects I've produced, shot, or edited. Details are included in the individual project cards.",
    banner: [
      {
        url: "/images/editing/videoBanner.jpg",
        alt: "Video Banner",
      },
    ],
    projects: [],
  },
  capture: {
    name: "Game Capture",
    slug: "capture",
    accent: "#bf85f6",
    description: "Modern, responsive web design and development.",
    banner: [
      {
        url: "/images/development/Desk.png",
        alt: "Web Design Banner",
      },
    ],
    projects: [],
  },
  motion: {
    name: "Motion Graphics",
    slug: "motion",
    accent: "#ebc170",
    description: "Dynamic animations and motion graphics that bring ideas to life.",
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
    accent: "#bf85f6",
    description: "Modern, responsive web design and development.",
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
  const paths = import.meta.glob('/src/content/skills/*/*.md', { eager: true })
  const projects = new Set<Project>();

  for (const path in paths) {
    const file = paths[path]
    const slug = path.split('/').at(-1)!.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const { default: content, metadata } = file as any;
      const validMetadata = validateOrThrow(ProjectMetadata, metadata, slug);
      const project = { ...validMetadata, slug, path, content } satisfies Project;
      projects.add(project);

      for (const skill of project.skill) {
        if (skillData[skill]) {
          skillData[skill].projects.push(project);
          skillData[skill].projects.sort((a, b) => a.order - b.order);
        }
      }
    } else {
      console.error(`${slug} is failing`);
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
