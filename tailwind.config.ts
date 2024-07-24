import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				o: '#fb923c', // orange 400
				y: '#fcd34d', // amber 300
				grey: '#3f3f46', // zinc 700
				w: '#f3f4f6' // zinc 100
			}
		}
	},
	plugins: []
} as Config;
