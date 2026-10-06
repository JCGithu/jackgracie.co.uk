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
  skill: z.partialRecord(Skill, z.number()).optional(),
  role: z.string().optional(),
  year: z.union([z.number().int().min(1990).max(2100), z.string().regex(/^\d{4}\s*[-–]\s*(\d{4}|present)$/i)], {
    error: (issue) => (issue.input === undefined ? "missing — add `year:` to the frontmatter" : 'expected a year like 2024 or a range like "2022–2024"'),
  }),
  client: z.string().optional(),
  video: z.string().optional(),
  poster: z.string(),
  posterImage: z.custom<Picture>((val) => val != null).optional(),
  feature: z.string(),
  featureImage: z.custom<Picture>((val) => val != null).optional(),
  hide: z.boolean().optional(),
  links: z.array(ProjectLinks).optional(),
  category: z.string().optional(),
  related: z.array(z.string()).optional(),
  chapters: z.array(z.string()).optional(),
});

const FullProject = z.intersection(ProjectMetadata, z.object({
  slug: z.string(),
  path: z.string(),
  content: z.custom<Component>(),
}));

const ChapterMetadata = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  accent: z.string().optional(),
  role: z.string().optional(),
  tools: z.array(z.string()).optional(),
  feature: z.string().optional(),
  featureImage: z.custom<Picture>((val) => val != null).optional(),
  poster: z.string().optional(),
  posterImage: z.custom<Picture>((val) => val != null).optional(),
});

const FullChapter = z.intersection(ChapterMetadata, z.object({
  slug: z.string(),
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
    stateMachine: z.string().optional(),
  })),
  reel: Reel.optional(),
  categories: z.array(z.string()),
  projects: z.array(FullProject),
});

export type ProjectLinks = z.infer<typeof ProjectLinks>;
export type Project = z.infer<typeof FullProject>;
export type Chapter = z.infer<typeof FullChapter>;
export type Skill = z.infer<typeof SkillSchema>;
export type SkillNames = z.infer<typeof Skill>;
export { ProjectLinks, ProjectMetadata, SkillSchema, FullProject, FullChapter };