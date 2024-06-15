import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { getValueFromStorage } from '../utils/functions'

interface DarkModeContextProps {
	themeMode: 'light' | 'dark'
	setLightMode: () => void
	setDarkMode: () => void
	clearDarkMode: () => void
}

export const DarkModeContext = createContext({} as DarkModeContextProps)

export const DarkModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [themeMode, setThemeMode] = useState(getValueFromStorage<'light' | 'dark'>('themeMode', 'light'))

	useEffect(() => {
		if (themeMode === 'dark') {
			document.documentElement.classList.add('dark')
			document.documentElement.classList.remove('light')
		} else {
			document.documentElement.classList.add('light')
			document.documentElement.classList.remove('dark')
		}
	}, [themeMode])

	const setLightMode = () => {
		window.localStorage.setItem('themeMode', 'light')
		setThemeMode('light')
	}

	const setDarkMode = () => {
		window.localStorage.setItem('themeMode', 'dark')
		setThemeMode('dark')
	}

	const clearDarkMode = () => {
		window.localStorage.removeItem('themeMode')
		setThemeMode('light')
	}
	return <DarkModeContext.Provider value={{ themeMode, setDarkMode, setLightMode, clearDarkMode }}>{children}</DarkModeContext.Provider>
}
