import { Link, useNavigate } from 'react-router-dom'
import LogoIcon from '../UI/LogoIcon'
import styles from './PageNav.module.css'
import { Dropdown, Divider, DropdownItem, DropdownMenu, DropdownToggle } from '../UI/Dropdown'
import { BookOpenIcon, SquaresPlusIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useDarkModeContext, useUserContext } from '../../contexts/contextHooks'
import { useLogout } from '../../services/queries'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import useSuccess from '../../hooks/useSuccess'
import DarkModeToggle from '../Utilities/DarkModeToggle'

const PageNav = () => {
	const { user: loggedUser, handleLogoutUser } = useUserContext()
	const { themeMode, clearDarkMode } = useDarkModeContext()
	const { isPending, isSuccess, mutate: logout } = useLogout()

	const showAccount = loggedUser.avatarURL && loggedUser.fullName && loggedUser.jobTitle
	const avatarUrl = loggedUser.avatarURL ? loggedUser.avatarURL : undefined
	const navigate = useNavigate()
	const navContainerClasses = `${themeMode === 'dark' ? 'bg-[#000]/50' : 'bg-light3/50'} ${styles.navContainer}`
	const dropdownToggleClasses = `${themeMode === 'dark' ? 'bg-darkGray/50' : 'bg-light/50'}  ${styles.dropdownToggleStyles}`

	const handleLogout = async () => {
		await handleLogoutUser()
		clearDarkMode()
		navigate('/', { replace: true })
	}

	useSuccess(isPending, isSuccess, handleLogout)

	return (
		<nav className={navContainerClasses}>
			<Link to='/app/my-portfolio' className='focus:outline-none'>
				<LogoIcon width={110} />
			</Link>
			<div className='flex items-center'>
				<DarkModeToggle />
				<Dropdown>
					<DropdownToggle
						btnStyles={dropdownToggleClasses}
						imageUrl={avatarUrl}
						icon={<UserCircleIcon className='h-7 w-7 dark:text-light3' />}
					/>
					<DropdownMenu position='bottom' menuStyles='min-w-64'>
						{showAccount && (
							<>
								<DropdownItem itemStyles='cursor-default' closeOnClick={false}>
									<div className='flex w-full items-center gap-4 -my-2'>
										<img src={avatarUrl} className='w-12 h-12 rounded-full border-[1px] border-light3 dark:border-gray-2' alt='' />

										<div>
											<h5 className='text-darkGray dark:text-light'>{loggedUser.fullName}</h5>
											<p className='text-xs text-darkGray dark:text-light font-medium'>{loggedUser.jobTitle}</p>
										</div>
									</div>
								</DropdownItem>
								<Divider />
							</>
						)}

						<h6 className='text-start dark:text-light3 text-darkGray text-normal font-medium mb-3'>Account</h6>
						<Link to={'/app/profile-settings'}>
							<DropdownItem itemId='2'>
								<UserCircleIcon className='h-6 w-6 ' />
								<span>Profile Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/app/project-settings'}>
							<DropdownItem itemId='3'>
								<SquaresPlusIcon className='h-6 w-6' />
								<span>Project Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/app/my-portfolio'}>
							<DropdownItem itemId='4'>
								<BookOpenIcon className='h-6 w-6 ' />
								<span>My Portfolio</span>
							</DropdownItem>
						</Link>
						<Divider />

						<DropdownItem itemId='5' itemStyles='mb-0'>
							<div onClick={() => logout()} className='w-full flex gap-2'>
								<ArrowLeftStartOnRectangleIcon className='h-6 w-6 text-danger2' />
								<span className='text-danger2 text-base font-medium'>Log out</span>
							</div>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</nav>
	)
}

export default PageNav
