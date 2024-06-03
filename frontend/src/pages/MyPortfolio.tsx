import PortfolioCard from '../components/Containers/PortfolioCard'
import { useDeleteMyAvatar, useDeleteMyCover, useGetMyProjects } from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import Loading from '../components/UI/Loading'
import { useUserContext } from '../contexts/contextHooks'
import { PencilIcon, CameraIcon } from '@heroicons/react/24/outline'
import { CameraIcon as CameraIconSolid } from '@heroicons/react/24/solid'
import CoverForm from '../components/Containers/Forms/CoverForm'
import Avatar from '../components/UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../components/UI/Modal'
import { defaultCover } from '../utils/variables'
import { useState } from 'react'
import DeleteModal from '../components/Modals/DeleteModal'
import AvatarForm from '../components/Containers/Forms/AvatarForm'

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
							<Avatar
								avatarStyles='h-40 w-40 absolute -mt-20 z-50 hover:shadow-md transition-shadow duration-300'
								role='button'
								imageUrl=''
								icon={<CameraIcon className='h-20 w-20' />}
							/>
						</ModalOpen>
						<ModalWindow modalName='addAvatarModal' modalWindowStyles='max-w-[500px]'>
							<AvatarForm />
						</ModalWindow>
						<ModalWindow modalName='deleteAvatarModal' modalWindowStyles='max-w-[500px]'>
							<DeleteModal
								title='Delete Avatar'
								content='Are you sure? Having a profile image is essential for others to recognize you.'
								isLoading={isAvatarPending}
								openModalName='addAvatarModal'
								onDelete={() => deleteAvatar()}
							/>
						</ModalWindow>
					</Modal>
				</>
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
