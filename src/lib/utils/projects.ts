import { error } from '@sveltejs/kit';
import type { Project, Skill } from './types';
import { ProjectMetadata } from './types';
import { validateOrThrow } from './validation';
export const prerender = true;

function createSkillData(): Record<string, Skill> {
  return {
    editing: {
      name: "Editing",
      slug: "editing",
      accent: "#25AC7D",
      description: "I've been editing for 13 years, ever since I downloaded Premiere CS5 and needed to render out my edits to see them. I've edited in several industries: videography, journalism, social media, and gaming. I'm always looking for the next project.",
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
      description: "In my time as a Video Artist at Frontier I captured across multiple titles and engines. Taking my knowledge of editing and in-person videography into the digital world, where the only limit is your software is so fun and freeing. ",
      banner: [
        {
          url: "/images/capture/CamPath_02.png",
          alt: "Web Design Banner",
        },
      ],
      reel: {
        video: "https://www.youtube.com/watch?v=gvzm4KSNp6s",
        title: "Game Capture Reel",
      },
      projects: [],
    },
    motion: {
      name: "Motion Graphics",
      slug: "motion",
      accent: "#ebc170",
      description: "My motion graphics work has covered everything from recreating game UIs, to newscast graphics, to short form animations.",
      banner: [
        {
          url: "/images/motion/motion_combo.png",
          alt: "Motion Graphics Banner",
        },
      ],
      reel: {
        video: "https://www.youtube.com/watch?v=ak7QmAedl2k",
        title: "Motion Reel",
      },
      projects: [],
    },
    developing: {
      name: "Developing",
      slug: "developing",
      accent: "#EC4E34",
      description: "I took up coding in 2020 to create my own tools for video editing. Since then I've expanded to applications, websites, and games.",
      banner: [
        {
          url: "/images/developing/Desk.png",
          alt: "Web Design Banner",
        },
      ],
      projects: [],
    },
  }
}


export async function loadProjectsAndSkills() {
  const paths = import.meta.glob('/src/content/skills/*/*.md', { eager: true })
  const projects = new Set<Project>();
  const skillData = createSkillData(); // Create fresh skill data for each call

  for (const path in paths) {
    const file = paths[path]
    const slug = path.split('/').at(-1)!.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const { default: content, metadata } = file as any;
      const validMetadata = validateOrThrow(ProjectMetadata, metadata, slug);
      const project = { ...validMetadata, slug, path, content } satisfies Project;
      projects.add(project);

      if (project.skill) {
        for (const skill of project.skill) {
          if (skillData[skill]) {
            skillData[skill].projects.push(project);
            skillData[skill].projects.sort((a, b) => a.order - b.order);
          }
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
