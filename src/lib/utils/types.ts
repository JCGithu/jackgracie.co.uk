import { z } from 'zod';
import type { Component } from 'svelte';

const ProjectLinks = z.object({
  url: z.string(),
  text: z.string(),
});

const ProjectMetadata = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  accent: z.string(),
  tools: z.array(z.string()),
  skill: z.array(z.string()).min(1, "At least one skill is required"),
  client: z.string().optional(),
  video: z.string().optional(),
  poster: z.string(),
  order: z.number(),
  feature: z.string(),
  links: z.array(ProjectLinks).optional(),
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
  })),
  projects: z.array(FullProject),
});

export type ProjectLinks = z.infer<typeof ProjectLinks>;
export type Project = z.infer<typeof FullProject>;
export type Skill = z.infer<typeof SkillSchema>;
export { ProjectLinks, ProjectMetadata, SkillSchema, FullProject };
