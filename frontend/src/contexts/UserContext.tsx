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
	handleLogoutUser: () => void
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

	const handleSetUser = (user: User) => {
		window.localStorage.setItem('user', JSON.stringify(user))
		setUser(user)
	}

	const handleIsLoggedIn = () => {
		window.localStorage.setItem('isLoggedIn', 'true')
		setIsLoggedIn(true)
	}

	const handleLogoutUser = () => {
		window.localStorage.removeItem('user')
		window.localStorage.removeItem('isLoggedIn')
		setUser(initialUser)
		setIsLoggedIn(false)
	}

	return (
		<UserContext.Provider value={{ user, setCover, setAvatar, handleSetUser, handleLogoutUser, isLoggedIn, handleIsLoggedIn }}>
			{children}
		</UserContext.Provider>
	)
}
