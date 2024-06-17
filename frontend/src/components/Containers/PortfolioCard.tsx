import { FC, ReactNode } from 'react'
import { BiLogoLinkedinSquare } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { aboutMeDefault } from '../../utils/variables'
import Button from '../UI/Button'
import ProjectCard from './ProjectCard'
import { useUserContext } from '../../contexts/contextHooks'
import { Project } from '../../services/types'
import { PencilSquareIcon, PlusIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const PortfolioCard: FC<{ projects: Project[] | undefined; clipBoardBtn?: ReactNode }> = ({ projects, clipBoardBtn }) => {
	const { user: loggedUser } = useUserContext()

	return (
		<>
			<div className='flex justify-between items-center'>
				<div>
					<h3 className='font-semibold text-[2rem] text-black dark:text-light'>{loggedUser?.fullName || 'Full Name'}</h3>
					<h6 className='font-medium text-violet text-xl mt-2'>{loggedUser?.jobTitle || 'Your job description'}</h6>
				</div>
				{clipBoardBtn && (
					<Link to={'/app/profile-settings'}>
						<Button
							buttonText='Edit Profile'
							buttonStyles='bg-darkViolet text-light px-2.5 py-2 w-full text-sm'
							icon={<PencilSquareIcon className='h-5 w-5' />}
							iconPos='right'
						/>
					</Link>
				)}
			</div>

			<div className='flex gap-4'>
				<Link to={`mailto:${loggedUser?.email || 'example.test@gmail.com'}`} target='_blank'>
					<Button
						icon={<EnvelopeIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText='Contact'
						buttonStyles='text-violet bg-light dark:bg-light3 font-semibold transition-shadow duration-250 hover:shadow-md active:shadow-sm'
					/>
				</Link>

				<Link to={loggedUser?.linkedin || 'https://linkedin.com'} target='_blank'>
					<Button
						icon={<BiLogoLinkedinSquare className='h-5 w-5' />}
						iconPos='left'
						buttonText='Linkedin'
						buttonStyles='text-violet bg-light dark:bg-light3 font-semibold transition-shadow duration-250 hover:shadow-md active:shadow-sm'
					/>
				</Link>
				{clipBoardBtn}
			</div>
			<div>
				<h4 className='text-gray dark:text-gray2 mb-2 font-bold tracking-wider'>BIO</h4>
				<p className='text-lg font-medium text-darkGray dark:text-light'>{loggedUser?.bio || aboutMeDefault}</p>
			</div>

			<hr className='text-gray dark:text-light3 my-3' />
			<div className='flex justify-between items-center'>
				<h4 className='text-gray dark:text-gray2 font-bold self-start'>PROJECTS</h4>
				{clipBoardBtn && (
					<Link to={'/app/project-settings'}>
						<Button
							buttonText='Add Project'
							buttonStyles='bg-darkViolet text-light px-2.5 py-2 w-full text-sm'
							icon={<PlusIcon className='h-5 w-5' />}
							iconPos='right'
						/>
					</Link>
				)}
			</div>
			{projects?.length === 0 ? (
				<p className='text-lg font-medium text-darkGray dark:text-light'>You have no project added.</p>
			) : (
				projects?.map((project) => (
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
				))
			)}
		</>
	)
}

export default PortfolioCard
