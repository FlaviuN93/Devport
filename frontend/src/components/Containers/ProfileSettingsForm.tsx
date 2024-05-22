import CheckCircleIcon from '../../assets/check circle-1.svg?react'
import { UserCircleIcon, PhotoIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useUserContext } from '../../contexts/contextHooks'
import { useUpdateMe } from '../../services/queries'
import { IProfileSettings, profileSettingsSchema } from '../../utils/schemas'
import Avatar from '../UI/Avatar'
import Button from '../UI/Button'
import File from '../Inputs/File'
import Text from '../Inputs/Text'
import { useState } from 'react'

const ProfileSettingsForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		reset,
	} = useForm<IProfileSettings>({
		resolver: zodResolver(profileSettingsSchema),
	})

	const { user: loggedUser } = useUserContext()
	const { isPending: pendingUpdate, mutate: updateUser } = useUpdateMe()

	const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined)
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
	// const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

	const editUserHandler = () => {
		setCoverUrl(loggedUser.coverURL)
		setAvatarUrl(loggedUser.avatarURL)
		setValue('email', loggedUser.email)
		reset({
			name: loggedUser.fullName,
			bio: loggedUser.bio,
			email: loggedUser.email,
			jobTitle: loggedUser.jobTitle,
			linkedin: loggedUser.linkedin,
		})
	}

	return (
		<form onSubmit={handleSubmit((data) => updateUser(data))} className='formSettingsContainer'>
			<div className='imageFileContainer'>
				<img src='' alt='' />
				<Avatar icon={<UserCircleIcon className='w-6 h-6' />} avatarStyles='h-[52px] w-[52px]' />

				<p className='text-gray text-sm text-center font-medium px-4'>Cover Image resolution 1584x396 pixels, max size 2MB</p>
				<div className='flex items-center flex-col sm:flex-row gap-4 -mt-1'>
					<File
						buttonText='Upload Cover'
						icon={<PhotoIcon className='h-6 w-6' />}
						register={register}
						name='coverFile'
						onFileUpload={(coverFile: File) => setValue('coverFile', coverFile, { shouldValidate: true })}
						error={errors.coverFile?.message}
					/>

					<File
						buttonText='Upload Avatar'
						icon={<UserCircleIcon className='w-6 h-6' />}
						register={register}
						name='avatarFile'
						onFileUpload={(avatarFile: File) => setValue('avatarFile', avatarFile, { shouldValidate: true })}
						error={errors.avatarFile?.message}
					/>
				</div>
			</div>

			<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
				<Text label='Name' register={register} name='name' placeholder='Enter your name' error={errors.name?.message} />

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
			<div className='place-self-end flex flex-col w-full gap-4 sm:flex-row sm:w-auto'>
				<Button
					icon={<PencilSquareIcon className='h-5 w-5' />}
					iconPos='left'
					buttonText='Edit'
					buttonStyles='mb-2 w-full sm:place-self-end sm:w-auto bg-lightViolet text-darkViolet'
					type='button'
					onClick={editUserHandler}
				/>
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
