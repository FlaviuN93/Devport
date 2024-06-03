import LinkedinIcon from '../../assets/linkedin.svg?react'
import EnvelopeIcon from '../../assets/envelope.svg?react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button'
import { FC, useState } from 'react'
import { User } from '../../services/types'
import { defaultCover } from '../../utils/variables'
import Cropper, { Area, Point } from 'react-easy-crop'

const PortfolioCard: FC<{ user: User | undefined }> = ({ user }) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

	const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}
	return (
		<>
			<div>
				{/* w-[500px] h-[250px] */}
				{/* <div className='relative top-0 left-0 right-0 bottom-20 w-[50%] h-full'>
					<Cropper
						image={defaultCover}
						crop={crop}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropComplete}
						aspect={4 / 1}
					/>
				</div> */}
				<h2>{user?.fullName}</h2>
				<h6 className='font-medium'>{user?.jobTitle}</h6>
			</div>

			<div className='flex gap-4'>
				<Link to={`mailto:${user?.email}`} target='_blank'>
					<Button icon={<EnvelopeIcon className='h-5 w-5' />} iconPos='left' buttonText='Contact' buttonStyles='text-gray' />
				</Link>

				{user?.linkedin && (
					<Link to={user?.linkedin} target='_blank'>
						<Button icon={<LinkedinIcon className='h-5 w-5' />} iconPos='left' buttonText='Linkedin' buttonStyles='text-gray' />
					</Link>
				)}
			</div>
			<div>
				<h4 className='text-gray mb-2'>Bio</h4>
				<p className='text-black2 font-medium text-md w-[90%]'>{user?.bio}</p>
			</div>

			<hr className='border-lightGray my-3' />

			<h4 className='text-gray font-medium'>Projects</h4>
		</>
	)
}

export default PortfolioCard
