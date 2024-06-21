import { useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import { useProjectContext } from '../contexts/contextHooks'
import { useEffect, useState } from 'react'

import ProjectSettingsForm from '../components/Containers/Forms/ProjectSettingsForm'

const ProjectSettings = () => {
	const { data, isLoading } = useGetMyProjects()
	const { isProjectSelected, selectedProject } = useProjectContext()
	const [projects, setProjects] = useState(data)

	useEffect(() => {
		if (isProjectSelected && selectedProject) {
			setProjects((projectsState) => projectsState?.filter((project) => project.id !== selectedProject.id))
		} else setProjects(data)
	}, [isProjectSelected, selectedProject, data])

	if (isLoading) return <Loading />

	return (
		<section className='settingsContainer'>
			<h2 className='mb-4 dark:text-light'>{isProjectSelected ? 'Edit Project' : 'Add New Project'}</h2>

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
