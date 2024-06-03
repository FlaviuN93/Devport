import styles from './MyPortfolioForm.module.css'
import { CameraIcon } from '@heroicons/react/24/outline'
import Avatar from '../../UI/Avatar'

import { defaultCover } from '../../../utils/variables'
import CoverModal from '../Modals/CoverModal'
import FileInput from '../../Inputs/FileInput'

const MyPortfolioForm = () => {
	// const { isPending, isSuccess, mutate: updateMyPortfolio, data } = useUpdateMyPortfolio()
	// const [isCoverSelected, setIsCoverSelected] = useState(true)

	// const coverFile = getValues().coverFile && !errors.coverFile ? URL.createObjectURL(getValues().coverFile as File) : null
	// const [coverUrl2, setCoverUrl2] = useState<string | null>(loggedUser.coverURL)
	// const isFileValid = !!coverFile
	// const isDone = isSuccess && !isPending
	// const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
	// const [zoom, setZoom] = useState(1)

	// const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
	// 	console.log(croppedArea, croppedAreaPixels)
	// }

	// Updating the previewUrl for cover.

	// Updating user

	// const portfolioImagesHandler: SubmitHandler<IPortfolio> = (data) => {
	// 	console.log(data, 'updateUrl')
	// 	const formData = Object.assign(data, { coverURL: null, avatarURL: null })
	// 	const portfolioData = convertToFormData(formData)
	// 	updateMyPortfolio(portfolioData)
	// }

	return (
		<>
			<div className={styles.coverContainer}>
				<img className={styles.coverImage} src={defaultCover} alt='' />
				<CoverModal />
			</div>
			<FileInput
				name='avatarFile'
				fileContainerStyles='-mt-20 absolute z-50'
				fileStyles='rounded-full h-40 w-40'
				icon={
					<Avatar
						avatarStyles='h-40 w-40 hover:shadow-md transition-shadow duration-300'
						role='button'
						imageUrl=''
						icon={<CameraIcon className='h-20 w-20' />}
					/>
				}
				onFileUpload={(selectedFile) => {}}
			/>
		</>
	)
}

export default MyPortfolioForm
