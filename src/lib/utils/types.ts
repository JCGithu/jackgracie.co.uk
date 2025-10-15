import { z } from 'zod';
import type { Component } from 'svelte';
import type { Picture } from 'vite-imagetools';

const Skill = z.enum(["motion", "editing", "developing", "capture"]);

const ProjectLinks = z.object({
  url: z.string(),
  text: z.string(),
});

const Reel = z.object({
  video: z.string(),
  title: z.string(),
  link: z.string().optional(),
});

const ProjectMetadata = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  accent: z.string(),
  tools: z.array(z.string()),
  skill: z.array(Skill).optional(),
  role: z.string().optional(),
  client: z.string().optional(),
  video: z.string().optional(),
  poster: z.string(),
  posterImage: z.custom<Picture>((val) => val != null).optional(),
  order: z.number(),
  feature: z.string(),
  featureImage: z.custom<Picture>((val) => val != null).optional(),
  hide: z.boolean().optional(),
  links: z.array(ProjectLinks).optional(),
  category: z.string().optional(),
  related: z.array(z.string()).optional(),
});

const FullProject = z.intersection(ProjectMetadata, z.object({
  slug: z.string(),
  path: z.string(),
  content: z.custom<Component>(),
}));

const SkillSchema = z.object({
  name: z.string(),
  slug: z.string(),
  accent: z.string(),
  description: z.string(),
  banner: z.array(z.object({
    url: z.string(),
    alt: z.string(),
    image: z.custom<Picture>((val) => val != null).optional(),
  })),
  reel: Reel.optional(),
  projects: z.array(FullProject),
});

export type ProjectLinks = z.infer<typeof ProjectLinks>;
export type Project = z.infer<typeof FullProject>;
export type Skill = z.infer<typeof SkillSchema>;
export type SkillNames = z.infer<typeof Skill>;
export { ProjectLinks, ProjectMetadata, SkillSchema, FullProject };