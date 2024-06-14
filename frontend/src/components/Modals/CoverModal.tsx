import CoverForm from '../Containers/Forms/CoverForm'
import Avatar from '../UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../UI/Modal'
import DeleteModal from './DeleteModal'
import { useUserContext } from '../../contexts/contextHooks'
import { CameraIcon, PencilIcon } from '@heroicons/react/24/solid'
import useSuccess from '../../hooks/useSuccess'
import { useDeleteMyCover } from '../../services/queries'
import { addCoverImage } from '../../utils/variables'
import useLoadImage from '../../hooks/useLoadImage'

const CoverModal = () => {
	const { isPending: isCoverPending, isSuccess: isCoverSuccess, mutate: deleteCover, reset: resetCover } = useDeleteMyCover()
	const { user: loggedUser, removeCover } = useUserContext()
	const isImageLoaded = useLoadImage(addCoverImage)
	useSuccess(isCoverPending, isCoverSuccess, resetCover)

	return (
		<Modal>
			<ModalOpen openedModalName='addCoverModal'>
				<Avatar
					role='button'
					avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
					icon={loggedUser.coverURL ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIcon className='h-6 w-6 text-gray' />}
				/>
			</ModalOpen>
			{isImageLoaded && (
				<ModalWindow modalName='addCoverModal' modalWindowStyles='max-w-[850px]'>
					<CoverForm />
				</ModalWindow>
			)}

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
	)
}

export default CoverModal
