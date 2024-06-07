import LinkedinIcon from '../assets/linkedin.svg?react'
import { useDeleteMyAvatar, useDeleteMyCover, useGetMyProjects, useGetMyUserId } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import { useUserContext } from '../contexts/contextHooks'
import { CameraIcon, ClipboardDocumentIcon, EnvelopeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { CameraIcon as CameraIconSolid, PencilIcon } from '@heroicons/react/24/solid'
import CoverForm from '../components/Containers/Forms/CoverForm'
import Avatar from '../components/UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../components/UI/Modal'
import { aboutMeDefault, defaultCover } from '../utils/variables'
import DeleteModal from '../components/Modals/DeleteModal'
import AvatarForm from '../components/Containers/Forms/AvatarForm'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'
import useSuccess from '../hooks/useSuccess'
import { useEffect, useState } from 'react'
import { allValuesValid } from '../utils/functions'
import Tooltip from '../components/UI/Tooltip'

const MyPortfolio = () => {
	const { data: projects, isLoading } = useGetMyProjects()
	const { data: userId } = useGetMyUserId()
	const { user: loggedUser, removeAvatar, removeCover } = useUserContext()

	const { isPending: isCoverPending, isSuccess: isCoverSuccess, mutate: deleteCover, reset: resetCover } = useDeleteMyCover()
	const { isPending: isAvatarPending, isSuccess: isAvatarSuccess, mutate: deleteAvatar, reset: resetAvatar } = useDeleteMyAvatar()

	const [isPortfolioValid, setIsPortfolioValid] = useState(false)
	const [showTooltip, setShowTooltip] = useState(false)
	const [copyMessage, setCopyMessage] = useState('')
	useSuccess(isCoverPending, isCoverSuccess, resetCover)
	useSuccess(isAvatarPending, isAvatarSuccess, resetAvatar)

	const avatarUrl = loggedUser.avatarURL ? loggedUser.avatarURL : ''
	const publicUrl = `${import.meta.env.VITE_LOCAL_DOMAIN}/my-portfolio/${userId}`

	const copyToClipBoard = async (publicPortfolioUrl: string) => {
		try {
			await navigator.clipboard.writeText(publicPortfolioUrl)
			setCopyMessage('Copied!')
		} catch (err) {
			setCopyMessage('Failed To Copy. Reload the page and try again.')
		}
		setTimeout(() => setCopyMessage(''), 1500)
	}

	useEffect(() => {
		if (!projects || !allValuesValid(loggedUser)) setIsPortfolioValid(false)
		else setIsPortfolioValid(true)
	}, [loggedUser, projects])

	if (isLoading) return <Loading />
	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<>
					<div className='flex items-center justify-center relative'>
						<img
							className='bg-cover max-w-[800px] w-full h-[200px]'
							src={loggedUser.coverURL ? loggedUser.coverURL : defaultCover}
							alt='Cover Image'
						/>
						<Modal>
							<ModalOpen openedModalName='addCoverModal'>
								<Avatar
									role='button'
									avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
									icon={
										loggedUser.coverURL ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIconSolid className='h-6 w-6 text-gray' />
									}
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
									isLoading={isCoverPending}
									isSuccess={isCoverSuccess}
									onDelete={() => {
										removeCover()
										deleteCover()
									}}
								/>
							</ModalWindow>
						</Modal>
					</div>
					<Modal>
						<ModalOpen openedModalName='addAvatarModal'>
							<Avatar
								avatarStyles='h-40 w-40 absolute -mt-20 z-50 shadow-md'
								role='button'
								imageUrl={avatarUrl}
								icon={!loggedUser.avatarURL && <CameraIcon className='h-20 w-20' />}
							/>
						</ModalOpen>
						<ModalWindow modalName='addAvatarModal' modalWindowStyles='max-w-[650px] -mt-20'>
							<AvatarForm />
						</ModalWindow>
						<ModalWindow modalName='deleteAvatarModal' modalWindowStyles='max-w-[500px]'>
							<DeleteModal
								title='Delete Profile Photo'
								content='Are you sure? Having a profile image is essential for others to recognize you. It is the simplest way to make a great first impression.'
								isLoading={isAvatarPending}
								isSuccess={isAvatarSuccess}
								openModalName='addAvatarModal'
								onDelete={() => {
									removeAvatar()
									deleteAvatar()
								}}
							/>
						</ModalWindow>
					</Modal>
				</>
			</div>

			<div className='flex justify-between items-center'>
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
				<div className='flex items-center gap-2'>
					<Button
						icon={<ClipboardDocumentIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText='Share'
						disabled={!isPortfolioValid}
						buttonStyles={`text-gray ${
							isPortfolioValid ? 'transition-shadow duration-250 hover:shadow-md active:shadow-sm' : 'shadow-none'
						}`}
						onClick={() => copyToClipBoard(publicUrl)}
					/>
					{!isPortfolioValid ? (
						<div className='relative w-10 h-10 items-center flex'>
							<InformationCircleIcon
								className='h-5 w-5 text-darkGray opacity-75 cursor-pointer'
								onMouseOver={() => setShowTooltip(true)}
								onMouseOut={() => setShowTooltip(false)}
							/>
							<Tooltip
								content='To share your portfolio link, please complete all profile details and add at least one project.'
								position='right'
								hoverTooltip={showTooltip}
								tooltipStyles='bg-gray'
							/>
						</div>
					) : (
						<span className='font-medium text-gray'>{copyMessage}</span>
					)}
				</div>
			</div>
			<div>
				<h4 className='text-gray mb-2'>About Me</h4>
				<p className='text-black2 font-medium text-md w-[95%]'>{loggedUser?.bio || aboutMeDefault}</p>
			</div>

			<hr className='border-lightGray my-3' />
			<div className='flex justify-between items-center'>
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
					cardState='presentation'
				/>
			))}
		</section>
	)
}
export default MyPortfolio
