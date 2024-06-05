import LinkedinIcon from '../assets/linkedin.svg?react'
import { useDeleteMyAvatar, useDeleteMyCover, useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import { useUserContext } from '../contexts/contextHooks'
import { CameraIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { CameraIcon as CameraIconSolid, PencilIcon } from '@heroicons/react/24/solid'
import CoverForm from '../components/Containers/Forms/CoverForm'
import Avatar from '../components/UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../components/UI/Modal'
import { aboutMeDefault, defaultCover } from '../utils/variables'
import { useState } from 'react'
import DeleteModal from '../components/Modals/DeleteModal'
import AvatarForm from '../components/Containers/Forms/AvatarForm'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

const MyPortfolio = () => {
	const { data: projects, isLoading } = useGetMyProjects()
	const { user: loggedUser } = useUserContext()
	const { isPending: isCoverPending, mutate: deleteCover } = useDeleteMyCover()
	const { isPending: isAvatarPending, mutate: deleteAvatar } = useDeleteMyAvatar()
	const [coverUrl, setCoverUrl] = useState('')
	if (isLoading) return <Loading />

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<>
					<div className='flex items-center justify-center relative'>
						<img className='bg-cover max-w-[800px] w-full h-[200px]' src={defaultCover} alt='' />
						<Modal>
							<ModalOpen openedModalName='addCoverModal'>
								<Avatar
									role='button'
									avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
									icon={coverUrl ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIconSolid className='h-6 w-6 text-gray' />}
								/>
							</ModalOpen>
							<ModalWindow modalName='addCoverModal' modalWindowStyles='max-w-[850px]'>
								<CoverForm />
							</ModalWindow>

							<ModalWindow modalName='deleteCover' modalWindowStyles='max-w-[500px]'>
								<DeleteModal
									title='Delete Cover'
									content='Are you sure you want to delete your photo? A cover image is a great way to help your profile stand out.'
									openModalName='addCoverModal'
									onDelete={() => deleteCover()}
									isLoading={isCoverPending}
								/>
							</ModalWindow>
						</Modal>
					</div>
					<Modal>
						<ModalOpen openedModalName='addAvatarModal'>
							<Avatar avatarStyles='h-40 w-40 absolute -mt-20 z-50 shadow-md' role='button' icon={<CameraIcon className='h-20 w-20' />} />
						</ModalOpen>
						<ModalWindow modalName='addAvatarModal' modalWindowStyles='max-w-[650px] -mt-20'>
							<AvatarForm />
						</ModalWindow>
						<ModalWindow modalName='deleteAvatarModal' modalWindowStyles='max-w-[500px]'>
							<DeleteModal
								title='Delete Profile Photo'
								content='Are you sure? Having a profile image is essential for others to recognize you. It is the simplest way to make a great first impression.'
								isLoading={isAvatarPending}
								openModalName='addAvatarModal'
								onDelete={() => deleteAvatar()}
							/>
						</ModalWindow>
					</Modal>
				</>
			</div>

			<div className='flex justify-between'>
				<h2 className='text-gray font-medium'>Profile</h2>
				<div className='iconAnimation'>
					<Link to={'/app/profile-settings'}>
						<PencilIcon className='text-gray' />
					</Link>
				</div>
			</div>
			<div className='flex w-full justify-between'>
				<div>
					<h3 className='font-semibold'>{loggedUser?.fullName || 'Full Name'}</h3>
					<h6 className='font-medium'>{loggedUser?.jobTitle || 'Job Title'}</h6>
				</div>
			</div>

			<div className='flex gap-4'>
				<Link to={`mailto:${loggedUser?.email || 'example.test@gmail.com'}`} target='_blank'>
					<Button icon={<EnvelopeIcon className='h-5 w-5' />} iconPos='left' buttonText='Contact' buttonStyles='text-gray' />
				</Link>

				{loggedUser?.linkedin && (
					<Link to={loggedUser?.linkedin || 'https://linkedin.com'} target='_blank'>
						<Button icon={<LinkedinIcon className='h-5 w-5' />} iconPos='left' buttonText='Linkedin' buttonStyles='text-gray' />
					</Link>
				)}
			</div>
			<div>
				<h4 className='text-gray mb-2'>About Me</h4>
				<p className='text-black2 font-medium text-md w-[95%]'>{loggedUser?.bio || aboutMeDefault}</p>
			</div>

			<hr className='border-lightGray my-3' />
			<div className='flex justify-between'>
				<h2 className='text-gray font-medium'>Projects</h2>
				<div className='iconAnimation'>
					<Link to={'/app/project-settings'}>
						<PencilIcon className='text-gray' />
					</Link>
				</div>
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
					cardState='edit'
				/>
			))}
		</section>
	)
}
export default MyPortfolio
