import Avatar from '../UI/Avatar'
import { Modal, ModalOpen, ModalWindow } from '../UI/Modal'
import DeleteModal from './DeleteModal'
import { useProjectContext } from '../../contexts/contextHooks'
import { CameraIcon, PencilIcon } from '@heroicons/react/24/solid'
import useSuccess from '../../hooks/useSuccess'
import { useDeleteMyProjectImage } from '../../services/queries'
import ProjectImageForm from '../Containers/Forms/ProjectImageForm'

const ProjectModal = () => {
	const { isPending, isSuccess, mutate: deleteProject, reset } = useDeleteMyProjectImage()
	const { selectedProject } = useProjectContext()
	useSuccess(isPending, isSuccess, reset)

	return (
		//bg-color-3
		<Modal>
			<ModalOpen openedModalName='addProjectModal'>
				<Avatar
					role='button'
					avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
					icon={selectedProject.imageURL ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIcon className='h-6 w-6 text-gray' />}
				/>
			</ModalOpen>

			<ModalWindow modalName='addProjectModal' modalWindowStyles='max-w-[850px]'>
				<ProjectImageForm />
			</ModalWindow>

			<ModalWindow modalName='deleteProject' modalWindowStyles='max-w-[500px]'>
				<DeleteModal
					title='Delete Project'
					content='Are you sure you want to delete your project photo?'
					openModalName='addProjectModal'
					isLoading={isPending}
					isSuccess={isSuccess}
					onDelete={() => deleteProject()}
				/>
			</ModalWindow>
		</Modal>
	)
}

export default ProjectModal
