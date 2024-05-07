import Avatar from '../components/UI/Avatar'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'
import LinkedinIcon from '../assets/linkedin.svg?react'
import EnvelopeIcon from '../assets/envelope.svg?react'

const Portfolio = () => {
	return (
		<section>
			<div className='h-[12.5rem] bg-gray'>
				<img src='../assets/profile-bg.png' alt='Cover' />
			</div>
			<div className='portfolioContainer relative'>
				<Avatar avatarStyles='h-40 w-40 absolute -top-20' icon={<UserCircleIcon className=' h-20 w-20' />} />

				<div className='mt-20'>
					<h2 className='mb-2'>Mitsuyo Nguyen</h2>
					<h6>Front-End Developer</h6>
				</div>

				<div className='flex gap-4'>
					<Link to={'mailto:2@example.com'} target='_blank'>
						<Button
							icon={<EnvelopeIcon className='h-5 w-5' />}
							iconPos='left'
							buttonText='Contact'
							buttonStyles='text-gray'
						/>
					</Link>

					<Link to={'linkedindUrl'} target='_blank'>
						<Button
							icon={<LinkedinIcon className='h-5 w-5' />}
							iconPos='left'
							buttonText='Linkedin'
							buttonStyles='text-gray'
						/>
					</Link>
				</div>
				<div>
					<h4 className='text-gray mb-2'>Bio</h4>
					<p className='text-black2 font-medium text-md md:w-[90%]'>
						A passionate Junior Front-end Developer with extensive experience in HTML, CSS, JavaScript, and
						React. Proven track record of developing user-friendly interfaces and optimizing website
						performance. Eager to learn and grow in the tech industry.
					</p>
				</div>

				<hr className='border-lightGray my-3' />

				<h2 className='text-gray font-medium'>Projects</h2>
			</div>
		</section>
	)
}
export default Portfolio
