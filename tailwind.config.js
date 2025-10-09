/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/app.html'
	],
	theme: {
		extend: {
			colors: {
				'sinon-red': '#fe5f55',
				'sinon-black': 'rgba(38, 45, 54, 1)',
				'sinon-white': '#f7f7ff',
				'notion-black': '#2f3437',
				'pastel1': '#fcb69f',
				'pastel2': '#ffac99',
				'mored': 'rgb(227, 111, 107)',
				'contentbg': 'rgb(47, 35, 49)',
				'mo-subtitle': '#803cff',
				'link': '#d35066',
				'info': '#333',
				'menu': '#031de6',
				'price': '#a678fdb6',
				'bg-magnifier': '#525be1',
				'maroon': '#b14844',
				'yellow': '#fbcb71',
			},
			fontFamily: {
				'serif': ['DM Serif Display', 'serif'],
				'sans': ['Poppins', 'sans-serif'],
				'pimento': ['Pimento', 'serif'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
