import React from 'react'
import { Outlet } from 'react-router-dom'
import PageNav from '../Containers/PageNav'

const AppLayout = () => {
	return (
		<section className='flex flex-col justify-center items-center gap-10'>
			<PageNav />
			<Outlet />
		</section>
	)
}

export default AppLayout
