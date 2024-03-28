/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				gray: '#677489',
				darkBlue: '#20293a',
				violet: '#6466e9',
				light2: '#e3e8ef',
				lightGray: '#cbcdd1',
			},
		},
	},
	plugins: [],
}
