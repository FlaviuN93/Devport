import { useCallback, useEffect, useRef, useState } from 'react'
import { PlusIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useProjectContext } from '../../../contexts/contextHooks'
import { useGetTechnologies, useUpdateMyProject, useCreateMyProject } from '../../../services/queries'
import { convertToFormData } from '../../../utils/functions'
import { IProjectSettings, projectSettingsSchema } from '../../../utils/schemas'
import MultiSelect from '../../Inputs/MultiSelect'
import Avatar from '../../UI/Avatar'
import Button from '../../UI/Button'
import Text from '../../Inputs/Text'
import { Modal, ModalOpen, ModalWindow } from '../../UI/Modal'
import ProjectImageForm from '../ProjectImage'
import { CameraIcon, PencilIcon } from '@heroicons/react/24/solid'

const initialProjectValue = { imageFile: null, demoURL: '', description: '', name: '', repositoryURL: '', technologies: [] }
type ProjectKeys = keyof typeof initialProjectValue
const ProjectSettingsForm = () => {
	const {
		handleSubmit,
		register,
		control,
		setValue,
		getValues,
		reset,
		setError,
		formState: { errors, isDirty },
	} = useForm<IProjectSettings>({
		resolver: zodResolver(projectSettingsSchema),
		defaultValues: initialProjectValue,
	})

	const { isProjectSelected, selectedProject, clearProject } = useProjectContext()
	const { data: technologies } = useGetTechnologies()
	const resetMultiSelect = useRef<() => void>(() => {})

	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const url = getValues().imageFile && !errors.imageFile ? URL.createObjectURL(getValues().imageFile as File) : selectedProject.imageURL

	const { isPending: IsPendingUpdate, mutate: updateMutation } = useUpdateMyProject(selectedProject.id)
	const { isPending: IsPendingCreate, mutate: createMutation } = useCreateMyProject()

	const handleResetForm = useCallback(() => {
		reset(initialProjectValue)
		resetMultiSelect.current()
		setPreviewUrl(null)
		clearProject()
	}, [resetMultiSelect, reset, clearProject])

	const updateFormWithSelectedProject = useCallback(() => {
		const projectKeys: ProjectKeys[] = Object.keys(initialProjectValue) as ProjectKeys[]
		projectKeys.forEach((key) => {
			if (key === 'imageFile') setValue('imageFile', null)
			else setValue(`${key}`, selectedProject[key], { shouldDirty: true })
		})
	}, [selectedProject, setValue])

	// Filling the form with values
	useEffect(() => {
		if (isProjectSelected) {
			updateFormWithSelectedProject()
			setPreviewUrl(selectedProject.imageURL)
		}
	}, [updateFormWithSelectedProject, isProjectSelected, selectedProject.imageURL])

	const submitProject: SubmitHandler<IProjectSettings> = async (data) => {
		const formData = Object.assign(data, { imageURL: null })
		const projectFormData = convertToFormData(formData)
		if (isProjectSelected) updateMutation(projectFormData, { onSuccess: handleResetForm })
		else createMutation(projectFormData, { onSuccess: handleResetForm })
	}

	return (
		<form onSubmit={handleSubmit(submitProject)} className='formSettingsContainer'>
			<div className='imageFileContainer'>
				{previewUrl ? (
					<div className='flex items-center justify-center relative'>
						<img src={previewUrl} alt='ProjectImage' className='bg-cover max-w-[800px] w-full h-[200px]' />
					</div>
				) : (
					<>
						<Avatar icon={<PhotoIcon className='h-9 w-9' />} avatarStyles='h-16 w-16' />
						<p className='text-gray dark:text-light3 text-sm text-center font-semibold px-4'>
							Image must be PNG, JPEG, JPG, WEBP - max 5MB
						</p>
					</>
				)}

				<Modal>
					<ModalOpen openedModalName='addProjectModal'>
						<Avatar
							role='button'
							avatarStyles='h-10 w-10 border-none bg-white absolute top-2 right-4'
							icon={previewUrl ? <PencilIcon className='h-6 w-6 text-gray' /> : <CameraIcon className='h-6 w-6 text-gray' />}
						/>
					</ModalOpen>

					<ModalWindow modalName='addProjectModal' modalWindowStyles='max-w-[850px]'>
						<ProjectImageForm
							register={register}
							name='imageFile'
							onFileUpload={(selectedFile) => setValue('imageFile', selectedFile, { shouldValidate: true })}
							errorMessage={errors.imageFile?.message}
							imageUrl={url}
							setUrl={(imageUrl) => setPreviewUrl(imageUrl)}
							onFileError={(errorMsg) => setError('imageFile', { message: errorMsg })}
						/>
					</ModalWindow>
				</Modal>
			</div>
			<div className='flex flex-col gap-4 lgMobile:flex-row md:gap-10'>
				<Text label='Project Name' register={register} name='name' placeholder='Enter your project name' error={errors.name?.message} />

				<Text label='Demo URL' register={register} name='demoURL' placeholder='Enter the demo URL' error={errors.demoURL?.message} />
			</div>
			<div className='flex flex-col gap-4 lgMobile:flex-row md:gap-10'>
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
			<div className='mb-2 flex flex-col w-full gap-4 mobile:flex-row mobile:justify-end'>
				<Button
					buttonText='Cancel'
					disabled={!isDirty}
					buttonStyles='text-black3 bg-light dark:text-light3 dark:bg-darkGray'
					onClick={handleResetForm}
					iconPos='left'
				/>
				<Button
					icon={<PlusIcon className='h-5 w-5' />}
					iconPos='left'
					buttonText={isProjectSelected ? 'Update' : 'Add'}
					buttonStyles='px-3'
					variant='primary'
					isLoading={isProjectSelected ? IsPendingUpdate : IsPendingCreate}
					type='submit'
				/>
			</div>
		</form>
	)
}

export default ProjectSettingsForm
