import { useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import ProjectSettingsForm from '../components/Containers/ProjectSettingsForm'

const ProjectSettings = () => {
	const { data: projects, isLoading } = useGetMyProjects()

	return (
		<section className='settingsContainer'>
			<h4 className='mb-4'>Project Settings</h4>
			<ProjectSettingsForm />

			<div className='flex flex-col gap-4 mt-4'>
				{isLoading && <Loading />}
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
								imageFile={project.imageFile}
							/>
						)
					})}
			</div>
		</section>
	)
}

export default ProjectSettings
