/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				'bar-infinite': 'bar-infinite 3s linear infinite',
				'from-top': 'from-top 0.4s ease-in'
			},
			keyframes: {
				'bar-infinite': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'from-top': {
					'0%': { opacity: '0', transform: 'translateY(-15px)' },
					'100%': { opacity: '1', transform: 'translateY(0%)' }
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/line-clamp')
	]
}
