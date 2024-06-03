import PortfolioCard from '../components/Containers/PortfolioCard'
import MyPortfolioForm from '../components/Containers/Forms/MyPortfolioForm'
import { useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import { useUserContext } from '../contexts/contextHooks'

const MyPortfolio = () => {
	const { data: projects, isLoading } = useGetMyProjects()
	const { user: loggedUser } = useUserContext()
	if (isLoading) return <Loading />

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<MyPortfolioForm />
			</div>
			<PortfolioCard user={loggedUser} />
			{projects?.map((project) => (
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
