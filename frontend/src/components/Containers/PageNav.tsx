import { Link, useNavigate } from 'react-router-dom'
import LogoIcon from '../UI/LogoIcon'
import styles from './PageNav.module.css'
import { Dropdown, Divider, DropdownItem, DropdownMenu, DropdownToggle } from '../UI/Dropdown'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useUserContext } from '../../contexts/contextHooks'
import Button from '../UI/Button'
import { useLogout } from '../../services/queries'
import { useCallback } from 'react'
import useSuccess from '../../hooks/useSuccess'
import Avatar from '../UI/Avatar'

const PageNav = () => {
	const { user: loggedUser, handleLogoutUser } = useUserContext()
	const { isPending, isSuccess, mutate: logout } = useLogout()
	const navigate = useNavigate()
	const handleLogout = useCallback(() => {
		handleLogoutUser()
		navigate('/', { replace: true })
	}, [handleLogoutUser, navigate])

	useSuccess(isPending, isSuccess, handleLogout)

	return (
		<nav className={styles.navContainer}>
			<Link to='/home'>
				<LogoIcon width={78} height={24} />
			</Link>

			<Dropdown>
				<DropdownToggle
					btnStyles={styles.dropdownToggleStyles}
					imageUrl={loggedUser.avatarURL ? loggedUser.avatarURL : ''}
					icon={!loggedUser.avatarURL && <UserCircleIcon className='h-7 w-7' />}
				/>
				<DropdownMenu position='bottom' menuStyles='min-w-64'>
					<DropdownItem>
						<Avatar icon={<UserCircleIcon className='h-6 w-6' />} avatarStyles='w-10 h-10' />
						<div className='text-start -mt-1'>
							<h5>Tyler Johnson</h5>
							<p className='text-xs text-darkGray font-medium'>{loggedUser.email}</p>
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
						<Button variant='text' buttonStyles='font-normal text-base' buttonText='Logout' onClick={() => logout()} />
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</nav>
	)
}

export default PageNav
