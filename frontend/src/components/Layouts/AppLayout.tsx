import { Outlet } from 'react-router-dom'
import PageNav from '../Containers/PageNav'

const AppLayout = () => {
	return (
		<section className='flex flex-col gap-10 items-center min-h-screen bg-light dark:bg-black'>
			<PageNav />
			<Outlet />
		</section>
	)
}

export default AppLayout
