import { error } from '@sveltejs/kit';
import type { Chapter, Project, Skill, SkillNames } from './types';
import { FullChapter, FullProject } from './types';
import { validateOrThrow } from './validation';
import { getEnhancedImage, hasEnhancedImage } from './image-imports';
export const prerender = true;

function createSkillData(): Record<string, Skill> {
  return {
    editing: {
      name: "Editing",
      slug: "editing",
      accent: "#25AC7D",
      description: "13 years experience across videography, journalism, social media, and gaming.",
      banner: [
        {
          url: "/images/editing/videoBanner.jpg",
          alt: "Video Banner",
        },
      ],
      projects: [],
      categories: [],
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
      categories: [],
    },
    motion: {
      name: "Motion Graphics",
      slug: "motion",
      accent: "#ebc170",
      description: "My motion graphics work has covered everything from recreating game UIs, to newscast graphics, to short form animations.",
      banner: [
        {
          url: "/rive/colin.riv",
          alt: "Motion Graphics Banner",
          stateMachine: "State Machine 1",
        },
      ],
      reel: {
        video: "https://www.youtube.com/watch?v=ak7QmAedl2k",
        title: "Motion Reel",
      },
      projects: [],
      categories: [],
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
      categories: [],
    },
  }
}

export async function loadProjectsAndSkills() {
  const paths = import.meta.glob('/src/content/skills/*/*.md', { eager: true })
  const projects = new Set<Project>();
  const skillData = createSkillData(); // Create fresh skill data for each call
  const validationErrors: string[] = [];

  Object.values(skillData).forEach(skill => {
    skill.banner.forEach(banner => {
      if (hasEnhancedImage(banner.url)) {
        banner.image = getEnhancedImage(banner.url);
      }
    });
  });

  for (const path in paths) {
    const file = paths[path]
    const slug = path.split('/').at(-1)!.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const { default: content, metadata } = file as any;
      let project = { ...metadata, slug, path, content } satisfies Project;

      if (hasEnhancedImage(project.poster)) {
        project.posterImage = getEnhancedImage(project.poster);
      }
      if (hasEnhancedImage(project.feature)) {
        project.featureImage = getEnhancedImage(project.feature);
      }

      let validProject: Project;
      try {
        validProject = validateOrThrow(FullProject, project, slug);
      } catch (e) {
        validationErrors.push((e as Error).message);
        continue;
      }
      projects.add(validProject);

      for (const skill of Object.keys(validProject.skill ?? {})) {
        skillData[skill]?.projects.push(project);
      }
    } else {
      console.error(`${slug} is failing`);
    }
  }

  // Report every invalid project at once rather than stopping at the first
  if (validationErrors.length) {
    throw new Error(`${validationErrors.length} project(s) failed validation:\n${validationErrors.join('\n')}`);
  }

  for (const [name, skill] of Object.entries(skillData)) {
    const orderOf = (p: Project) => p.skill?.[name as SkillNames] ?? 0;
    skill.projects.sort((a, b) => orderOf(a) - orderOf(b));
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

const chapterFiles = import.meta.glob('/src/content/chapters/*.md', { eager: true });

export function loadChapters(project: Project): Chapter[] {
  return (project.chapters ?? []).map((slug) => {
    const file = chapterFiles[`/src/content/chapters/${slug}.md`] as any;
    if (!file) {
      throw new Error(`${project.slug} lists chapter "${slug}" but src/content/chapters/${slug}.md doesn't exist`);
    }

    const chapter = { ...file.metadata, slug, content: file.default };
    if (chapter.feature && hasEnhancedImage(chapter.feature)) {
      chapter.featureImage = getEnhancedImage(chapter.feature);
    }
    if (chapter.poster && hasEnhancedImage(chapter.poster)) {
      chapter.posterImage = getEnhancedImage(chapter.poster);
    }

    return validateOrThrow(FullChapter, chapter, `${project.slug} chapter ${slug}`);
  });
}

export async function loadProject(slug: string): Promise<Project> {
  const { projects } = await loadProjectsAndSkills();
  const project = projects.find(project => project.slug === slug);

  if (!project) {
    error(404, 'Project not found');
  }

  return project;
}
