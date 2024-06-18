import { useGetMyProjects } from '../services/queries'
import { useUserContext } from '../contexts/contextHooks'
import { useState, useEffect } from 'react'
import Loading from '../components/UI/Loading'
import { allValuesValid } from '../utils/functions'
import PortfolioCard from '../components/Containers/PortfolioCard'
import ClipBoardButton from '../components/UI/ClipBoardButton'
import CoverModal from '../components/Modals/CoverModal'
import AvatarModal from '../components/Modals/AvatarModal'
import LogoIcon from '../components/UI/LogoIcon'
import Avatar from '../components/UI/Avatar'
import { PhotoIcon } from '@heroicons/react/24/solid'
import PageNav from '../components/Containers/PageNav'
import BackgroundImage from '../components/UI/BackgroundImage'

const MyPortfolio = () => {
	const { user: loggedUser } = useUserContext()
	const { data: projects, isLoading } = useGetMyProjects()
	const [isPortfolioValid, setIsPortfolioValid] = useState(false)

	useEffect(() => {
		if (projects?.length === 0 || !allValuesValid(loggedUser)) setIsPortfolioValid(false)
		else setIsPortfolioValid(true)
	}, [loggedUser, projects])

	if (isLoading) return <Loading />

	return (
		<section className='flex flex-col justify-center min-h-screen items-center gap-10'>
			<PageNav />
			<BackgroundImage />
			<div className='portfolioContainer'>
				<div className='relative mb-20'>
					<div className='flex items-center justify-center relative'>
						{loggedUser?.coverURL ? (
							<img
								src={loggedUser?.coverURL}
								alt='CoverImage'
								className='bg-cover max-w-[800px] w-full h-[200px] bg-light3 dark:bg-darkGray rounded-lg shadow-md'
							/>
						) : (
							<div className='bg-cover bg-light3 dark:bg-darkGray max-w-[800px] w-full h-[200px] rounded-lg'>
								<Avatar
									icon={<PhotoIcon className='h-full w-full text-gray2 dark:text-black3' />}
									avatarStyles='absolute h-16 w-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none rounded-lg'
								/>
							</div>
						)}
						<CoverModal />
					</div>
					<AvatarModal />
				</div>
				<PortfolioCard projects={projects} clipBoardBtn={<ClipBoardButton isPortfolioValid={isPortfolioValid} />} />
				<p className='mt-auto self-center flex items-center mb-8 gap-2'>
					<span className='font-light text-sm dark:text-light'>power by </span>
					<LogoIcon width={85} />
				</p>
			</div>
		</section>
	)
}
export default MyPortfolio
