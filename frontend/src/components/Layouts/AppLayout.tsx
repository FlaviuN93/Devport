import React from 'react'
import { Outlet } from 'react-router-dom'
import PageNav from '../Containers/PageNav'

const AppLayout = () => {
	return (
		<section className='flex flex-col justify-center items-center h-full w-full'>
			<PageNav />
			<Outlet />
		</section>
	)
}

export default AppLayout
