import { FC } from 'react'
import { useModalContext } from '../../contexts/contextHooks'
import Button from '../UI/Button'
import { Divider } from '../UI/Dropdown'
import { ModalOpen } from '../UI/Modal'
import useSuccess from '../../hooks/useSuccess'

interface IDeleteModal {
	title: string
	content: string
	onDelete: () => void
	isLoading: boolean
	isSuccess?: boolean
	openModalName?: string
}

const DeleteModal: FC<IDeleteModal> = ({ content, isLoading, isSuccess = false, onDelete, title, openModalName = '' }) => {
	const { close } = useModalContext()
	useSuccess(isLoading, isSuccess, close)

	return (
		<div className='flex flex-col mt-2'>
			<h4>{title}</h4>
			<Divider />
			<p className='text-center md:text-start'>{content}</p>
			<div className='flex gap-2.5 w-full mt-4 md:justify-end'>
				<Button
					buttonText='Yes'
					buttonStyles='bg-danger text-white w-full md:w-auto'
					iconStyles='border-lightGray border-t-white'
					isLoading={isLoading}
					onClick={() => onDelete()}
				/>
				<ModalOpen openedModalName={openModalName}>
					<Button variant='transparent' buttonStyles='w-full md:w-auto' buttonText='No' onClick={() => close()} />
				</ModalOpen>
			</div>
		</div>
	)
}

export default DeleteModal
