import { useGetMyProjects } from '../services/queries'
import { useUserContext } from '../contexts/contextHooks'
import { defaultCover } from '../utils/variables'
import { useState, useEffect } from 'react'
import Loading from '../components/UI/Loading'
import { allValuesValid } from '../utils/functions'
import PortfolioCard from '../components/Containers/PortfolioCard'
import ClipBoardButton from '../components/UI/ClipBoardButton'
import CoverModal from '../components/Modals/CoverModal'
import AvatarModal from '../components/Modals/AvatarModal'

const MyPortfolio = () => {
	const { user: loggedUser } = useUserContext()
	const { data: projects, isLoading } = useGetMyProjects()
	const [isPortfolioValid, setIsPortfolioValid] = useState(false)

	useEffect(() => {
		if (!projects || !allValuesValid(loggedUser)) setIsPortfolioValid(false)
		else setIsPortfolioValid(true)
	}, [loggedUser, projects])

	if (isLoading) return <Loading />

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<div className='flex items-center justify-center relative'>
					<img
						className='bg-cover max-w-[800px] w-full h-[200px]'
						src={loggedUser.coverURL ? loggedUser.coverURL : defaultCover}
						alt='Cover Image'
					/>
					<CoverModal />
				</div>
				<AvatarModal />
			</div>
			<PortfolioCard projects={projects} clipBoardBtn={<ClipBoardButton isPortfolioValid={isPortfolioValid} />} />
		</section>
	)
}
export default MyPortfolio
