import { useParams } from 'react-router-dom'
import PortfolioCard from '../components/Containers/PortfolioCard'
import { useGetUserAndProjects } from '../services/queries'
import { defaultCover } from '../utils/variables'
import Avatar from '../components/UI/Avatar'
import { CameraIcon } from '@heroicons/react/24/outline'

const PublicPortfolio = () => {
	const param = useParams()
	const { userId = '' } = param
	const { data: user } = useGetUserAndProjects(userId)

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<img src={user?.coverURL || defaultCover} alt='CoverImage' className='bg-cover max-w-[800px] w-full h-[200px] rounded-t-lg mt-8' />
				<Avatar
					avatarStyles='h-40 w-40 absolute -mt-20 z-50 shadow-md'
					imageUrl={user?.avatarURL ? user.avatarURL : ''}
					icon={!user?.avatarURL && <CameraIcon className='h-20 w-20' />}
				/>
			</div>
			<PortfolioCard projects={user?.projects} />
		</section>
	)
}

export default PublicPortfolio
