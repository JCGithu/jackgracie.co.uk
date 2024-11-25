import type { PageServerLoad } from './$types';
const links: Record<string, string> = {
	donate: 'https://ko-fi.com/colloquial',
	//wishlist: 'https://www.notion.so/Wishlist-a262268888bf41bab78cb25c1a338639',
	twitter: "https://twitter.com/JackCGracie",
	//cv:
	editingreel: "https://youtu.be/GM1dctHM1EM",
	github: "https://github.com/JCGithu",
};

export const load: PageServerLoad = async ({ params }) => {
	return { url: links[params.redirect] };
};