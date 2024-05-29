import styles from './MyPortfolioForm.module.css'
import { CameraIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CameraIcon as CameraIconSolid } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import UploadIcon from '../../assets/upload.svg?react'
import { convertToFormData } from '../../utils/functions'
import { IPortfolio, portfolioSchema } from '../../utils/schemas'
import Avatar from '../UI/Avatar'
// import AvatarEditor from 'react-avatar-editor'
// import Cropper, { Area, Point } from 'react-easy-crop'
// import Slider from '../Inputs/Slider'
import { Divider } from '../UI/Dropdown'
import { Modal, ModalClose, ModalOpen, ModalWindow } from '../UI/Modal'
import File from '../Inputs/File'
import { FC, useEffect, useState } from 'react'
import Button from '../UI/Button'
import { User } from '../../services/types'
import { useUpdateMyPortfolio } from '../../services/queries'

const MyPortfolioForm: FC<{ user: User | undefined }> = ({ user }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IPortfolio>({ resolver: zodResolver(portfolioSchema), defaultValues: { coverFile: null, avatarFile: null } })
	const coverFile = getValues().coverFile && !errors.coverFile ? URL.createObjectURL(getValues().coverFile as File) : null
	const isFileValid = !!coverFile
	const { isPending, isSuccess, mutate: updateMyPortfolio } = useUpdateMyPortfolio()
	const [coverUrl, setCoverUrl] = useState<string | null>(null)
	const [isCoverSelected, setIsCoverSelected] = useState(true)

	// const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
	// const [zoom, setZoom] = useState(1)

	// const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
	// 	console.log(croppedArea, croppedAreaPixels)
	// }

	// Updating the previewUrl for cover.
	// useEffect(() => {
	// 	if (isCoverSelected && user) setCoverUrl(user.coverURL)
	// 	else setCoverUrl(coverFile)
	// }, [getValues().coverFile, isCoverSelected, user.coverURL])

	// Updating user
	useEffect(() => {
		if (isSuccess && !isPending) setIsCoverSelected(true)
	}, [isSuccess, isPending])

	const portfolioImagesHandler: SubmitHandler<IPortfolio> = (data) => {
		const formData = Object.assign(data, { coverURL: null, avatarURL: null })
		const portfolioData = convertToFormData(formData)
		updateMyPortfolio(portfolioData)
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

					<ModalWindow modalName='editCoverModal'>
						<XMarkIcon
							onClick={() => {
								setIsCoverSelected(false)
								setCoverUrl(null)
							}}
							className='h-6 w-6 absolute top-2 right-2 text-[#666] cursor-pointer'
						/>
						<h2>Edit Cover Photo</h2>
						<Divider />
						{coverUrl && <img src={coverUrl} alt='' />}
						<div className='relative top-0 right-0 left-0 bottom-[200px]'>
							{/* <Cropper
								image={coverFile}
								crop={crop}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
								// disableAutomaticStylesInjection={true}
								setCropSize={}
								setMediaSize={(size:MediaSize)}
								aspect={4 / 1}
							/> */}
						</div>
						<Divider />
						{/* <Slider
							min={1}
							max={3}
							step={0.1}
							value={zoom}
							label='Zoom'
							onSliderChange={(value) => setZoom(value)}
							sliderContainerStyles='w-1/2'
						/> */}
						<Divider />
						<div className='flex flex-col w-full gap-4 lgMobile:flex-row'>
							<div className='flex w-full justify-between'>
								<ModalOpen openedModalName='deletePhoto'>
									<Button buttonStyles='border-0 shadow-none hover:bg-lightGray' buttonText='Delete Photo' type='button' />
								</ModalOpen>

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
							</div>
							<ModalClose>
								<Button
									icon={<CheckCircleIcon className='h-5 w-5' />}
									iconPos='left'
									buttonText='Apply'
									variant='primary'
									isLoading={isPending}
									type='submit'
								/>
							</ModalClose>
						</div>
					</ModalWindow>
					<ModalWindow modalName='deletePhoto' showCloseIcon={true}>
						<div className='flex flex-col gap-3 mt-2'>
							<h4 className=''>Delete Photo</h4>
							<Divider />
							<p>Delete photo? A cover image is a great way to help your profile stand out?</p>
							<div className='flex gap-2 justify-end'>
								<Button variant='primary' buttonText='Yes' onClick={(e) => console.log(e, 'e')} />
								<ModalOpen openedModalName='editCoverModal'>
									<Button variant='transparent' buttonText='No' />
								</ModalOpen>
							</div>
						</div>
					</ModalWindow>
				</Modal>
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
