import { error } from '@sveltejs/kit';
import { z } from 'zod';
import type { Component } from 'svelte';

const WishlistMetadata = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  accent: z.string(),
  order: z.number(),
});

const Wishlist = z.intersection(WishlistMetadata, z.object({
  content: z.custom<Component>(),
}));

type Wishlist = z.infer<typeof Wishlist>;

export const prerender = true;

export async function load() {
  const paths = import.meta.glob('./wishlist.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];

    if (file && typeof file === 'object' && 'metadata' in file) {
      const { default: content, metadata } = file as any;
      const wishlist: Wishlist = { ...metadata, content };
      return {
        wishlist
      };
    }
  }

  error(404, 'Wishlist not found');
};
