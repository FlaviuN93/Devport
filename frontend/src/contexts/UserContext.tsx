import { FC, ReactNode, createContext, useState } from 'react'
import { User } from '../services/types'
import { getValueFromStorage } from '../utils/functions'

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
	handleSetUser: (user: User) => void
	setCover: (url: string) => void
	setAvatar: (url: string) => void
	handleLogoutUser: (navigate: () => void) => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState(getValueFromStorage<User>('user', initialUser))

	const setCover = (url: string) => setUser((user) => ({ ...user, coverURL: url }))
	const setAvatar = (url: string) => setUser((user) => ({ ...user, avatarURL: url }))

	const handleSetUser = (user: User) => {
		window.localStorage.setItem('user', JSON.stringify(user))
		setUser(user)
	}

	const handleLogoutUser = (navigate: () => void) => {
		window.localStorage.removeItem('user')
		setUser(initialUser)
		navigate()
	}

	return <UserContext.Provider value={{ user, setCover, setAvatar, handleSetUser, handleLogoutUser }}>{children}</UserContext.Provider>
}
