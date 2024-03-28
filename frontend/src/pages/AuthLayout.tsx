import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'
import useMediaQuery from '../hooks/useMediaQuery'
import LoginImage from '../components/UI/LoginImage'

const AuthLayout = () => {
	const isLaptop = useMediaQuery('(min-width:1024px)')

	return (
		<section className={styles.authContainer}>
			{isLaptop && (
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
