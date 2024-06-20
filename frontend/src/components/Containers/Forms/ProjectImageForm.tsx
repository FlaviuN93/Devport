import { CheckIcon } from '@heroicons/react/24/solid'
import styles from './ProjectImageForm.module.css'
import { CONSTANTS, addProjectImage } from '../../../utils/variables'
import Button from '../../UI/Button'
import { Divider } from '../../UI/Dropdown'
import { ModalOpen } from '../../UI/Modal'
import { useEffect, useState } from 'react'
import { useModalContext, useProjectContext } from '../../../contexts/contextHooks'
import { projectSchema } from '../../../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import Cropper, { Area, Point } from 'react-easy-crop'
import Slider from '../../Inputs/Slider'
import FileInput from '../../Inputs/FileInput'
import { getCroppedImg } from '../../../utils/functions'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { BiCloudUpload } from 'react-icons/bi'
import { useUpdateMyProjectImage } from '../../../services/queries'

const ProjectImageForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		setError,
		getValues,
	} = useForm<{ projectFile: File | null }>({
		resolver: zodResolver(projectSchema),
		defaultValues: { projectFile: null },
	})

	const { selectedProject, isProjectSelected, clearProject } = useProjectContext()
	const { mutate: updateProjectImage, isPending } = useUpdateMyProjectImage(selectedProject.id.toString())
	const { close } = useModalContext()

	const [projectUrl, setProjectUrl] = useState<string | null>(null)
	const [crop, setCrop] = useState<Point>(CONSTANTS.cropPoints)
	const [zoom, setZoom] = useState(CONSTANTS.zoom)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

	const projectFile = getValues().projectFile && !errors.projectFile ? URL.createObjectURL(getValues().projectFile as File) : null
	const isDisabled = !!errors.projectFile?.message

	useEffect(() => {
		if (selectedProject.imageURL && isProjectSelected) setProjectUrl(selectedProject.imageURL)
		if (projectFile && !isProjectSelected) setProjectUrl(projectFile)
	}, [getValues().projectFile, selectedProject.imageURL, isProjectSelected])

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)

	const submitprojectFile: SubmitHandler<{ projectFile: File | null }> = async (data) => {
		if (!data.projectFile) return setTimeout(() => close(), 1000)

		const formData = new FormData()
		const croppedFile = await getCroppedImg(projectUrl, croppedAreaPixels)
		if (!croppedFile) return setError('projectFile', { message: 'There was an error cropping the image. Please try a different image.' })

		formData.append('projectFile', croppedFile)
		updateProjectImage(formData, {
			onSuccess: () => {
				clearProject()
				close()
			},
		})
	}
	return (
		<form onSubmit={handleSubmit(submitprojectFile)}>
			{!projectUrl ? (
				<>
					<h2 className='dark:text-light text-black3'>Add project photo</h2>
					<Divider />
					<div className='flex justify-center'>
						<img src={addProjectImage[0]} className='w-full mobile:w-3/4 tablet:w-2/3 max-h-[450px] -mt-10' alt='Project' />
					</div>
					<p className='text-center mb-2 text-lg font-medium dark:text-light3 text-black3'>
						Your project photo should be exciting to look at
					</p>
					<p className='text-center text-sm font-light dark:text-light3 text-black3'>
						Make your employers <span className='font-medium dark:text-light text-black'> curious</span> to see what your application is all
						about.
					</p>
					<Divider />
					<div className='flex flex-col w-full mobile:flex-row mobile:justify-end'>
						<FileInput
							buttonText='Upload'
							icon={<BiCloudUpload className='mr-1.5 h-6 w-6' />}
							name='projectFile'
							register={register}
							fileStyles='shadow-none border-[1px]'
							error={errors.projectFile?.message}
							onFileUpload={(selectedFile) => {
								setValue('projectFile', selectedFile, { shouldValidate: true })
							}}
						/>
					</div>
				</>
			) : (
				<>
					<h2 className='dark:text-light3 text-black3'>Edit Project Image</h2>
					<Divider />
					<div className={styles.cropperContainer}>
						<Cropper
							image={projectUrl}
							crop={crop}
							zoom={zoom}
							onCropChange={setCrop}
							showGrid={false}
							onZoomChange={setZoom}
							zoomSpeed={0.375}
							onCropComplete={onCropComplete}
							objectFit='horizontal-cover'
							aspect={1.75 / 1}
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
						<div className='w-full flex flex-col gap-2 justify-end md:flex-row'>
							<FileInput
								buttonText='Change Image'
								name='projectFile'
								register={register}
								fileStyles='shadow-none border-[1px] w-full md:w-auto'
								tooltipPosition='bottom'
								error={errors.projectFile?.message}
								onFileUpload={(selectedFile) => {
									setValue('projectFile', selectedFile, { shouldValidate: true })
								}}
							/>

							<Button
								icon={<CheckIcon className='h-5 w-5' />}
								buttonText='Apply'
								isLoading={isPending}
								disabled={isDisabled}
								variant='primary'
								type='submit'
							/>
						</div>
					</div>
				</>
			)}
		</form>
	)
}

export default ProjectImageForm
