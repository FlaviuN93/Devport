import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import TrashIcon2 from '../../assets/Trash-1.svg?react'
import UploadIcon from '../../assets/upload.svg?react'
import ProjectIcon from '../../assets/project.svg?react'
import { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useProjectContext } from '../../contexts/contextHooks'
import { useGetTechnologies, useUpdateMyProject, useCreateMyProject } from '../../services/queries'
import { convertToFormData } from '../../utils/functions'
import { IProjectSettings, projectSettingsSchema } from '../../utils/schemas'
import { motionVariants } from '../../utils/variables'
import MultiSelect from '../Inputs/MultiSelect'
import Avatar from '../UI/Avatar'
import Button from '../UI/Button'
import File from '../Inputs/File'
import Text from '../Inputs/Text'

const initialProjectValue = { imageFile: null, demoURL: '', description: '', name: '', repositoryURL: '', technologies: [] }

const ProjectSettingsForm = () => {
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
		defaultValues: initialProjectValue,
	})
	const url = getValues().imageFile && !errors.imageFile ? URL.createObjectURL(getValues().imageFile as File) : null

	const { isProjectSelected, selectedProject, resetImageUrl, disableProjectEdit } = useProjectContext()
	const { data: technologies } = useGetTechnologies()
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const resetMultiSelect = useRef<() => void>(() => {})

	const { isPending: IsPendingUpdate, mutate: updateMutation, isSuccess: isUpdateSuccess } = useUpdateMyProject(selectedProject.id)
	const { isPending: IsPendingCreate, mutate: createMutation, isSuccess: isCreateSuccess } = useCreateMyProject()

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

	const handleResetForm = () => {
		reset(initialProjectValue)

		resetImageUrl()
		resetMultiSelect.current()
		disableProjectEdit()
	}

	const projectData: SubmitHandler<IProjectSettings> = (data) => {
		const formData = Object.assign(data, { imageURL: null })
		const projectFormData = convertToFormData(formData)
		if (isProjectSelected) updateMutation(projectFormData)
		else createMutation(projectFormData)

		if (isUpdateSuccess || isCreateSuccess) setTimeout(() => handleResetForm(), 500)
	}

	return (
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
				<p className='text-gray text-sm text-center font-medium px-4'>Image must be PNG, JPEG, JPG, WEBP - max 2MB</p>

				<File
					buttonText='Upload Project Image'
					icon={<UploadIcon />}
					name='imageFile'
					fileStyles='gap-2'
					register={register}
					onFileUpload={(selectedFile: File) => setValue('imageFile', selectedFile, { shouldValidate: true })}
					error={errors.imageFile?.message}
				/>
			</motion.div>

			<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
				<Text label='Project Name' register={register} name='name' placeholder='Enter your project name' error={errors.name?.message} />

				<Text label='Demo URL' register={register} name='demoURL' placeholder='Enter the demo URL' error={errors.demoURL?.message} />
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
	)
}

export default ProjectSettingsForm
