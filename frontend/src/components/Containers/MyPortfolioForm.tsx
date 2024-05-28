import styles from './MyPortfolioForm.module.css'
import { CameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { CameraIcon as CameraIconSolid } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import UploadIcon from '../../assets/upload.svg?react'
import { convertToFormData } from '../../utils/functions'
import { IPortfolio, portfolioSchema } from '../../utils/schemas'
import Avatar from '../UI/Avatar'
import { Divider } from '../UI/Dropdown'
import { Modal, ModalClose, ModalOpen, ModalWindow } from '../UI/Modal'
import File from '../Inputs/File'
import { useEffect } from 'react'
import Button from '../UI/Button'
import Slider from '../Inputs/Slider'

const MyPortfolioForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IPortfolio>({ resolver: zodResolver(portfolioSchema), defaultValues: { coverFile: null, avatarFile: null } })
	const coverFile = getValues().coverFile && !errors.coverFile ? URL.createObjectURL(getValues().coverFile as File) : null
	const isFileValid = !!coverFile

	useEffect(() => {
		console.log(coverFile, errors, isFileValid)
	}, [coverFile, errors, isFileValid])

	const portfolioImagesHandler: SubmitHandler<IPortfolio> = (data) => {
		const formData = Object.assign(data, { coverURL: null, avatarURL: null })
		const portfolioData = convertToFormData(formData)
	}

	return (
		<form onSubmit={handleSubmit(portfolioImagesHandler)}>
			<div className={styles.coverContainer}>
				<img
					className={styles.coverImage}
					src={'https://liakrqgjvgqicvzrakra.supabase.co/storage/v1/object/public/user-covers/defaultBackground.jpg'}
					alt=''
				/>
				<Modal>
					<ModalOpen openedModalName='addCoverModal'>
						<Avatar
							role='button'
							avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
							icon={<CameraIconSolid className='h-6 w-6 text-gray' />}
						/>
					</ModalOpen>

					<ModalWindow modalName='addCoverModal' showCloseIcon={true} modalWindowStyles='max-w-[600px]'>
						<h2>Add cover photo</h2>
						<Divider />
						<div className='flex justify-center'>
							<img
								src='https://liakrqgjvgqicvzrakra.supabase.co/storage/v1/object/public/user-covers/35634.jpg'
								className='w-full mobile:w-3/4 sm:w-2/3'
								alt='Cover'
							/>
						</div>
						<p className='text-center mb-4 text-lg font-medium'>Showcase your personality, interests, values or notable milestones </p>
						<p className='text-center text-sm font-light'>
							A good cover photo should give your next employeer a good idea of who you are so
							<span className='font-medium'> pick wisely.</span>
						</p>
						<Divider />
						<div className='flex flex-col w-full gap-4 mobile:flex-row mobile:justify-end'>
							<ModalOpen openedModalName='editCoverModal' isInputValid={isFileValid}>
								<File
									buttonText='Upload'
									icon={<UploadIcon className='mr-1.5' />}
									name='coverFile'
									register={register}
									fileStyles='shadow-none border-[1px]'
									error={errors.coverFile?.message}
									onFileUpload={(selectedFile) => {
										setValue('coverFile', selectedFile, { shouldValidate: true })
									}}
								/>
							</ModalOpen>
						</div>
					</ModalWindow>

					<ModalWindow modalName='editCoverModal' showCloseIcon={true}>
						<h2>Edit Cover Photo</h2>
						<Divider />
						<div>Lets see what to add here</div>
						<Divider />
						<div>
							<Slider min={1} max={3} step={0.1} startValue={1} label='Zoom' onChange={(value) => console.log(value, 'slider')} />
							<Slider min={-45} max={45} step={1} startValue={0} label='Rotate' onChange={(value) => console.log(value)} />
						</div>
						<Divider />
						<div className='flex flex-col w-full gap-4 mobile:flex-row mobile:justify-end'>
							<ModalClose>
								<Button buttonStyles='' buttonText='Delete Photo' type='button' />
							</ModalClose>
							<div className='flex flex-col w-full gap-4 mobile:flex-row mobile:justify-end'>
								<File
									buttonText='Change Photo'
									name='coverFile'
									register={register}
									fileStyles='shadow-none border-[1px]'
									error={errors.coverFile?.message}
									onFileUpload={(selectedFile) => {
										setValue('coverFile', selectedFile, { shouldValidate: true })
									}}
								/>
								<ModalClose>
									<Button
										icon={<CheckCircleIcon className='h-5 w-5' />}
										iconPos='left'
										buttonText='Apply'
										variant='primary'
										// isLoading={pendingUpdate}
										type='submit'
									/>
								</ModalClose>
							</div>
						</div>
					</ModalWindow>
				</Modal>
				{/* <File
            name='coverFile'
            register={register}
            fileContainerStyles='absolute top-2 right-4'
            fileStyles='border-none h-10 w-10 rounded-full'
            error={errors.coverFile?.message}
            icon={
                <Avatar
                    role='button'
                    avatarStyles='h-10 w-10 border-none bg-white'
                    icon={<CameraIconSolid className='h-6 w-6 text-gray' />}
                />
            }
            onFileUpload={(selectedFile) => {
                setValue('coverFile', selectedFile, { shouldValidate: true })
            }}
        /> */}
			</div>
			<File
				name='avatarFile'
				register={register}
				fileContainerStyles='-mt-20 absolute z-50'
				fileStyles='rounded-full h-40 w-40'
				error={errors.avatarFile?.message}
				icon={
					<Avatar
						avatarStyles='h-40 w-40 hover:shadow-md transition-shadow duration-300'
						role='button'
						imageUrl=''
						icon={<CameraIcon className='h-20 w-20' />}
					/>
				}
				onFileUpload={(selectedFile) => {
					setValue('avatarFile', selectedFile, { shouldValidate: true })
				}}
			/>
		</form>
	)
}

export default MyPortfolioForm
