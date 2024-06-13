/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray: '#677489',
				gray2: '#ADB5BD',
				darkBlue: '#20293a',
				darkBlue2: '#111823',
				violet: '#6466e9',
				violet2: '#6F72E3',
				light: '#f8f9fa',
				light2: '#e3e8ef',
				light3: '#ced4da',
				lightGray: '#cbcdd1',
				danger: '#ab1b1b',
				danger2: '#DD524C',
				black: '#212529',
				black2: '#364153',
				black3: '#343A40',
				lightViolet: '#e1e7fd',
				darkViolet: '#443BC4',
				darkViolet2: '#292B6C',
				darkGray: '#495057',
				lightPink: '#FEE5EE',
				darkRed: '#39242B',
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
