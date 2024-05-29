import LinkedinIcon from '../../assets/linkedin.svg?react'
import EnvelopeIcon from '../../assets/envelope.svg?react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button'
import { FC } from 'react'
import { User } from '../../services/types'

const PortfolioCard: FC<{ user: User | undefined }> = ({ user }) => {
	return (
		<>
			<div>
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
				<p className='text-black2 font-medium text-md w-[90%] md:w-[75%]'>{user?.bio}</p>
			</div>

			<hr className='border-lightGray my-3' />

			<h4 className='text-gray font-medium'>Projects</h4>
		</>
	)
}

export default PortfolioCard
