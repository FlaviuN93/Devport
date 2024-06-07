import { useDeleteMyAvatar, useDeleteMyCover, useGetMyProjects } from '../services/queries'
import { useUserContext } from '../contexts/contextHooks'
import { CameraIcon } from '@heroicons/react/24/outline'
import { CameraIcon as CameraIconSolid, PencilIcon } from '@heroicons/react/24/solid'
import CoverForm from '../components/Containers/Forms/CoverForm'
import Avatar from '../components/UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../components/UI/Modal'
import { defaultCover } from '../utils/variables'
import DeleteModal from '../components/Modals/DeleteModal'
import AvatarForm from '../components/Containers/Forms/AvatarForm'
import useSuccess from '../hooks/useSuccess'
import { useState, useEffect } from 'react'
import Loading from '../components/UI/Loading'
import { allValuesValid } from '../utils/functions'
import PortfolioCard from '../components/Containers/PortfolioCard'
import ClipBoardButton from '../components/UI/ClipBoardButton'

const MyPortfolio = () => {
	const { user: loggedUser, removeAvatar, removeCover } = useUserContext()
	const { isPending: isCoverPending, isSuccess: isCoverSuccess, mutate: deleteCover, reset: resetCover } = useDeleteMyCover()
	const { isPending: isAvatarPending, isSuccess: isAvatarSuccess, mutate: deleteAvatar, reset: resetAvatar } = useDeleteMyAvatar()
	useSuccess(isCoverPending, isCoverSuccess, resetCover)
	useSuccess(isAvatarPending, isAvatarSuccess, resetAvatar)
	const avatarUrl = loggedUser.avatarURL ? loggedUser.avatarURL : ''

	const { data: projects, isLoading } = useGetMyProjects()
	const [isPortfolioValid, setIsPortfolioValid] = useState(false)

	useEffect(() => {
		if (!projects || !allValuesValid(loggedUser)) setIsPortfolioValid(false)
		else setIsPortfolioValid(true)
	}, [loggedUser, projects])

	if (isLoading) return <Loading />

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
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
			</div>
			<PortfolioCard projects={projects} clipBoardBtn={<ClipBoardButton isPortfolioValid={isPortfolioValid} />} />
		</section>
	)
}
export default MyPortfolio
