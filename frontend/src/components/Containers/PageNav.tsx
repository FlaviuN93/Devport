import { Link, useNavigate } from 'react-router-dom'
import LogoIcon from '../UI/LogoIcon'
import styles from './PageNav.module.css'
import { Dropdown, Divider, DropdownItem, DropdownMenu, DropdownToggle } from '../UI/Dropdown'
import { BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import ProjectIcon from '../../assets/project-1.svg?react'
import { useUserContext } from '../../contexts/contextHooks'
import Button from '../UI/Button'
import { useLogout } from '../../services/queries'
import { useCallback } from 'react'
import useSuccess from '../../hooks/useSuccess'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'

const PageNav = () => {
	const { user: loggedUser, handleLogoutUser } = useUserContext()
	const { isPending, isSuccess, mutate: logout } = useLogout()
	const avatarUrl = loggedUser.avatarURL ? loggedUser.avatarURL : ''
	const navigate = useNavigate()

	const handleLogout = useCallback(() => {
		handleLogoutUser()
		logout()
		navigate('/', { replace: true })
	}, [handleLogoutUser, navigate, logout])

	useSuccess(isPending, isSuccess, handleLogout)

	return (
		<nav className={styles.navContainer}>
			<Link to='/'>
				<LogoIcon width={78} height={24} />
			</Link>

			<Dropdown>
				<DropdownToggle
					btnStyles={styles.dropdownToggleStyles}
					imageUrl={avatarUrl}
					icon={!loggedUser.avatarURL && <UserCircleIcon className='h-7 w-7' />}
				/>
				<DropdownMenu position='bottom' menuStyles='min-w-64'>
					<DropdownItem>
						<div className='flex w-full items-center gap-4'>
							<img src={avatarUrl} className='w-12 h-12 rounded-full' alt='' />
							<div>
								<h5>{loggedUser.fullName}</h5>
								<p className='text-xs text-darkGray font-medium'>{loggedUser.jobTitle}</p>
							</div>
						</div>
					</DropdownItem>
					<Divider />
					<h6 className='text-start text-darkGray mb-3'>Account</h6>
					<Link to={'profile-settings'}>
						<DropdownItem itemId='2'>
							<UserCircleIcon className='h-6 w-6 text-gray' />
							<span className='text-base text-darkGray'>Profile Settings</span>
						</DropdownItem>
					</Link>
					<Link to={'project-settings'}>
						<DropdownItem itemId='3'>
							<ProjectIcon className='h-6 w-6' />
							<span className='text-base text-darkGray'>Project Settings</span>
						</DropdownItem>
					</Link>
					<Link to={'my-portfolio'}>
						<DropdownItem itemId='4'>
							<BookOpenIcon className='h-6 w-6 text-gray' />
							<span className='text-base text-darkGray'>My Portfolio</span>
						</DropdownItem>
					</Link>
					<Divider />

					<DropdownItem itemId='5' itemStyles='mb-0'>
						<ArrowLeftStartOnRectangleIcon className='h-6 w-6 text-gray' />
						<Button variant='text' buttonStyles='font-normal text-darkGray text-base' buttonText='Sign out' onClick={handleLogout} />
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</nav>
	)
}

export default PageNav
