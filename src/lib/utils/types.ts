import type { Component } from 'svelte';

export interface ProjectLinks {
  url: string;
  text: string;
}

export interface ProjectFeature {
  url?: string;
  image?: string;
  embed?: boolean;
  video?: boolean;
  youtube?: boolean;
}

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
  content: Component;
  order: number;
  path: string;
  feature: ProjectFeature;
  links?: ProjectLinks[];
}

export interface Skill {
  name: string;
  slug: string;
  accent: string;
  description: string;
  banner: Array<{
    url: string;
    alt: string;
  }>;
  projects: Project[];
}
