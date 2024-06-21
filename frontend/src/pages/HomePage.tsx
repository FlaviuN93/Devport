import { Link, useNavigate } from 'react-router-dom'
import HomeImage from '../components/UI/HomeImage'
import Button from '../components/UI/Button'
import LogoIcon from '../components/UI/LogoIcon'

const HomePage = () => {
	const navigate = useNavigate()
	return (
		<section className='relative w-screen h-screen overflow-hidden'>
			<HomeImage />
			<div className='flex flex-col px-6 md:px-9 laptop:px-12 pt-12 gap-8 desktop:gap-12'>
				<LogoIcon iconStyles='w-[100px] h-[40px] tablet:w-[150px] tablet:h-[50px] ' />

				<div className='flex flex-col gap-8 md:gap-6'>
					<h4 className='text-violet font-medium text-lg laptop:text-xl'>SHOWCASE YOUR CODING MASTERY</h4>
					<h1 className='text-2xl font-semibold mobile:text-3xl md:text-4xl tablet:text-5xl tablet:w-[90%] desktop:text-6xl desktop:leading-tight desktop:w-[80%]'>
						Build your professional presence with our streamlined portofolio platform tailored for developers
					</h1>
					<h6 className='text-lg md:text-xl laptop:text-2xl  text-darkGray tablet:w-[80%]'>
						Easily highlight your projects, and showcase your skills to potential employers and collaborators
					</h6>
				</div>
				<div className='flex w-full gap-3'>
					<Button
						variant='primary'
						buttonStyles='w-full px-8 py-3.5 laptop:text-lg lgMobile:w-auto'
						buttonText='Login'
						onClick={() => navigate('/auth/login')}
					/>
					<Button
						buttonStyles='bg-black3 px-8 py-3.5 laptop:text-lg text-white w-full lgMobile:w-auto'
						buttonText='Sign up'
						onClick={() => navigate('/auth')}
					/>
				</div>
			</div>
			<footer className='footer'>
				<p className='order-2 tablet:order-1'>Copyright © DevPort. All rights reserved</p>
				<ul className='order-1 tablet:order-2 flex gap-4 tablet:gap-8 desktop:gap-12 '>
					<Link to={'/terms-of-service'} className='focus:underline focus:outline-none'>
						<li>Terms Of Service</li>
					</Link>
					<Link to={'/privacy-policy'} className='focus:underline focus:outline-none'>
						<li>Privacy Policy</li>
					</Link>
					<Link to={'/contact-us'} className='focus:underline focus:outline-none'>
						<li>Contact Us</li>
					</Link>
				</ul>
			</footer>
		</section>
	)
}

export default HomePage
