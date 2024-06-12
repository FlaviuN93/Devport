import { useDarkModeContext } from '../../contexts/contextHooks'

const BackgroundImage = () => {
	const { themeMode } = useDarkModeContext()
	return (
		<svg className='absolute top-0 left-0 w-full h-full -z-10' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect width='100%' height='100%' fill='url(#full-width-gradient)' />
			<defs>
				<linearGradient id='full-width-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
					<stop offset='0%' stopColor={themeMode === 'dark' ? '#39242B' : '#FEE5EE'}></stop>
					<stop offset='100%' stopColor={themeMode === 'dark' ? '#292B6C' : '#6F72E3'}></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}

export default BackgroundImage
