import { Outlet } from 'react-router-dom'
import PageNav from '../Containers/PageNav'
import BackgroundImage from '../UI/BackgroundImage'

const AppLayout = () => {
	return (
		<section className='flex flex-col justify-center items-center gap-10'>
			<BackgroundImage />
			<PageNav />
			<Outlet />
		</section>
	)
}

export default AppLayout
