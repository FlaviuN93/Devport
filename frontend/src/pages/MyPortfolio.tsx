import PortfolioCard from '../components/Containers/PortfolioCard'
import MyPortfolioForm from '../components/Containers/MyPortfolioForm'
import { useGetMyPortfolio } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'

const MyPortfolio = () => {
	const { data: user, isLoading } = useGetMyPortfolio()
	if (isLoading) return <Loading />

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<MyPortfolioForm user={user} />
			</div>
			<PortfolioCard user={user} />
			{user?.projects?.map((project) => (
				<ProjectCard
					key={project.id}
					projectId={project.id}
					demoURL={project.demoURL}
					description={project.description}
					imageURL={project.imageURL}
					repositoryURL={project.repositoryURL}
					technologies={project.technologies}
					title={project.name}
					cardState='edit'
				/>
			))}
		</section>
	)
}
export default MyPortfolio
