import type { LayoutLoad } from './(app)/$types';

import { redirect } from '@sveltejs/kit';
import redirects from '$lib/redirects';

export const prerender = true;

export const load: LayoutLoad = async ({ url }: { url: URL }) => {
  if (redirects.hasOwnProperty(url.pathname)) {
    let searchSplit = url.href.split('?');
    const targetUrl = redirects[url.pathname as keyof typeof redirects];
    const finalUrl = searchSplit[1] ? `${targetUrl}?${searchSplit[1]}` : targetUrl;
    return redirect(301, finalUrl);
  }

  return;
};
