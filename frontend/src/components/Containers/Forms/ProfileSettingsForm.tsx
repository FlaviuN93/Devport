import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useUserContext } from '../../../contexts/contextHooks'
import { useUpdateMe } from '../../../services/queries'
import { IProfileSettings, profileSettingsSchema } from '../../../utils/schemas'
import Button from '../../UI/Button'
import Text from '../../Inputs/Text'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const ProfileSettingsForm = () => {
	const { user: loggedUser, handleSetUser } = useUserContext()
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IProfileSettings>({
		resolver: zodResolver(profileSettingsSchema),
		defaultValues: {
			fullName: loggedUser.fullName,
			bio: loggedUser.bio,
			email: loggedUser.email,
			jobTitle: loggedUser.jobTitle,
			linkedin: loggedUser.linkedin,
		},
	})

	const { isPending: pendingUpdate, mutate: updateUser } = useUpdateMe()

	return (
		<form
			onSubmit={handleSubmit((data) => updateUser(data, { onSuccess: (newUser) => handleSetUser(newUser.user) }))}
			className='formSettingsContainer'
		>
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
			<div className='place-self-end flex w-full lgMobile:w-auto'>
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
