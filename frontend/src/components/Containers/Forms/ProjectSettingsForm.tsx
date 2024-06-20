import { PlusIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useProjectContext } from '../../../contexts/contextHooks'
import { useGetTechnologies, useUpdateMyProject, useCreateMyProject } from '../../../services/queries'
import { IProjectSettings, projectSettingsSchema } from '../../../utils/schemas'
import MultiSelect from '../../Inputs/MultiSelect'
import Button from '../../UI/Button'
import Text from '../../Inputs/Text'

const initialProjectValue = { demoURL: '', description: '', name: '', repositoryURL: '', technologies: [] }
type ProjectKeys = keyof typeof initialProjectValue
const ProjectSettingsForm = () => {
	const {
		handleSubmit,
		register,
		control,
		setValue,
		reset,
		formState: { errors, isDirty },
	} = useForm<IProjectSettings>({
		resolver: zodResolver(projectSettingsSchema),
		defaultValues: initialProjectValue,
	})

	const { isProjectSelected, selectedProject, clearProject } = useProjectContext()
	const { data: technologies } = useGetTechnologies()
	const resetMultiSelect = useRef<() => void>(() => {})

	const { isPending: IsPendingUpdate, mutate: updateMutation } = useUpdateMyProject(selectedProject.id)
	const { isPending: IsPendingCreate, mutate: createMutation } = useCreateMyProject()

	const handleResetForm = useCallback(() => {
		reset(initialProjectValue)
		resetMultiSelect.current()
		clearProject()
	}, [resetMultiSelect, reset, clearProject])

	const updateFormWithSelectedProject = useCallback(() => {
		const projectKeys: ProjectKeys[] = Object.keys(initialProjectValue) as ProjectKeys[]
		projectKeys.forEach((key) => setValue(`${key}`, selectedProject[key], { shouldDirty: true }))
	}, [selectedProject, setValue])

	// Filling the form with values
	useEffect(() => {
		if (isProjectSelected) updateFormWithSelectedProject()
	}, [updateFormWithSelectedProject, isProjectSelected])

	const projectData: SubmitHandler<IProjectSettings> = (data) => {
		if (isProjectSelected) updateMutation(data, { onSuccess: handleResetForm })
		else createMutation(data, { onSuccess: handleResetForm })
	}

	return (
		<form onSubmit={handleSubmit(projectData)} className='formSettingsContainer'>
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
					buttonStyles='text-black3 bg-light dark:text-light dark:bg-light3'
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
