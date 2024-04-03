import React, { useEffect } from 'react'
import Button from '../components/UI/Button'
import { PlusIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { projectSettingsSchema } from '../utils/schemas'
import File from '../components/Inputs/File'
import TrashIcon from '../assets/Trash.svg?react'
import TrashIcon2 from '../assets/Trash-1.svg?react'
import UploadIcon from '../assets/upload.svg?react'
import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'
import MultiSelect from '../components/Inputs/MultiSelect'

type ProjectData = {
	imageFile: File
	name: string
	demoUrl: string
	repositoryUrl: string
	description: string
	technologies: string
}

const itemsForMultiSelect = ['Java', 'Javascript', 'Python', 'NodeJS', 'React', 'Angular']

const ProjectSettings = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		// setValue,
	} = useForm<ProjectData>({
		resolver: zodResolver(projectSettingsSchema),
		mode: 'onChange',
	})
	// const [selectedImage, setSelectedImage] = useState<File | null>(null)
	// const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

	const handleFile = (selectedFile: File) => {
		if (!selectedFile) return
		// console.log(selectedFile, 'selectedFile')
		// setValue('imageFile', selectedFile, { shouldValidate: true })
		// console.log(errors.imageFile, 'hello')
		// setSelectedImage(selectedFile)
	}

	useEffect(() => {
		console.log(errors.imageFile)
	}, [errors.imageFile])

	const projectData: SubmitHandler<ProjectData> = (data) => {
		console.log('handleSubmit data', data)
	}

	return (
		<section className='settingsContainer'>
			<h4 className='mt-2 mb-4'>Project Settings</h4>
			<form onSubmit={handleSubmit(projectData)} className='formSettingsContainer'>
				<div className='imageFileContainer'>
					<img src='' alt='' />
					<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px]' />
					<p className='text-gray text-sm text-center font-medium px-4'>
						Image must be PNG or JPEG - max 2MB
					</p>
					<div className='flex items-center flex-col sm:flex-row gap-3 -mt-1'>
						<File
							buttonText='Upload Image'
							icon={<UploadIcon />}
							register={register}
							name='imageFile'
							onFileUpload={handleFile}
							error={errors.imageFile?.message}
							tooltipPosition='top'
						/>

						<Button
							buttonText='Delete Image'
							buttonStyles='text-danger bg-white border-0'
							iconPos='left'
							variant='transparent'
							icon={<TrashIcon />}
							// onClick={() => setSelectedImage(null)}
						/>
					</div>
				</div>
				<Text
					label='Project Name'
					register={register}
					name='name'
					placeholder='Enter your project name'
					error={errors.name?.message}
				/>

				<Text
					label='Demo URL'
					register={register}
					name='demoUrl'
					placeholder='Enter the demo URL'
					error={errors.demoUrl?.message}
				/>

				<Text
					label='Repository URL'
					register={register}
					name='repositoryUrl'
					placeholder='Enter the repository URL'
					error={errors.repositoryUrl?.message}
				/>

				<MultiSelect
					register={register}
					name='technologies'
					items={itemsForMultiSelect}
					placeholder='Select maximum 5 technologies from the list'
					limit={5}
					label='Technologies'
				/>

				<Text
					label='Description'
					register={register}
					variant='textarea'
					rows={5}
					name='description'
					placeholder='Enter a short description..'
					error={errors.description?.message}
				/>
				<div className='place-self-end mb-2 flex flex-col w-full gap-4 sm:flex-row sm:w-auto'>
					<Button
						buttonText='Remove'
						buttonStyles='text-darkBlue bg-light3 border-0'
						icon={<TrashIcon2 className='h-5 w-5' />}
						iconPos='left'
					/>
					<Button
						icon={<PlusIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText='Add'
						buttonStyles='px-3'
						variant='primary'
						type='submit'
					/>
				</div>
			</form>
		</section>
	)
}

export default ProjectSettings
