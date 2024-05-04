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
import { useGetTechnologies } from '../services/queries'

const ProjectSettings = () => {
	const {
		handleSubmit,
		register,
		control,
		getValues,
		setValue,
		resetField,
		formState: { errors },
	} = useForm<IProjectSettings>({
		resolver: zodResolver(projectSettingsSchema),
	})

	const { data, error: technologiesError } = useGetTechnologies()

	const motionVariants = {
		hidden: { display: 'none', opacity: 0 },
		visible: { display: 'flex', opacity: 1 },
	}

	const previewUrl =
		getValues().imageFile && !errors.imageFile ? URL.createObjectURL(getValues().imageFile) : null

	const handleFile = (selectedFile: any) => {
		if (!selectedFile) throw new Error('no file selected')
		setValue('imageFile', selectedFile, { shouldValidate: true })
	}

	const projectData: SubmitHandler<IProjectSettings> = (data) => {
		console.log('handleSubmit data', data)
		console.log(getValues())
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
								onClick={() => resetField('imageFile')}
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
						onFileUpload={handleFile}
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
								items={data?.technologies}
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
