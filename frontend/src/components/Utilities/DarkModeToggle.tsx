import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useDarkModeContext } from '../../contexts/contextHooks'
import Avatar from '../UI/Avatar'

export default function DarkModeToggle() {
	const { setDarkMode, setLightMode } = useDarkModeContext()

	return (
		<div>
			<div className='flex gap-2 mx-6 p-1 h-11 ease-out duration-300 rounded-full bg-light dark:bg-black3'>
				<Avatar
					icon={<SunIcon className='h-6 w-6 text-light dark:text-light3' />}
					avatarStyles='h-auto w-10 rounded-full bg-violet dark:bg-black3 border-none'
					role='button'
					onClick={() => setLightMode()}
				/>
				<Avatar
					icon={<MoonIcon className='h-6 w-6 text-gray dark:text-light' />}
					avatarStyles='h-auto w-10 rounded-full bg-light dark:bg-darkViolet border-none'
					role='button'
					onClick={() => setDarkMode()}
				/>
			</div>
		</div>
	)
}
