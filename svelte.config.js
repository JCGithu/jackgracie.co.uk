import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import redirects from './src/lib/redirects.ts';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex(mdsvexOptions)
	],
	vitePlugin: {
		inspector: true,
	},

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*',
				'/notionclock',
				...Object.keys(redirects)
			],
			handleHttpError: 'warn',
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
