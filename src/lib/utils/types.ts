export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  tools: string[];
  client?: string;
  video?: string;
  poster: string;
  image?: string;
  order: number;
  feature: {
    url?: string;
    image?: string;
    embed?: boolean;
    video?: boolean;
  };
  links?: Array<{
    url: string;
    text: string;
  }>;
}

export interface SkillCategory {
  name: string;
  path: string;
  description: string;
  tools: string[];
  banner: Array<{
    url: string;
    alt: string;
  }>;
  posts: Project[];
}
