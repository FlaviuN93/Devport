const HomeImage = () => {
	return (
		<svg className='absolute top-0 left-0 w-full h-full -z-10' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect width='100%' height='100%' fill='url(#full-width-gradient)' />
			<g clipPath='url(#clip-home-2024)' opacity={0.75}>
				<circle cx='100%' cy='85vh' r='90' stroke='white' strokeOpacity={0.5} />
				<circle cx='100%' cy='85vh' r='360' stroke='white' strokeOpacity={0.3} />
				<circle cx='100%' cy='85vh' r='220' stroke='white' strokeOpacity={0.3} />
				<circle cx='100%' cy='85vh' r='540' stroke='white' strokeOpacity={0.3} />
				<circle cx='100%' cy='85vh' r='720' stroke='white' strokeOpacity={0.3} />
			</g>
			<defs>
				<linearGradient id='full-width-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
					<stop offset='0%' stopColor={'#FEE5EE'}></stop>
					<stop offset='100%' stopColor={'#6F72E3'}></stop>
				</linearGradient>
				<clipPath id='clip-home-2024'>
					<rect width='100%' height='100%' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default HomeImage
