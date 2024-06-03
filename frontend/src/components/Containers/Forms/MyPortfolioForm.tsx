import styles from './MyPortfolioForm.module.css'
import { CameraIcon, PencilIcon } from '@heroicons/react/24/outline'
import Avatar from '../../UI/Avatar'

import { defaultCover } from '../../../utils/variables'
import CoverModal from '../Modals/CoverModal'
import FileInput from '../../Inputs/FileInput'
import Button from '../../UI/Button'
import { Divider } from '../../UI/Dropdown'
import { Modal, ModalOpen, ModalWindow } from '../../UI/Modal'
import CoverForm from './CoverForm'

const MyPortfolioForm = () => {
	return (
		<>
			<div className={styles.coverContainer}>
				<img className={styles.coverImage} src={defaultCover} alt='' />
				<Modal>
					<ModalOpen openedModalName='addCoverModal'>
						<Avatar
							role='button'
							avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
							icon={coverUrl ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIconSolid className='h-6 w-6 text-gray' />}
						/>
					</ModalOpen>
					<ModalWindow modalName='addCoverModal' modalWindowStyles='max-w-[850px]' onClose={handleCloseModal}>
						<CoverForm />
					</ModalWindow>

					<ModalWindow modalName='deletePhoto'>
						<div className='flex flex-col mt-2'>
							<h4 className=''>Delete Photo</h4>
							<Divider />
							<p>Delete photo? A cover image is a great way to help your profile stand out?</p>
							<div className='flex gap-2 mt-4 justify-end'>
								<Button buttonText='Yes' buttonStyles='bg-danger text-white' onClick={(e) => console.log(e, 'e')} />
								<ModalOpen openedModalName='addCoverModal'>
									<Button variant='transparent' buttonText='No' />
								</ModalOpen>
							</div>
						</div>
					</ModalWindow>
				</Modal>
			</div>
			<FileInput
				name='avatarFile'
				fileContainerStyles='-mt-20 absolute z-50'
				fileStyles='rounded-full h-40 w-40'
				icon={
					<Avatar
						avatarStyles='h-40 w-40 hover:shadow-md transition-shadow duration-300'
						role='button'
						imageUrl=''
						icon={<CameraIcon className='h-20 w-20' />}
					/>
				}
				onFileUpload={(selectedFile) => {}}
			/>
		</>
	)
}

export default MyPortfolioForm
