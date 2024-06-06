import { Link } from 'react-router-dom'
import HomeImage from '../components/UI/HomeImage'
import Button from '../components/UI/Button'
import LogoIcon from '../components/UI/LogoIcon'

const HomePage = () => {
	return (
		<section className='relative w-screen h-screen overflow-hidden'>
			<HomeImage />
			<div className='relative desktop:m-24 md:m-16 my-12 mx-6'>
				<div className='flex flex-col gap-12'>
					<LogoIcon width={150} height={50} />

					<div className='flex flex-col gap-4 md:gap-6'>
						<h4 className='text-violet font-medium text-lg'>SHOWCASE YOUR CODING MASTERY</h4>
						<h1 className='text-2xl font-semibold tablet:text-5xl md:text-4xl desktop:text-6xl desktop:leading-tight desktop:w-[75%]'>
							Build your professional presence with our streamlined portofolio platform tailored for developers
						</h1>
						<h6 className='text-lg md:text-xl lgMobile:text-lg text-darkGray'>
							Easily highlight your projects, and showcase your skills to potential employers and collaborators
						</h6>
					</div>
					<div className='flex flex-col w-full gap-3'>
						<Link to={'/auth/login'}>
							<Button variant='primary' buttonStyles='w-full' buttonText='Login' />
						</Link>
						<Link to={'/auth'}>
							<Button buttonStyles='bg-darkBlue text-white w-full' buttonText='Sign up' />
						</Link>
					</div>
				</div>
				<footer className='flex flex-col gap-4 justify-between w-full'>
					<p className='order-2 md:order-1'>Copyright © DevPort. All rights reserved</p>
					<ul className='order-1 md:order-2 flex w-full gap-4'>
						<Link to={'/terms-of-service'}>
							<li>Terms Of Service</li>
						</Link>
						<Link to={'/privacy-policy'}>
							<li>Privacy Policy</li>
						</Link>
						<Link to={'/contact-us'}>
							<li>Contact Us</li>
						</Link>
					</ul>
				</footer>
			</div>
		</section>
	)
}

export default HomePage
