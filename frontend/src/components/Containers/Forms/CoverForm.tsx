import { CheckIcon } from '@heroicons/react/24/solid'
import styles from './CoverForm.module.css'
import { CONSTANTS, addCoverImage } from '../../../utils/variables'
import Button from '../../UI/Button'
import { Divider } from '../../UI/Dropdown'
import { ModalOpen } from '../../UI/Modal'
import { useEffect, useState } from 'react'
import { useModalContext, useUserContext } from '../../../contexts/contextHooks'
import { coverSchema } from '../../../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMyCover } from '../../../services/queries'
import Cropper, { Area, Point } from 'react-easy-crop'
import Slider from '../../Inputs/Slider'
import FileInput from '../../Inputs/FileInput'
import { getCroppedImg } from '../../../utils/functions'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { BiCloudUpload } from 'react-icons/bi'

const CoverForm = () => {
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
	const [crop, setCrop] = useState<Point>(CONSTANTS.cropPoints)
	const [zoom, setZoom] = useState(CONSTANTS.zoom)
	const [isEmpty, setIsEmpty] = useState(false)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [isImageSelected, setIsImageSelected] = useState(false)
	const { close } = useModalContext()

	const { isPending, mutate: updateCover } = useUpdateMyCover()

	const coverFile = getValues().coverFile && !errors.coverFile ? URL.createObjectURL(getValues().coverFile as File) : null
	const isDisabled = !!errors.coverFile?.message

	useEffect(() => {
		if (loggedUser.coverURL && !isImageSelected) setCoverUrl(loggedUser.coverURL)
		if (coverFile && isImageSelected) setCoverUrl(coverFile)
	}, [getValues().coverFile, loggedUser.coverURL, isImageSelected])

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)

	const submitCoverFile: SubmitHandler<{ coverFile: File | null }> = async (data) => {
		if (!data.coverFile) {
			setIsEmpty(true)
			return setTimeout(() => {
				setIsEmpty(false)
				close()
			}, 1000)
		}

		const formData = new FormData()
		const croppedFile = await getCroppedImg(coverUrl, croppedAreaPixels)
		if (!croppedFile) return setError('coverFile', { message: 'There was an error cropping the image. Please try a different image.' })
		formData.append('coverFile', croppedFile)

		updateCover(formData, {
			onSuccess: (data) => {
				setCover(data.coverURL)
				setIsImageSelected(false)
				close()
			},
		})
	}
	return (
		<form onSubmit={handleSubmit(submitCoverFile)}>
			{!coverUrl ? (
				<>
					<h2 className='dark:text-light text-black3'>Add cover photo</h2>
					<Divider />
					<div className='flex justify-center mb-2'>
						<img src={addCoverImage[0]} className=' w-full mobile:w-3/4 md:w-2/3' alt='Cover' />
					</div>
					<p className='text-center mb-2 text-lg font-medium dark:text-light3 text-black3'>
						Showcase your personality, interests, values or notable milestones{' '}
					</p>
					<p className='text-center text-sm font-light dark:text-light3 text-black3'>
						A good cover photo should give your next employeer a good idea of who you are so
						<span className='font-medium dark:text-light text-black'> pick wisely.</span>
					</p>
					<Divider />
					<div className='flex flex-col w-full mobile:flex-row mobile:justify-end'>
						<FileInput
							buttonText='Upload'
							icon={<BiCloudUpload className='mr-1.5 h-6 w-6' />}
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
					<h2 className='dark:text-light3 text-black3'>Edit Cover Photo</h2>
					<Divider />
					<div className={styles.cropperContainer}>
						<Cropper
							image={coverUrl}
							crop={crop}
							zoom={zoom}
							onCropChange={setCrop}
							showGrid={false}
							onZoomChange={setZoom}
							zoomSpeed={0.375}
							onCropComplete={onCropComplete}
							objectFit='horizontal-cover'
							aspect={4 / 1}
						/>
					</div>
					<Divider />
					<Slider
						leftIcon={<MinusIcon className='h-7 w-7' />}
						rightIcon={<PlusIcon className='h-7 w-7' />}
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						label='Zoom'
						onSliderChange={(value) => setZoom(value)}
						sliderStyles='md:w-2/5 w-4/5'
					/>

					<Divider />
					<div className='flex flex-col gap-4 lgMobile:flex-row'>
						<div className='md:w-1/2 w-full'>
							<ModalOpen openedModalName='deleteCover'>
								<Button buttonStyles='border-1 text-black3 dark:text-light w-full md:w-auto' buttonText='Delete Photo' type='button' />
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
								disabled={isDisabled}
								variant='primary'
								buttonStyles={isEmpty || isDisabled ? 'opacity-75 transition-opacity duration-300' : 'opacity-100'}
								type='submit'
							/>
						</div>
					</div>
				</>
			)}
		</form>
	)
}

export default CoverForm
