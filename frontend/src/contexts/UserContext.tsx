import { FC, ReactNode, createContext, useState } from 'react'
import { User } from '../services/types'
import { getValueFromStorage } from '../utils/functions'

const initialUser: User = {
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
	handleLogoutUser: () => void
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState(getValueFromStorage<User>('user', initialUser))

	const handleSetUser = (user: User) => {
		window.localStorage.setItem('user', JSON.stringify(user))
		setUser(user)
	}

	const handleLogoutUser = () => window.localStorage.removeItem('user')

	return (
		<UserContext.Provider value={{ user, handleSetUser, handleLogoutUser }}>{children}</UserContext.Provider>
	)
}
