import React, { useState } from 'react'
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
	} = useForm<ProjectData>({
		resolver: zodResolver(projectSettingsSchema),
	})
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	// const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

	const handleProject = () => {}

	const handleFile = (selectedFile: File) => {
		if (!selectedFile) return
		setSelectedImage(selectedFile)
	}

	const projectData: SubmitHandler<ProjectData> = (data) => {
		console.log('handleSubmit data', data)
	}
	return (
		<section className={styles.projectContainer}>
			<h4>Project Settings</h4>
			<Button
				icon={<PlusIcon />}
				buttonText='Add Project'
				variant='secondary'
				iconPos='left'
				onClick={handleProject}
			/>
			<form onSubmit={handleSubmit(projectData)}>
				<div className='min-w-[560px]'>
					<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px]' />
					<p className='text-gray text-sm'>Image must be PNG or JPEG - max 2MB</p>
					<div>
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
							buttonStyles='text-danger'
							iconPos='left'
							icon={<TrashIcon />}
							onClick={() => setSelectedImage(null)}
						/>
					</div>
				</div>
			</form>
		</section>
	)
}

export default ProjectSettings
