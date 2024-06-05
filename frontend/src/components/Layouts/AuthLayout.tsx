import React from 'react'
import { Outlet } from 'react-router-dom'
import useMediaQuery from '../../hooks/useMediaQuery'
import LoginImage from '../UI/LoginImage'

const AuthLayout = () => {
	const isTablet = useMediaQuery('(min-width:768px)')

	return (
		<section className='min-h-screen flex items-center px-4 gap-10 laptop:gap-16 laptop:px-0 justify-center text-center'>
			{isTablet && (
				<LoginImage
					title='A Portfolio Application for Developers'
					content='As a web developer, having a portfolio is essential for showcasing your technical skills and attracting potential clients. 
				A portfolio is a museum of your work, with new tech stacks, case studies, and your work history.'
				/>
			)}
			<Outlet />
		</section>
	)
}

export default AuthLayout
