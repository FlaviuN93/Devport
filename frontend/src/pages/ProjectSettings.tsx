import Button from '../components/UI/Button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IProjectSettings, projectSettingsSchema } from '../utils/schemas'
import File from '../components/Inputs/File'
import TrashIcon from '../assets/Trash.svg?react'
import TrashIcon2 from '../assets/Trash-1.svg?react'
import UploadIcon from '../assets/upload.svg?react'
import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'
import MultiSelect from '../components/Inputs/MultiSelect'
import { useEffect, useState } from 'react'
// import { useQuery } from '@tanstack/react-query'

const itemsForMultiSelect = ['Java', 'Javascript', 'Python', 'NodeJS', 'React', 'Angular']

const ProjectSettings = () => {
	const {
		handleSubmit,
		register,
		control,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<IProjectSettings>({
		resolver: zodResolver(projectSettingsSchema),
	})

	const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined)
	const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : undefined

	const handleFile = (selectedFile: File) => {
		if (!selectedFile) throw new Error('no file selected')
		setValue('imageFile', selectedFile, { shouldValidate: true })
	}

	useEffect(() => {
		if (!errors.imageFile) setSelectedImage(getValues().imageFile)
	}, [errors.imageFile, getValues])

	const projectData: SubmitHandler<IProjectSettings> = (data) => {
		console.log('handleSubmit data', data)
		console.log(getValues())
	}

	return (
		<section className='settingsContainer'>
			<h4 className='mb-4'>Project Settings</h4>

			<form onSubmit={handleSubmit(projectData)} className='formSettingsContainer'>
				<div className='imageFileContainer'>
					{previewUrl ? (
						<div className='relative'>
							<XMarkIcon
								onClick={() => setSelectedImage(undefined)}
								className='h-6 w-6 absolute top-0 right-2'
							/>
							<img className='w-24' src={previewUrl} />
						</div>
					) : (
						<>
							<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px]' />
							<p className='text-gray text-sm text-center font-medium px-4'>
								Image must be PNG or JPEG - max 2MB
							</p>

							<div className='flex items-center flex-col sm:flex-row gap-3 -mt-1'>
								<File
									buttonText='Upload Image'
									icon={<UploadIcon />}
									name='imageFile'
									register={register}
									onFileUpload={handleFile}
									error={errors.imageFile?.message}
								/>

								<Button
									buttonText='Delete Image'
									buttonStyles='text-danger bg-white border-0'
									iconPos='left'
									variant='transparent'
									icon={<TrashIcon />}
									onClick={() => setSelectedImage(undefined)}
								/>
							</div>
						</>
					)}
				</div>
				<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
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
				</div>
				<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
					<Text
						label='Repository URL'
						register={register}
						name='repositoryUrl'
						placeholder='Enter the repository URL'
						error={errors.repositoryUrl?.message}
					/>

					<Controller
						control={control}
						name='technologies'
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<MultiSelect
								onChange={onChange}
								selectedItem={value}
								error={error?.message}
								items={itemsForMultiSelect}
								placeholder='Select technologies from the list'
								label='Technologies'
							/>
						)}
					/>
				</div>
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
