import { CameraIcon as CameraIconSolid, CheckIcon, PencilIcon } from '@heroicons/react/24/solid'
import UploadIcon from '../../../assets/upload.svg?react'
import styles from './CoverModal.module.css'
import { addCoverImage, defaultCover } from '../../../utils/variables'
import Avatar from '../../UI/Avatar'
import Button from '../../UI/Button'
import { Divider } from '../../UI/Dropdown'
import { Modal, ModalOpen, ModalWindow } from '../../UI/Modal'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../../contexts/contextHooks'
import { coverSchema } from '../../../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMyCover } from '../../../services/queries'
import Cropper, { Area, Point } from 'react-easy-crop'
import Slider from '../../Inputs/Slider'
import FileInput from '../../Inputs/FileInput'
import { getCroppedImg } from '../../../utils/functions'

const CoverModal = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		setError,
		getValues,
	} = useForm<{ coverFile: File | null }>({
		resolver: zodResolver(coverSchema),
		defaultValues: { coverFile: null },
	})
	const { user: loggedUser, setCover } = useUserContext()
	const [coverUrl, setCoverUrl] = useState<string | null>(null)
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [isImageSelected, setIsImageSelected] = useState(false)
	// const [rotation, setRotation] = useState(0)
	const { isPending, isSuccess, data, mutate: updateCover } = useUpdateMyCover()
	const [croppedImage, setCroppedImage] = useState<string | null>(null)
	// const { close } = useModalContext()
	// const [file, setFile] = useState<FileInput | null>(null)
	const coverFile = getValues().coverFile && !errors.coverFile ? URL.createObjectURL(getValues().coverFile as File) : null

	const handleCloseModal = () => setIsImageSelected(false)

	useEffect(() => {
		if (isSuccess && !isPending) {
			setCover(data.coverURL)
			setIsImageSelected(false)
		}
	}, [data?.coverURL, isPending, isSuccess])

	useEffect(() => {
		if (loggedUser.coverURL && !isImageSelected) setCoverUrl(loggedUser.coverURL)
		if (coverFile && isImageSelected) setCoverUrl(coverFile)
	}, [getValues().coverFile, loggedUser.coverURL, isImageSelected])

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		console.log(croppedArea, croppedAreaPixels, 'helloFromCroppedArea')
		setCroppedAreaPixels(croppedAreaPixels)
	}

	const showCroppedImage = async () => {
		const data = await getCroppedImg(coverUrl, croppedAreaPixels)
		if (!data) return setError('coverFile', { message: 'There was an error cropping the image. Please try again.' })
		const { croppedFile, croppedUrl } = data
		setCroppedImage(croppedUrl)
	}

	const submitCoverFile: SubmitHandler<{ coverFile: File | null }> = (data) => {
		if (!data.coverFile) return null
		// if (!data.coverFile) {
		// 	// setIsDisabled(true)

		// 	return setTimeout(() => {
		// 		// setIsDisabled(false)
		// 		close()
		// 	}, 1000)
		// }
		const formData = new FormData()
		formData.append('coverFile', data.coverFile)
		updateCover(formData)
	}
	return (
		<Modal>
			<ModalOpen openedModalName='addCoverModal'>
				<Avatar
					role='button'
					avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
					icon={coverUrl ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIconSolid className='h-6 w-6 text-gray' />}
				/>
			</ModalOpen>
			<ModalWindow modalName='addCoverModal' modalWindowStyles='max-w-[850px]' onClose={handleCloseModal}>
				<form onSubmit={handleSubmit(submitCoverFile)}>
					{!coverUrl ? (
						<>
							<h2>Add cover photo</h2>
							<Divider />
							<div className='flex justify-center'>
								<img src={addCoverImage} className='w-full mobile:w-3/4 sm:w-2/3' alt='Cover' />
							</div>
							<p className='text-center mb-4 text-lg font-medium'>Showcase your personality, interests, values or notable milestones </p>
							<p className='text-center text-sm font-light'>
								A good cover photo should give your next employeer a good idea of who you are so
								<span className='font-medium'> pick wisely.</span>
							</p>
							<Divider />
							<div className='flex flex-col w-full mobile:flex-row mobile:justify-end'>
								<FileInput
									buttonText='Upload'
									icon={<UploadIcon className='mr-1.5' />}
									name='coverFile'
									register={register}
									fileStyles='shadow-none border-[1px]'
									error={errors.coverFile?.message}
									onFileUpload={(selectedFile) => {
										setValue('coverFile', selectedFile, { shouldValidate: true })
										setIsImageSelected(true)
									}}
								/>
							</div>
						</>
					) : (
						<>
							<h2>Edit Cover Photo</h2>
							<Divider />
							<div className={styles.cropperContainer}>
								<Cropper
									image={coverUrl}
									crop={crop}
									zoom={zoom}
									onCropChange={setCrop}
									onZoomChange={setZoom}
									// onCropComplete={onCropComplete}
									onCropAreaChange={onCropComplete}
									objectFit='horizontal-cover'
									aspect={4 / 1}
								/>
							</div>
							<Divider />
							<Slider
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								label='Zoom'
								onSliderChange={(value) => setZoom(value)}
								sliderStyles='md:w-1/2 w-full'
							/>

							<Divider />
							<div className='flex flex-col gap-4 lgMobile:flex-row'>
								<div className='md:w-1/2 w-full'>
									<ModalOpen openedModalName='deletePhoto'>
										<Button buttonStyles='border-1 hover:bg-lightGray w-full md:w-auto' buttonText='Delete Photo' type='button' />
									</ModalOpen>
								</div>
								<div className='w-full flex flex-col gap-2 justify-end md:flex-row md:w-1/2'>
									<FileInput
										buttonText='Change Photo'
										name='coverFile'
										register={register}
										fileStyles='shadow-none border-[1px] w-full md:w-auto'
										tooltipPosition='bottom'
										error={errors.coverFile?.message}
										onFileUpload={(selectedFile) => {
											setValue('coverFile', selectedFile, { shouldValidate: true })
											setIsImageSelected(true)
										}}
									/>

									<Button
										icon={<CheckIcon className='h-5 w-5' />}
										buttonText='Apply'
										isLoading={isPending}
										disabled={!!errors.coverFile?.message}
										variant='primary'
										type='submit'
									/>
								</div>
							</div>
						</>
					)}
				</form>
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
	)
}

export default CoverModal
