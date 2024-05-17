import { motion } from 'framer-motion'
import Button from '../components/UI/Button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IProjectSettings, projectSettingsSchema } from '../utils/schemas'
import File from '../components/Inputs/File'
import TrashIcon2 from '../assets/Trash-1.svg?react'
import UploadIcon from '../assets/upload.svg?react'
import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'
import MultiSelect from '../components/Inputs/MultiSelect'
import {
	useCreateMyProject,
	useGetMyProjects,
	useGetTechnologies,
	useUpdateMyProject,
} from '../services/queries'
import ProjectCard from '../components/Containers/ProjectCard'
import { useProjectContext } from '../contexts/contextHooks'
import Loading from '../components/UI/Loading'
import { useEffect, useRef, useState } from 'react'
import { convertToFormData } from '../utils/functions'

const ProjectSettings = () => {
	const {
		handleSubmit,
		register,
		control,
		setValue,
		getValues,
		reset,
		formState: { errors, isDirty },
	} = useForm<IProjectSettings>({
		resolver: zodResolver(projectSettingsSchema),
		defaultValues: { imageFile: null },
	})

	const { isProjectSelected, selectedProject, resetImageUrl, disableProjectEdit } = useProjectContext()
	const { data: technologies } = useGetTechnologies()
	const { data: projects, isLoading } = useGetMyProjects()

	const { isPending: IsPendingUpdate, mutate: updateMutation } = useUpdateMyProject(selectedProject.id)
	const { isPending: IsPendingCreate, mutate: createMutation } = useCreateMyProject()

	const url =
		getValues().imageFile && !errors.imageFile ? URL.createObjectURL(getValues().imageFile as File) : null

	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const resetMultiSelect = useRef<() => void>(() => {})

	const motionVariants = {
		hidden: { display: 'none', opacity: 0 },
		visible: { display: 'flex', opacity: 1 },
	}

	const handleResetForm = () => {
		reset({
			imageFile: null,
			demoURL: '',
			description: '',
			name: '',
			repositoryURL: '',
			technologies: [],
		})
		resetMultiSelect.current()
		resetImageUrl()
		disableProjectEdit()
	}

	// This UseEffect requires specific dependencies to sync correctly both with edit mode state and creation state for previewUrl functionality
	useEffect(() => {
		if (selectedProject.imageFile) setPreviewUrl(selectedProject.imageFile)
		else setPreviewUrl(url)
	}, [selectedProject.imageFile, getValues().imageFile])

	useEffect(() => {
		if (isProjectSelected) {
			reset({
				imageFile: null,
				demoURL: selectedProject.demoURL,
				description: selectedProject.description,
				name: selectedProject.name,
				repositoryURL: selectedProject.repositoryURL,
				technologies: selectedProject.technologies,
			})
		}
	}, [isProjectSelected, selectedProject, reset])

	const projectData: SubmitHandler<IProjectSettings> = (data) => {
		const projectFormData = convertToFormData(data)
		if (isProjectSelected) return updateMutation(projectFormData)
		createMutation(projectFormData)
	}

	return (
		<section className='settingsContainer'>
			<h4 className='mb-4'>Project Settings</h4>

			<form onSubmit={handleSubmit(projectData)} className='formSettingsContainer'>
				<motion.div
					initial='hidden'
					animate={previewUrl ? 'visible' : 'hidden'}
					variants={motionVariants}
					transition={{ duration: 0.5 }}
					className='relative justify-center bg-light2 py-4 rounded-lg'
				>
					{previewUrl && (
						<>
							<XMarkIcon
								onClick={() => {
									setPreviewUrl(null)
									resetImageUrl()
								}}
								className='h-6 w-6 absolute top-2 right-2 text-black cursor-pointer'
							/>
							<img src={previewUrl} className='object-cover h-[195px] aspect-video' />
						</>
					)}
				</motion.div>

				<motion.div
					initial='hidden'
					animate={!previewUrl ? 'visible' : 'hidden'}
					variants={motionVariants}
					transition={{ duration: 0.5 }}
					className='imageFileContainer'
				>
					<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px]' />
					<p className='text-gray text-sm text-center font-medium px-4'>
						Image must be PNG, JPEG, JPG, WEBP - max 2MB
					</p>

					<File
						buttonText='Upload Project Image'
						icon={<UploadIcon />}
						name='imageFile'
						register={register}
						onFileUpload={(selectedFile: File) =>
							setValue('imageFile', selectedFile, { shouldValidate: true })
						}
						error={errors.imageFile?.message}
					/>
				</motion.div>

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
						name='demoURL'
						placeholder='Enter the demo URL'
						error={errors.demoURL?.message}
					/>
				</div>
				<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
					<Text
						label='Repository URL'
						register={register}
						name='repositoryURL'
						placeholder='Enter the repository URL'
						error={errors.repositoryURL?.message}
					/>

					<Controller
						control={control}
						name='technologies'
						render={({ field: { value: selectedItems, onChange } }) => (
							<MultiSelect
								onChange={onChange}
								placeholderValue={selectedItems || []}
								error={errors.technologies?.message}
								items={technologies}
								resetRef={resetMultiSelect}
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
						buttonText='Clear'
						buttonStyles='text-darkBlue bg-light3 border-0'
						icon={<TrashIcon2 className='h-5 w-5' />}
						onClick={handleResetForm}
						iconPos='left'
					/>
					<Button
						icon={<PlusIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText={isProjectSelected ? 'Update' : 'Save'}
						buttonStyles='px-3'
						disabled={!isDirty}
						variant='primary'
						isLoading={isProjectSelected ? IsPendingUpdate : IsPendingCreate}
						type='submit'
					/>
				</div>
			</form>
			<div className='flex flex-col gap-4 mt-4'>
				{isLoading && <Loading />}
				{projects &&
					projects.map((project) => {
						return (
							<ProjectCard
								key={project.id}
								projectId={project.id}
								demoURL={project.demoURL}
								description={project.description}
								repositoryURL={project.repositoryURL}
								technologies={project.technologies}
								title={project.name}
								cardState='edit'
								imageFile={project.imageFile}
							/>
						)
					})}
			</div>
		</section>
	)
}

export default ProjectSettings
