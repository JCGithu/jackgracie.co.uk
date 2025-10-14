import type { LayoutLoad } from './(app)/$types';

import { redirect } from '@sveltejs/kit';
import redirects from '$lib/redirects';

export const prerender = true;

export const load: LayoutLoad = async ({ url }: { url: URL }) => {
  if (redirects.hasOwnProperty(url.pathname)) {
    const targetUrl = redirects[url.pathname as keyof typeof redirects];
    const finalUrl = url.search ? `${targetUrl}${url.search}` : targetUrl;
    return redirect(301, finalUrl);
  }

  return;
};
