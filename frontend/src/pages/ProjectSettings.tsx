import { useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import ProjectSettingsForm from '../components/Containers/Forms/ProjectSettingsForm'
import { useProjectContext } from '../contexts/contextHooks'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { motionVariants } from '../utils/variables'
import ProjectModal from '../components/Modals/ProjectModal'
import Avatar from '../components/UI/Avatar'
import { PhotoIcon } from '@heroicons/react/24/outline'

const ProjectSettings = () => {
	const { data, isLoading } = useGetMyProjects()
	const { isProjectSelected, selectedProject } = useProjectContext()
	const [projects, setProjects] = useState(data)

	useEffect(() => {
		if (isProjectSelected) setProjects((projectsState) => projectsState?.filter((project) => project.id !== selectedProject.id))
		else setProjects(data)
	}, [data, isProjectSelected, selectedProject.id])

	if (isLoading) return <Loading />

	return (
		<section className='settingsContainer'>
			<h2 className='mb-6 dark:text-light'>{isProjectSelected ? 'Edit Project' : 'Add New Project'}</h2>
			<div className='p-4 bg-light border-[1px] border-b-0 border-lightGray dark:bg-black3 dark:border-darkGray'>
				<div className='imageFileContainer'>
					{selectedProject?.imageURL ? (
						<img
							src={selectedProject?.imageURL}
							alt='ProjectImage'
							className='bg-cover max-w-[800px] w-full h-[200px] bg-light2 dark:bg-darkGray rounded-lg shadow-md'
						/>
					) : (
						<div className='flex flex-col items-center gap-6'>
							<Avatar icon={<PhotoIcon className='h-9 w-9' />} avatarStyles='h-16 w-16' />
							<p className='text-gray dark:text-light3 text-sm text-center font-medium px-4'>
								Image must be PNG, JPEG, JPG, WEBP - max 5MB
							</p>
						</div>
					)}

					<ProjectModal />
				</div>
			</div>

			<ProjectSettingsForm />

			<motion.div
				initial='visible'
				animate={isProjectSelected ? 'hidden' : 'visible'}
				variants={motionVariants}
				transition={{ duration: 0.4 }}
				className='flex flex-col gap-4 mt-4'
			>
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
			</motion.div>
		</section>
	)
}

export default ProjectSettings
