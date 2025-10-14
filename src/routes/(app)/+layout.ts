import type { LayoutLoad } from './$types';
import { loadSkills } from '$lib/utils/projects';
import { redirect } from '@sveltejs/kit';
import redirects from '$lib/redirects';

export const prerender = true;

export const load: LayoutLoad = async ({ url }: { url: URL }) => {
  const skills = await loadSkills();
  if (redirects.hasOwnProperty(url.pathname)) {
    return redirect(301, redirects[url.pathname as keyof typeof redirects]);
  }

  return {
    skills,
    url: url.pathname
  };
};
