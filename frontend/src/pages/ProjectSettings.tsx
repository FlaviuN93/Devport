import React, { useEffect, useState } from 'react'
import Button from '../components/UI/Button'
import { PlusIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { projectSettingsSchema } from '../utils/schemas'
import styles from './ProjectSettings.module.css'
import File from '../components/Inputs/File'
import TrashIcon from '../assets/Trash.svg?react'
import UploadIcon from '../assets/upload.svg?react'
import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'

type ProjectData = {
	imageFile: File
	name: string
	demoUrl: string
	repositoryUrl: string
	description: string
	technologies: string
}

const ProjectSettings = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<ProjectData>({
		resolver: zodResolver(projectSettingsSchema),
	})
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	// const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

	const handleProject = () => {}

	const handleFile = (selectedFile: File) => {
		if (!selectedFile) return
		// console.log(selectedFile, 'selectedFile')
		// setValue('imageFile', selectedFile, { shouldValidate: true })
		// console.log(errors.imageFile, 'hello')
		setSelectedImage(selectedFile)
	}

	useEffect(() => {
		console.log(errors.imageFile)
	}, [errors.imageFile])
	const projectData: SubmitHandler<ProjectData> = (data) => {
		console.log('handleSubmit data', data)
	}
	return (
		<section className={styles.projectContainer}>
			<h4 className='my-4'>Project Settings</h4>
			<Button
				icon={<PlusIcon className='h-5 w-5' />}
				buttonText='Add Project'
				variant='secondary'
				buttonStyles='mb-7'
				iconPos='left'
				onClick={handleProject}
			/>
			<form onSubmit={handleSubmit(projectData)} className={styles.formContainer}>
				<div className={styles.imageFileContainer}>
					<img src='' alt='' />
					<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px]' />
					<p className='text-gray text-sm font-medium'>Image must be PNG or JPEG - max 2MB</p>
					<div className='flex items-center gap-3 -mt-1'>
						<File
							buttonText='Upload Image'
							icon={<UploadIcon />}
							register={register}
							name='imageFile'
							onFileUpload={handleFile}
							error={errors.imageFile?.message}
							errorPosition='top'
						/>

						<Button
							buttonText='Delete Image'
							buttonStyles='text-danger border-0'
							iconPos='left'
							icon={<TrashIcon />}
							onClick={() => setSelectedImage(null)}
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
				<Text
					label='Technologies'
					register={register}
					name='technologies'
					placeholder='Enter technologies used'
					error={errors.technologies?.message}
				/>

				<Text
					label='Description'
					register={register}
					name='description'
					placeholder='Enter a short description..'
					error={errors.description?.message}
				/>
			</form>
		</section>
	)
}

export default ProjectSettings
