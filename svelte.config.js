import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import redirects from './src/lib/redirects.ts';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md']
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex(mdsvexOptions),
		vitePreprocess(),
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
				// The prerenderer follows redirects and would write the #anchor into a filename,
				// so chapter redirects are left to netlify.toml
				...Object.entries(redirects).filter(([, to]) => !to.includes('#')).map(([from]) => from),
				'/notionclock',
				'/404',
			],
			handleHttpError: 'fail',
			handleUnseenRoutes: 'warn'
		}
	}
};

export default config;
