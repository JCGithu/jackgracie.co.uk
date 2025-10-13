import type { LayoutLoad } from './(app)/$types';

import { redirect } from '@sveltejs/kit';
import redirects from '$lib/redirects';

export const prerender = true;

export const load: LayoutLoad = async ({ url }: { url: URL }) => {
  if (redirects.hasOwnProperty(url.pathname)) {
    console.log(redirects[url.pathname as keyof typeof redirects]);
    return redirect(301, redirects[url.pathname as keyof typeof redirects]);
  }

  return;
};  
