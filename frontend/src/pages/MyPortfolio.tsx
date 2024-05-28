import { useUserContext } from '../contexts/contextHooks'
import PortfolioCard from '../components/Containers/PortfolioCard'
import MyPortfolioForm from '../components/Containers/MyPortfolioForm'

const MyPortfolio = () => {
	const { user: loggedUser } = useUserContext()

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<MyPortfolioForm />
			</div>

			<PortfolioCard user={loggedUser} />
		</section>
	)
}
export default MyPortfolio
