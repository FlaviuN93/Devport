import { CheckIcon } from '@heroicons/react/24/solid'
import styles from './AvatarForm.module.css'
import Button from '../../UI/Button'
import { Divider } from '../../UI/Dropdown'
import { ModalOpen } from '../../UI/Modal'
import { useEffect, useState } from 'react'
import { useModalContext, useUserContext } from '../../../contexts/contextHooks'
import { avatarSchema } from '../../../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateMyAvatar } from '../../../services/queries'
import Cropper, { Area, Point } from 'react-easy-crop'
import Slider from '../../Inputs/Slider'
import FileInput from '../../Inputs/FileInput'
import { getCroppedImg } from '../../../utils/functions'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Avatar from '../../UI/Avatar'
import { CONSTANTS } from '../../../utils/variables'
import { BiCloudUpload } from 'react-icons/bi'

const AvatarForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		setError,
		getValues,
	} = useForm<{ avatarFile: File | null }>({
		resolver: zodResolver(avatarSchema),
		defaultValues: { avatarFile: null },
	})

	const { user: loggedUser, setAvatar } = useUserContext()
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
	const [crop, setCrop] = useState<Point>(CONSTANTS.cropPoints)
	const [zoom, setZoom] = useState(CONSTANTS.zoom)
	const [isEmpty, setIsEmpty] = useState(false)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [isImageSelected, setIsImageSelected] = useState(false)
	const { close } = useModalContext()

	const { isPending, isSuccess, data, mutate: updateAvatar } = useUpdateMyAvatar()

	const avatarFile = getValues().avatarFile && !errors.avatarFile ? URL.createObjectURL(getValues().avatarFile as File) : null

	useEffect(() => {
		if (isSuccess && !isPending) {
			setAvatar(data.avatarURL)
			setIsImageSelected(false)
			close()
		}
	}, [data?.avatarURL, isPending, isSuccess, close])

	useEffect(() => {
		if (loggedUser.avatarURL && !isImageSelected) setAvatarUrl(loggedUser.avatarURL)
		if (avatarFile && isImageSelected) setAvatarUrl(avatarFile)
	}, [getValues().avatarFile, loggedUser.avatarURL, isImageSelected])

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)

	const submitAvatarFile: SubmitHandler<{ avatarFile: File | null }> = async (data) => {
		if (!data.avatarFile) {
			setIsEmpty(true)
			return setTimeout(() => {
				setIsEmpty(false)
				close()
			}, 1000)
		}

		const formData = new FormData()
		if (zoom > 1) {
			const croppedFile = await getCroppedImg(avatarUrl, croppedAreaPixels)
			if (!croppedFile) return setError('avatarFile', { message: 'There was an error cropping the image. Please try again.' })
			formData.append('avatarFile', croppedFile)
		} else formData.append('avatarFile', data.avatarFile)

		updateAvatar(formData)
	}
	return (
		<form onSubmit={handleSubmit(submitAvatarFile)}>
			{!avatarUrl ? (
				<>
					<h2 className='dark:text-light text-black3'>Add profile photo</h2>
					<Divider />
					<div className='flex flex-col gap-4'>
						<p className='text-center mb-4 text-lg font-medium dark:text-light3 text-black3'>Choose a profile photo that represents you</p>
						<div className='flex justify-center gap-3'>
							<Avatar
								avatarStyles='h-32 w-32 shadow-lg'
								imageUrl='https://liakrqgjvgqicvzrakra.supabase.co/storage/v1/object/public/avatars/defaultAvatar.png'
							/>
							<Avatar
								avatarStyles='h-32 w-32 shadow-lg'
								imageUrl='https://liakrqgjvgqicvzrakra.supabase.co/storage/v1/object/public/avatars/defaultAvatar2.png'
							/>
						</div>
						<p className='text-center text-sm font-light dark:text-light3 text-black3'>
							Make a lasting impression! A professional and friendly headshot is{' '}
							<span className='font-medium dark:text-light text-black'>essential</span> to standing out from the crowd.
						</p>
					</div>
					<Divider />
					<div className='flex flex-col w-full mobile:flex-row mobile:justify-end'>
						<FileInput
							buttonText='Upload'
							icon={<BiCloudUpload className='mr-1.5 h-6 w-6' />}
							name='avatarFile'
							register={register}
							fileStyles='shadow-none border-[1px]'
							error={errors.avatarFile?.message}
							onFileUpload={(selectedFile) => {
								setValue('avatarFile', selectedFile, { shouldValidate: true })
								setIsImageSelected(true)
							}}
						/>
					</div>
				</>
			) : (
				<>
					<h2 className='dark:text-light text-black3'>Edit Profile Photo</h2>
					<Divider />
					<div className={styles.avatarContainer}>
						<Cropper
							image={avatarUrl}
							crop={crop}
							zoom={zoom}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							cropShape='round'
							showGrid={false}
							zoomSpeed={0.375}
							onCropComplete={onCropComplete}
							objectFit='vertical-cover'
							aspect={1 / 1}
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
					<div className='flex flex-col gap-2 lgMobile:flex-row justify-between'>
						<div>
							<ModalOpen openedModalName='deleteAvatarModal'>
								<Button
									buttonStyles='border-1 text-black3 dark:text-light3 hover:bg-lightGray dark:hover:bg-black transition-all duration-300 w-full md:w-auto'
									buttonText='Delete Photo'
									type='button'
								/>
							</ModalOpen>
						</div>

						<div className='flex flex-col gap-2 lgMobile:flex-row'>
							<FileInput
								buttonText='Change Photo'
								name='avatarFile'
								register={register}
								fileStyles=' border-[1px] md:w-auto'
								tooltipPosition='bottom'
								error={errors.avatarFile?.message}
								onFileUpload={(selectedFile) => {
									setValue('avatarFile', selectedFile, { shouldValidate: true })
									setIsImageSelected(true)
								}}
							/>

							<Button
								icon={<CheckIcon className='h-5 w-5' />}
								buttonText='Apply'
								isLoading={isPending}
								disabled={!!errors.avatarFile?.message}
								variant='primary'
								buttonStyles={isEmpty ? 'opacity-75 transition-opacity duration-300' : 'opacity-100'}
								type='submit'
							/>
						</div>
					</div>
				</>
			)}
		</form>
	)
}

export default AvatarForm
