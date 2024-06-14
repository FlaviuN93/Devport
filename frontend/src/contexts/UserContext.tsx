import { FC, ReactNode, createContext, useState } from 'react'
import { User } from '../services/types'
import { getValueFromStorage, updateValueFromStorage } from '../utils/functions'

const initialUser = {
	email: '',
	avatarURL: '',
	coverURL: '',
	bio: '',
	fullName: '',
	jobTitle: '',
	linkedin: '',
	projects: [],
}

export interface UserContextProps {
	user: User
	isLoggedIn: boolean
	handleSetUser: (user: User) => void
	setCover: (url: string) => void
	setAvatar: (url: string) => void
	setEmail: (email: string) => void
	removeCover: () => void
	removeAvatar: () => void
	handleLogoutUser: () => Promise<any>
	handleIsLoggedIn: () => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState(getValueFromStorage<User>('user', initialUser))
	const [isLoggedIn, setIsLoggedIn] = useState(getValueFromStorage<boolean>('isLoggedIn', false))

	const setCover = (url: string) => {
		updateValueFromStorage({ key: 'user', keyToUpdate: 'coverURL', valueToUpdate: url })
		setUser((user) => ({ ...user, coverURL: url }))
	}
	const setAvatar = (url: string) => {
		updateValueFromStorage({ key: 'user', keyToUpdate: 'avatarURL', valueToUpdate: url })
		setUser((user) => ({ ...user, avatarURL: url }))
	}

	const removeCover = () => {
		updateValueFromStorage({ key: 'user', keyToUpdate: 'coverURL', valueToUpdate: '' })
		setUser((user) => ({ ...user, coverURL: '' }))
	}
	const removeAvatar = () => {
		updateValueFromStorage({ key: 'user', keyToUpdate: 'avatarURL', valueToUpdate: '' })
		setUser((user) => ({ ...user, avatarURL: '' }))
	}

	const handleSetUser = (user: User) => {
		window.localStorage.setItem('user', JSON.stringify(user))
		setUser(user)
	}

	const setEmail = (email: string) => {
		setUser((user) => ({ ...user, email }))
		window.localStorage.setItem('user', JSON.stringify({ ...user, email }))
	}

	const handleIsLoggedIn = () => {
		window.localStorage.setItem('isLoggedIn', 'true')
		setIsLoggedIn(true)
	}

	const handleLogoutUser = (): Promise<any> => {
		return new Promise((resolve: any) => {
			window.localStorage.removeItem('user')
			window.localStorage.removeItem('isLoggedIn')
			setUser(initialUser)
			setIsLoggedIn(false)
			resolve()
		})
	}

	return (
		<UserContext.Provider
			value={{
				user,
				setCover,
				setAvatar,
				removeAvatar,
				removeCover,
				handleSetUser,
				handleLogoutUser,
				isLoggedIn,
				handleIsLoggedIn,
				setEmail,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
