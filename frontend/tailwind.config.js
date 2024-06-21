/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray: '#677489',
				gray2: '#ADB5BD',
				violet: '#6466e9',
				light: '#f8f9fa',
				light2: '#e3e8ef',
				light3: '#ced4da',
				lightGray: '#cbcdd1',
				danger: '#ab1b1b',
				danger2: '#DD524C',
				black: '#212529',
				black2: '#364153',
				black3: '#343A40',
				darkViolet: '#443BC4',
				darkGray: '#495057',
			},
			opacity: {
				50: '.50',
			},
		},
		screens: {
			mobile: '420px',
			lgMobile: '480px',
			md: '640px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1280px',
		},
	},
	plugins: [],
}
