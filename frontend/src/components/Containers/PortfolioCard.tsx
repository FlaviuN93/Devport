import { FC, ReactNode } from 'react'
import { EnvelopeIcon, PencilIcon } from '@heroicons/react/24/solid'
import LinkedinIcon from '../../assets/linkedin.svg?react'
import { Link } from 'react-router-dom'
import { aboutMeDefault } from '../../utils/variables'
import Button from '../UI/Button'
import ProjectCard from './ProjectCard'
import { useUserContext } from '../../contexts/contextHooks'
import { Project } from '../../services/types'

const PortfolioCard: FC<{ projects: Project[] | undefined; clipBoardBtn?: ReactNode }> = ({ projects, clipBoardBtn }) => {
	const { user: loggedUser } = useUserContext()

	return (
		<>
			{clipBoardBtn && (
				<div className='flex justify-between items-center'>
					<h2 className='text-gray font-medium'>Profile</h2>
					<div className='iconAnimation'>
						<Link to={'/app/profile-settings'}>
							<PencilIcon className='text-gray' />
						</Link>
					</div>
				</div>
			)}
			<div className='flex w-full justify-between'>
				<div>
					<h3 className='font-semibold'>{loggedUser?.fullName || 'Full Name'}</h3>
					<h6 className='font-medium'>{loggedUser?.jobTitle || 'Job Title'}</h6>
				</div>
			</div>

			<div className='flex gap-4'>
				<Link to={`mailto:${loggedUser?.email || 'example.test@gmail.com'}`} target='_blank'>
					<Button
						icon={<EnvelopeIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText='Contact'
						buttonStyles='text-gray transition-shadow duration-250 hover:shadow-md active:shadow-sm'
					/>
				</Link>

				<Link to={loggedUser?.linkedin || 'https://linkedin.com'} target='_blank'>
					<Button
						icon={<LinkedinIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText='Linkedin'
						buttonStyles='text-gray transition-shadow duration-250 hover:shadow-md active:shadow-sm'
					/>
				</Link>
				{clipBoardBtn}
			</div>
			<div>
				<h4 className='text-gray mb-2'>About Me</h4>
				<p className='text-black2 font-medium text-md w-[95%]'>{loggedUser?.bio || aboutMeDefault}</p>
			</div>

			<hr className='border-lightGray my-3' />
			<div className='flex justify-between items-center'>
				<h2 className='text-gray font-medium'>Projects</h2>
				{clipBoardBtn && (
					<div className='iconAnimation'>
						<Link to={'/app/project-settings'}>
							<PencilIcon className='text-gray' />
						</Link>
					</div>
				)}
			</div>
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
					cardState='presentation'
				/>
			))}
		</>
	)
}

export default PortfolioCard
