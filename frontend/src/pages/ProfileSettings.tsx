import Button from '../components/UI/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileSettingsType, profileSettingsSchema } from '../utils/schemas'
import File from '../components/Inputs/File'
// import TrashIcon from '../assets/Trash.svg?react'
import CheckCircleIcon from '../assets/check circle-1.svg?react'
// import UploadIcon from '../assets/upload.svg?react'
// import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const ProfileSettings = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		// setValue,
	} = useForm<ProfileSettingsType>({
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

	const profileData: SubmitHandler<ProfileSettingsType> = (data) => {
		console.log('handleSubmit data', data)
	}
	return (
		<section className='settingsContainer'>
			<h4 className='mt-2 mb-4'>Profile Settings</h4>
			<form onSubmit={handleSubmit(profileData)} className='formSettingsContainer'>
				<div className='imageFileContainer'>
					<img src='' alt='' />
					<Avatar icon={<UserCircleIcon className='w-6 h-6' />} avatarStyles='h-[52px] w-[52px]' />

					<p className='text-gray text-sm text-center font-medium px-4'>
						Cover Image resolution 1584x396 pixels, max size 2MB
					</p>
					<div className='flex items-center flex-col sm:flex-row gap-4 -mt-1'>
						<File
							buttonText='Upload Cover'
							icon={<PhotoIcon className='h-6 w-6' />}
							register={register}
							name='coverFile'
							onFileUpload={handleFile}
							// error={errors.imageFile?.message}
						/>

						<File
							buttonText='Upload Avatar'
							icon={<UserCircleIcon className='w-6 h-6' />}
							register={register}
							name='avatarFile'
							onFileUpload={handleFile}
							// error={errors.imageFile?.message}
						/>

						{/* <Button
							buttonText='Delete Image'
							buttonStyles='text-danger bg-white border-0'
							iconPos='left'
							variant='transparent'
							icon={<TrashIcon />}
							// onClick={() => setSelectedImage(null)}
						/> */}
					</div>
				</div>

				<div className='flex flex-col gap-4 md:flex-row md:gap-10'>
					<Text
						label='Name'
						register={register}
						name='name'
						placeholder='Enter your name'
						error={errors.name?.message}
					/>

					<Text
						label='Linkedin Profile'
						register={register}
						name='linkedin'
						placeholder='Enter your linkedin profile'
						error={errors.linkedin?.message}
					/>
				</div>
				<div className='flex flex-col gap-3 md:flex-row md:gap-10'>
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

				<Button
					icon={<CheckCircleIcon className='h-5 w-5' />}
					iconPos='left'
					buttonText='Add'
					buttonStyles='mb-2 w-full sm:place-self-end sm:w-auto'
					variant='primary'
					type='submit'
				/>
			</form>
		</section>
	)
}

export default ProfileSettings
