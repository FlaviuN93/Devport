import { useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import ProjectSettingsForm from '../components/Containers/Forms/ProjectSettingsForm'

const ProjectSettings = () => {
	const { data: projects, isLoading } = useGetMyProjects()
	if (isLoading) return <Loading />
	return (
		<section className='settingsContainer'>
			<h2 className='mb-6 dark:text-light'>Project Settings</h2>
			<ProjectSettingsForm />

			<div className='flex flex-col gap-4 mt-4'>
				{projects &&
					projects.map((project) => {
						return (
							<ProjectCard
								key={project.id}
								projectId={project.id}
								demoURL={project.demoURL}
								description={project.description}
								repositoryURL={project.repositoryURL}
								technologies={project.technologies}
								title={project.name}
								cardState='edit'
								imageURL={project.imageURL}
							/>
						)
					})}
			</div>
		</section>
	)
}

export default ProjectSettings
