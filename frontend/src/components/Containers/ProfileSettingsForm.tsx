import CheckCircleIcon from '../../assets/check circle-1.svg?react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProjectIcon from '../../assets/project.svg?react'
import UploadIcon from '../../assets/upload.svg?react'
import { useUserContext } from '../../contexts/contextHooks'
import { useUpdateMe } from '../../services/queries'
import { IProfileSettings, profileSettingsSchema } from '../../utils/schemas'
import Avatar from '../UI/Avatar'
import Button from '../UI/Button'
import File from '../Inputs/File'
import Text from '../Inputs/Text'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { motionVariants } from '../../utils/variables'
import { convertToFormData } from '../../utils/functions'

const ProfileSettingsForm = () => {
	const { user: loggedUser, handleSetUser } = useUserContext()
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IProfileSettings>({
		resolver: zodResolver(profileSettingsSchema),
		defaultValues: {
			avatarFile: null,
			coverFile: null,
			fullName: loggedUser.fullName,
			bio: loggedUser.bio,
			email: loggedUser.email,
			jobTitle: loggedUser.jobTitle,
			linkedin: loggedUser.linkedin,
		},
	})

	const { isPending: pendingUpdate, mutate: updateUser, isSuccess, data: newUser } = useUpdateMe()
	const coverFile = getValues().coverFile && !errors.coverFile ? URL.createObjectURL(getValues().coverFile as File) : null
	const [coverUrl, setCoverUrl] = useState<string | null>(null)
	const [isCoverSelected, setIsCoverSelected] = useState(true)

	// Updating the previewUrl for cover.
	useEffect(() => {
		if (isCoverSelected) setCoverUrl(loggedUser.coverURL)
		else setCoverUrl(coverFile)
	}, [getValues().coverFile, loggedUser.coverURL, isCoverSelected])

	// Updating user
	useEffect(() => {
		if (isSuccess && !pendingUpdate) {
			handleSetUser(newUser.user)
			setIsCoverSelected(true)
		}
	}, [isSuccess, pendingUpdate, handleSetUser, newUser?.user])

	const userDataHandler: SubmitHandler<IProfileSettings> = (data) => {
		const formData = Object.assign(data, { coverURL: null, avatarURL: null })
		const userFormData = convertToFormData(formData)
		updateUser(userFormData)
	}

	return (
		<form onSubmit={handleSubmit(userDataHandler)} className='formSettingsContainer'>
			<motion.div
				initial='hidden'
				animate={coverUrl ? 'visible' : 'hidden'}
				variants={motionVariants}
				transition={{ duration: 0.5 }}
				className='relative justify-center bg-light3'
			>
				{coverUrl && (
					<>
						<XMarkIcon
							onClick={() => {
								setIsCoverSelected(false)
								setCoverUrl(null)
							}}
							className='h-6 w-6 absolute top-2 right-2 text-[#666] cursor-pointer'
						/>
						<img src={coverUrl} className='object-cover max-h-[250px] w-full' />
					</>
				)}
			</motion.div>
			<motion.div
				initial='hidden'
				animate={!coverUrl ? 'visible' : 'hidden'}
				variants={motionVariants}
				transition={{ duration: 0.5 }}
				className='flex flex-col items-center gap-4 bg-light2 py-6'
			>
				<Avatar icon={<ProjectIcon />} avatarStyles='h-[52px] w-[52px] -mt-2' />
				<p className='text-gray text-sm text-center font-medium px-4'>Cover Image must be PNG, JPEG, JPG, WEBP - max 5MB</p>

				<File
					buttonText='Upload New Cover'
					icon={<UploadIcon />}
					name='coverFile'
					fileStyles='gap-2'
					register={register}
					onFileUpload={(selectedFile: File) => setValue('coverFile', selectedFile, { shouldValidate: true })}
					error={errors.coverFile?.message}
				/>
			</motion.div>
			<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
				<Text label='Name' register={register} name='fullName' placeholder='Enter your name' error={errors.fullName?.message} />

				<Text
					label='Linkedin Profile'
					register={register}
					name='linkedin'
					placeholder='Enter your linkedin profile'
					error={errors.linkedin?.message}
				/>
			</div>
			<div className='flex flex-col gap-3 md:flex-row md:gap-10'>
				<Text label='Email' register={register} name='email' placeholder='example@mail.com' error={errors.email?.message} />
				<Text label='Job Title' register={register} name='jobTitle' placeholder='Enter your job title' error={errors.jobTitle?.message} />
			</div>
			<Text
				label='Bio'
				register={register}
				variant='textarea'
				rows={5}
				name='bio'
				placeholder='Enter a short introduction..'
				error={errors.bio?.message}
			/>
			<div className='place-self-end flex w-full sm:w-auto'>
				<Button
					icon={<CheckCircleIcon className='h-5 w-5' />}
					iconPos='left'
					buttonText='Save'
					buttonStyles='mb-2 w-full sm:place-self-end sm:w-auto'
					variant='primary'
					isLoading={pendingUpdate}
					type='submit'
				/>
			</div>
		</form>
	)
}

export default ProfileSettingsForm
