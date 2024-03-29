import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PageNav.module.css'
import LogoIcon from '../../assets/Logo.svg?react'
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from '../UI/Dropdown'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Avatar from '../UI/Avatar'

const PageNav = () => {
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
							<p className='text-xs text-gray'>tyler.johnson@gmail.com</p>
						</div>
					</DropdownItem>
					<DropdownDivider />
					<div>
						<h6 className='text-start mb-3'>Account</h6>
						<Link to={'/home'}>
							<DropdownItem itemId='2'>
								<UserCircleIcon className='h-6 w-6' />
								<span>Profile Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/home'}>
							<DropdownItem itemId='3'>
								<UserCircleIcon className='h-6 w-6' />
								<span>Project Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/home'}>
							<DropdownItem itemId='4'>
								<UserCircleIcon className='h-6 w-6' />
								<span>My Portofolio</span>
							</DropdownItem>
						</Link>
					</div>
					<DropdownDivider />

					<Link to={'/home'}>
						<DropdownItem itemId='5' itemStyles='mb-0'>
							<UserCircleIcon className='h-6 w-6' />
							<span>Logout</span>
						</DropdownItem>
					</Link>
				</DropdownMenu>
			</Dropdown>
		</nav>
	)
}

export default PageNav
