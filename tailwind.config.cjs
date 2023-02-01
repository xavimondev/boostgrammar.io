/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				'bar-infinite': 'bar-infinite 3s linear infinite'
			},
			keyframes: {
				'bar-infinite': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/line-clamp')
	]
}
