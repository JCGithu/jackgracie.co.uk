import type { Project, SkillCategory } from './types';

// Load all markdown files from a directory
async function loadMarkdownFiles<T>(
  path: string,
  transform: (file: any, slug: string) => T
): Promise<T[]> {
  const modules = import.meta.glob('/src/content/**/*.md', { eager: true });
  const files: T[] = [];

  for (const filePath in modules) {
    if (filePath.startsWith(path)) {
      const module = modules[filePath] as any;
      const slug = filePath.split('/').pop()?.replace('.md', '') || '';

      if (module.metadata) {
        files.push(transform(module, slug));
      }
    }
  }

  return files;
}

// Load projects by category
export async function loadProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await loadMarkdownFiles<Project>(`/src/content/${category}`, (file, slug) => ({
    slug,
    title: file.metadata.title || slug,
    subtitle: file.metadata.subtitle || '',
    description: file.metadata.description || '',
    category: category as 'motion' | 'video' | 'webdesign',
    accent: file.metadata.accent || '#ffffff',
    tools: file.metadata.tools || [],
    client: file.metadata.client,
    video: file.metadata.video,
    poster: file.metadata.poster || '',
    image: file.metadata.image,
    order: file.metadata.order || 999,
    feature: {
      url: file.metadata.feature?.url,
      image: file.metadata.feature?.image,
      embed: file.metadata.feature?.embed || false,
      video: file.metadata.feature?.video || false,
    },
    links: file.metadata.links || [],
  }));

  // Sort projects by order field
  return projects.sort((a, b) => a.order - b.order);
}

// Re-export functions from the new shared module
export { loadAllProjects, loadProject, loadProjectsBySkill } from './projects.js';

// Load skill categories with their projects
export async function loadSkillCategories(): Promise<SkillCategory[]> {
  const { skills } = await import('./projects.js').then(m => m.loadProjectsAndSkills());

  return [
    {
      name: 'Motion Graphics',
      path: '/motion',
      description: 'Dynamic animations and motion graphics that bring ideas to life.',
      tools: ['After Effects', 'Cinema 4D', 'Adobe Premiere', 'Blender'],
      banner: [
        {
          url: '/images/motion-banner.jpg',
          alt: 'Motion Graphics Banner'
        }
      ],
      posts: skills.motion || []
    },
    {
      name: 'Video',
      path: '/video',
      description: 'Professional video editing and post-production services.',
      tools: ['Adobe Premiere', 'Final Cut Pro', 'DaVinci Resolve', 'After Effects'],
      banner: [
        {
          url: '/images/video-banner.jpg',
          alt: 'Video Production Banner'
        }
      ],
      posts: skills.video || []
    },
    {
      name: 'Web Design',
      path: '/webdesign',
      description: 'Modern, responsive web design and development.',
      tools: ['HTML/CSS', 'JavaScript', 'React', 'Svelte', 'Tailwind CSS'],
      banner: [
        {
          url: '/images/webdesign-banner.jpg',
          alt: 'Web Design Banner'
        }
      ],
      posts: skills.webdesign || []
    }
  ];
}
