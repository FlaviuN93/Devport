import React, { useEffect } from 'react'
import Button from '../components/UI/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { profileSettingsSchema } from '../utils/schemas'
import styles from './ProjectSettings.module.css'
import File from '../components/Inputs/File'
import TrashIcon from '../assets/Trash.svg?react'
import CheckCircleIcon from '../assets/check circle-1.svg?react'
import UploadIcon from '../assets/upload.svg?react'
import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'

type ProfileData = {
	imageFile: File
	email: string
	name: string
	jobTitle: string
	bio: string
}

const ProjectSettings = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		// setValue,
	} = useForm<ProfileData>({
		resolver: zodResolver(profileSettingsSchema),
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
	const projectData: SubmitHandler<ProfileData> = (data) => {
		console.log('handleSubmit data', data)
	}
	return (
		<section className={styles.projectContainer}>
			<h4 className='mt-2 mb-4'>Profile Settings</h4>
			<form onSubmit={handleSubmit(projectData)} className={styles.formContainer}>
				<div className={styles.imageFileContainer}>
					<img src='' alt='' />
					<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px]' />
					<p className='text-gray text-sm text-center font-medium px-4'>
						Image must be 256px x 256px - max 2MB
					</p>
					<div className='flex items-center flex-col sm:flex-row gap-3 -mt-1'>
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
							buttonStyles='text-danger bg-white border-0'
							iconPos='left'
							variant='transparent'
							icon={<TrashIcon />}
							// onClick={() => setSelectedImage(null)}
						/>
					</div>
				</div>
				<Text
					label='Email'
					register={register}
					name='email'
					placeholder='example@mail.com'
					error={errors.email?.message}
				/>

				<Text
					label='Job Title'
					register={register}
					name='jobTitle'
					placeholder='Enter your job title'
					error={errors.jobTitle?.message}
				/>

				<Text
					label='Name'
					register={register}
					name='name'
					placeholder='Enter your name'
					error={errors.name?.message}
				/>

				<Text
					label='Bio'
					register={register}
					variant='textarea'
					rows={5}
					name='bio'
					placeholder='Enter a short introduction..'
					error={errors.bio?.message}
				/>

				<Button
					icon={<CheckCircleIcon className='h-5 w-5' />}
					iconPos='left'
					buttonText='Save'
					buttonStyles='mb-2 w-full sm:place-self-end sm:w-auto'
					variant='primary'
				/>
			</form>
		</section>
	)
}

export default ProjectSettings
