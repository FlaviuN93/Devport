import { Link, useNavigate } from 'react-router-dom'
import styles from './PageNav.module.css'
import LogoIcon from '../../assets/Logo.svg?react'
import { Dropdown, Divider, DropdownItem, DropdownMenu, DropdownToggle } from '../UI/Dropdown'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Avatar from '../UI/Avatar'
import { useUserContext } from '../../contexts/contextHooks'
import Button from '../UI/Button'

const PageNav = () => {
	const { user, handleLogoutUser } = useUserContext()
	const navigate = useNavigate()

	return (
		<nav className={styles.navContainer}>
			<Link to='/home'>
				<LogoIcon />
			</Link>

			<Dropdown>
				<DropdownToggle icon={<UserCircleIcon className='h-6 w-6' />} />
				<DropdownMenu position='bottom' menuStyles='min-w-64'>
					<DropdownItem itemId='1'>
						<Avatar icon={<UserCircleIcon className='h-6 w-6' />} avatarStyles='w-10 h-10' />
						<div className='text-start -mt-1'>
							<h5>Tyler Johnson</h5>
							<p className='text-xs text-gray'>{user.email}</p>
						</div>
					</DropdownItem>
					<Divider />
					<div>
						<h6 className='text-start mb-3'>Account</h6>
						<Link to={'profile-settings'}>
							<DropdownItem itemId='2'>
								<UserCircleIcon className='h-6 w-6' />
								<Button variant='text' buttonStyles='font-normal text-base' buttonText='Profile Settings' />
							</DropdownItem>
						</Link>
						<Link to={'project-settings'}>
							<DropdownItem itemId='3'>
								<UserCircleIcon className='h-6 w-6' />
								<Button variant='text' buttonStyles='font-normal text-base' buttonText='Project Settings' />
							</DropdownItem>
						</Link>
						<Link to={'my-portfolio'}>
							<DropdownItem itemId='4'>
								<UserCircleIcon className='h-6 w-6' />
								<Button variant='text' buttonStyles='font-normal text-base' buttonText='My Portofolio' />
							</DropdownItem>
						</Link>
					</div>
					<Divider />

					<DropdownItem itemId='5' itemStyles='mb-0'>
						<UserCircleIcon className='h-6 w-6' />
						<Button
							variant='text'
							buttonStyles='font-normal text-base'
							buttonText='Logout'
							onClick={() => handleLogoutUser(() => navigate('/auth/login'))}
						/>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</nav>
	)
}

export default PageNav
