import Button from '../components/UI/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IProfileSettings, profileSettingsSchema } from '../utils/schemas'
import File from '../components/Inputs/File'
// import TrashIcon from '../assets/Trash.svg?react'
import CheckCircleIcon from '../assets/check circle-1.svg?react'
// import UploadIcon from '../assets/upload.svg?react'
// import ProjectIcon from '../assets/project.svg?react'
import Avatar from '../components/UI/Avatar'
import Text from '../components/Inputs/Text'
import { EllipsisVerticalIcon, PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/16/solid'
import { useChangePassword, useDeleteMe, useGetMe, useUpdateMe } from '../services/queries'
import Alert from '../components/UI/Alert'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '../components/UI/Dropdown'

import { Modal, ModalOpen, ModalWindow, ModalClose } from '../components/UI/Modal'
import ResetPasswordForm from '../components/Containers/ResetPasswordForm'

const ProfileSettings = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		reset,
	} = useForm<IProfileSettings>({
		resolver: zodResolver(profileSettingsSchema),
	})

	const { data: getUser, error: getUserError, isSuccess, isLoading, refetch } = useGetMe()
	const { error: updateUserError, isPending: pendingUpdate, mutate: updateUser } = useUpdateMe()
	const { error: deleteUserError, isPending: pendingDelete, mutate: deleteUser } = useDeleteMe()
	const { error: changePasswordError, isPending, mutate: changePassword } = useChangePassword()
	console.log(getUserError, 'hello')
	// const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : null

	return (
		<section className='settingsContainer'>
			{getUserError && (
				<Alert message={getUserError?.message} statusTitle={getUserError?.statusTitle} onClose={() => {}} />
			)}
			<div className='flex justify-between items-center'>
				<h4 className='mt-2 mb-4'>Profile Settings</h4>
				<Dropdown>
					<DropdownToggle
						btnStyles='p-1 shadow-xs border-light2'
						icon={<EllipsisVerticalIcon className='h-6 w-6' />}
					/>
					<DropdownMenu position='bottom'>
						<DropdownItem itemId='changePassword'>
							<Modal>
								<ModalOpen openedModalName='changePassword'>
									<Button variant='text' buttonText='Change Password' />
								</ModalOpen>
								<ModalWindow showCloseIcon={true} modalName='changePassword'>
									<h2 className='mb-6'>Change Password</h2>
									<ResetPasswordForm
										formName='changePassword'
										passwordLabel='Password'
										confirmLabel='Confirm Password'
										formStyles='mb-4'
									/>
									<ModalClose>
										<div className='flex gap-2 justify-end'>
											<Button type='button' variant='transparent' buttonText='Cancel' />
											<Button formName='changePassword' type='submit' variant='primary' buttonText='Change' />
										</div>
									</ModalClose>
								</ModalWindow>
							</Modal>
						</DropdownItem>
						<DropdownItem itemId='deleteAccount' itemStyles='p-4'>
							<Modal>
								<ModalOpen openedModalName='deleteAccount'>
									<Button
										variant='text'
										buttonText='Delete Account'
										buttonStyles='text-darkBlue bg-light3 border-0'
									/>
								</ModalOpen>
								<ModalWindow modalName='deleteAccount'>
									<div className='flex flex-col gap-3 mt-2'>
										<h4 className='text-danger'>Delete Account</h4>
										<p>Are you sure you want to remove user?</p>
										<ModalClose>
											<div className='flex gap-2 justify-end'>
												<Button
													variant='primary'
													buttonText='Yes'
													buttonStyles='bg-danger'
													isLoading={isLoading}
													onClick={() => deleteUser()}
												/>
												<Button variant='transparent' buttonText='No' />
											</div>
										</ModalClose>
									</div>
								</ModalWindow>
							</Modal>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<form onSubmit={handleSubmit((data) => updateUser(data))} className='formSettingsContainer'>
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
							onFileUpload={(coverFile: File) => setValue('coverFile', coverFile, { shouldValidate: true })}
							error={errors.coverFile?.message}
						/>

						<File
							buttonText='Upload Avatar'
							icon={<UserCircleIcon className='w-6 h-6' />}
							register={register}
							name='avatarFile'
							onFileUpload={(avatarFile: File) =>
								setValue('avatarFile', avatarFile, { shouldValidate: true })
							}
							error={errors.avatarFile?.message}
						/>
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
				<div className='place-self-end flex flex-col w-full gap-4 sm:flex-row sm:w-auto'>
					<Button
						icon={<PencilSquareIcon className='h-5 w-5' />}
						iconPos='left'
						buttonText='Edit'
						buttonStyles='mb-2 w-full sm:place-self-end sm:w-auto bg-lightViolet text-darkViolet'
						type='button'
						isLoading={isLoading}
						onClick={() => refetch()}
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
		</section>
	)
}

export default ProfileSettings
