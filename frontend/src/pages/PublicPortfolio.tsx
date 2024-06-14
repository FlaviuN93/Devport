import { useParams } from 'react-router-dom'
import PortfolioCard from '../components/Containers/PortfolioCard'
import { useGetUserAndProjects } from '../services/queries'
import { defaultCover } from '../utils/variables'
import Avatar from '../components/UI/Avatar'
import { UserIcon } from '@heroicons/react/24/solid'
import LogoIcon from '../components/UI/LogoIcon'
import BackgroundImage from '../components/UI/BackgroundImage'

const PublicPortfolio = () => {
	const param = useParams()
	const { userId = '' } = param
	const { data: user } = useGetUserAndProjects(userId)

	// Here i have to think if i what style i apply to the portfolio dark mode or light mode?
	return (
		<section className='portfolioContainer'>
			<BackgroundImage />
			<div className='relative mb-20'>
				<img src={user?.coverURL || defaultCover} alt='CoverImage' className='bg-cover max-w-[800px] w-full h-[200px] rounded-lg mt-8' />
				<Avatar
					avatarStyles='h-40 w-40 absolute -mt-20 z-50 bg-light3 dark:bg-darkGray shadow-md'
					imageUrl={user?.avatarURL ? user.avatarURL : ''}
					icon={!user?.avatarURL && <UserIcon className='h-20 w-20' />}
				/>
			</div>
			<PortfolioCard projects={user?.projects} />
			<p className='self-center flex items-center mb-8 mt-2 gap-2'>
				<span className='font-light text-sm'>power by </span>
				<LogoIcon width={75} />
			</p>
		</section>
	)
}

export default PublicPortfolio
