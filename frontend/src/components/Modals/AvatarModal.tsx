import AvatarForm from '../Containers/Forms/AvatarForm'
import Avatar from '../UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../UI/Modal'
import DeleteModal from './DeleteModal'
import { useUserContext } from '../../contexts/contextHooks'
import useSuccess from '../../hooks/useSuccess'
import { useDeleteMyAvatar } from '../../services/queries'
import { UserIcon } from '@heroicons/react/24/solid'
import useLoadImage from '../../hooks/useLoadImage'
import { defaultAvatarImages } from '../../utils/variables'

const AvatarModal = () => {
	const { user: loggedUser, removeAvatar } = useUserContext()
	const { isPending: isAvatarPending, isSuccess: isAvatarSuccess, mutate: deleteAvatar, reset: resetAvatar } = useDeleteMyAvatar()
	const avatarUrl = loggedUser.avatarURL ? loggedUser.avatarURL : ''
	const isImageLoaded = useLoadImage(defaultAvatarImages)
	useSuccess(isAvatarPending, isAvatarSuccess, resetAvatar)

	return (
		<Modal>
			<ModalOpen openedModalName='addAvatarModal'>
				<Avatar
					avatarStyles='h-40 w-40 absolute -mt-20 z-50 bg-light3 dark:bg-darkGray shadow-md'
					role='button'
					imageUrl={avatarUrl}
					showEditIcon={true}
					icon={!loggedUser.avatarURL && <UserIcon className='h-20 w-20 text-gray2 dark:text-black3' />}
				/>
			</ModalOpen>
			{isImageLoaded && (
				<ModalWindow modalName='addAvatarModal' modalWindowStyles='max-w-[650px] -mt-20'>
					<AvatarForm />
				</ModalWindow>
			)}
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
	)
}
export default AvatarModal
