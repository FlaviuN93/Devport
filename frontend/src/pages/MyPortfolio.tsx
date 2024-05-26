import Avatar from '../components/UI/Avatar'
import { CameraIcon } from '@heroicons/react/24/outline'
import { useUserContext } from '../contexts/contextHooks'
import PortfolioCard from '../components/Containers/PortfolioCard'
import { CameraIcon as CameraIconSolid } from '@heroicons/react/24/solid'
import File from '../components/Inputs/File'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IPortfolio, portfolioSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertToFormData } from '../utils/functions'

const MyPortfolio = () => {
	const { user: loggedUser } = useUserContext()
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IPortfolio>({ resolver: zodResolver(portfolioSchema), defaultValues: { coverFile: null, avatarFile: null } })

	const portfolioImagesHandler: SubmitHandler<IPortfolio> = (data) => {
		console.log(data, 'hello')
		const formData = Object.assign(data, { coverURL: null, avatarURL: null })
		const portfolioData = convertToFormData(formData)
	}

	return (
		<section className='portfolioContainer'>
			<div className='relative mb-20'>
				<form onSubmit={handleSubmit(portfolioImagesHandler)}>
					{/* {loggedUser.coverURL ? (
					<img src={loggedUser.coverURL} alt='Cover' className='max-h-[200px]' />
				) : ( */}
					<div className='bg-gray w-full h-[200px] max-w-[800px] flex items-center justify-center text-lg font-semibold relative'>
						<span>Upload Cover Image</span>

						<File
							name='coverFile'
							register={register}
							fileContainerStyles='absolute top-2 right-4'
							fileStyles='border-none h-10 w-10 rounded-full'
							error={errors.coverFile?.message}
							icon={
								<Avatar
									role='button'
									avatarStyles='h-10 w-10 border-none bg-white'
									icon={<CameraIconSolid className='h-6 w-6 text-gray' />}
								/>
							}
							onFileUpload={(selectedFile) => {
								setValue('coverFile', selectedFile, { shouldValidate: true })
							}}
						/>
					</div>
					{/* )} */}
					<File
						name='avatarFile'
						register={register}
						fileContainerStyles='-mt-20 absolute z-50'
						fileStyles='rounded-full h-40 w-40'
						error={errors.avatarFile?.message}
						icon={
							<Avatar
								avatarStyles='h-40 w-40 hover:shadow-md transition-shadow duration-300'
								role='button'
								imageUrl=''
								icon={<CameraIcon className='h-20 w-20' />}
							/>
						}
						onFileUpload={(selectedFile) => {
							setValue('avatarFile', selectedFile, { shouldValidate: true })
						}}
					/>
				</form>
			</div>

			<PortfolioCard user={loggedUser} />
		</section>
	)
}
export default MyPortfolio
