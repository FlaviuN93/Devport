import { CONSTANTS, addProjectImage } from '../../utils/variables'
import Button from '../UI/Button'
import { Divider } from '../UI/Dropdown'
import { useState } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Cropper, { Area, Point } from 'react-easy-crop'
import Slider from '../Inputs/Slider'
import FileInput from '../Inputs/FileInput'
import { getCroppedImg } from '../../utils/functions'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { BiCloudUpload } from 'react-icons/bi'
import { useModalContext } from '../../contexts/contextHooks'

interface ProjectImageProps<T extends FieldValues> {
	name: Path<T>
	register: UseFormRegister<T>
	onFileUpload: (selectedFile: File) => void
	onFileError: (errorMessage: string) => void
	imageUrl: string
	setUrl: (imageUrl: string) => void
	errorMessage?: string
}

const ProjectImage = <T extends FieldValues>({
	name,
	register,
	errorMessage,
	imageUrl,
	onFileUpload,
	setUrl,
	onFileError,
}: ProjectImageProps<T>) => {
	const { close } = useModalContext()

	const [crop, setCrop] = useState<Point>(CONSTANTS.cropPoints)
	const [isLoading, setIsLoading] = useState(false)
	const [zoom, setZoom] = useState(CONSTANTS.zoom)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const isDisabled = !!errorMessage

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)

	const handleFileCrop = async () => {
		setIsLoading(true)

		if (imageUrl.startsWith('blob:')) {
			const file = await getCroppedImg(imageUrl, croppedAreaPixels)
			if (!file) return onFileError('There was an error cropping the image. Please try a different image.')
			onFileUpload(file.croppedFile)
			setUrl(file.croppedUrl)
		}

		setIsLoading(false)
		close()
	}

	return (
		<>
			{!imageUrl ? (
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
							name={name}
							register={register}
							fileStyles='shadow-none border-[1px]'
							error={errorMessage}
							onFileUpload={(selectedFile) => onFileUpload(selectedFile)}
						/>
					</div>
				</>
			) : (
				<>
					<h2 className='dark:text-light3 text-black3'>Edit Project Photo</h2>
					<Divider />
					<div className='w-[325px] mobile:w-[350px] h-56 relative lgMobile:w-[400px] lgMobile:h-60 md:w-[450px] md:h-64 tablet:w-[500px] tablet:h-72'>
						<Cropper
							image={imageUrl}
							crop={crop}
							zoom={zoom}
							onCropChange={setCrop}
							showGrid={false}
							onZoomChange={setZoom}
							zoomSpeed={0.375}
							onCropComplete={onCropComplete}
							objectFit='contain'
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

					<div className='w-full flex flex-col gap-2 justify-between lgMobile:flex-row'>
						<FileInput
							buttonText='Change Photo'
							name={name}
							register={register}
							fileStyles='shadow-none border-[1px] '
							tooltipPosition='bottom'
							error={errorMessage}
							onFileUpload={(selectedFile) => onFileUpload(selectedFile)}
						/>

						<Button
							buttonText='Add Photo'
							buttonStyles={`${isLoading ? 'opacity-75 duration-300 transition-opacity' : 'opacity-100'}`}
							onClick={handleFileCrop}
							disabled={isDisabled}
							variant='primary'
							type='submit'
						/>
					</div>
				</>
			)}
		</>
	)
}

export default ProjectImage
