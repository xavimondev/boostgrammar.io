/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				'bar-infinite': 'bar-infinite 3s linear infinite',
				'line-up': 'anim-lineUp 2s ease-out 1'
			},
			keyframes: {
				'bar-infinite': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'anim-lineUp': {
					'0%': { opacity: '0', transform: 'translateY(80%)' },
					'20%': { opacity: '0' },
					'50%': { opacity: '1', transform: 'translateY(0%)' },
					'100%': { opacity: '1', transform: 'translateY(0%)' }
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/line-clamp')
	]
}
