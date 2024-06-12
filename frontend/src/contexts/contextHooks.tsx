import { useContext } from 'react'
import { DropdownContext } from './DropdownContext'
import { UserContext } from './UserContext'
import { ModalContext } from './ModalContext'
import { ProjectContext } from './ProjectContext'
import { DarkModeContext } from './DarkModeContext'

export const useDropdownContext = () => {
	const context = useContext(DropdownContext)
	if (!context) {
		throw new Error('Dropdown context must be used within a DropdownProvider')
	}
	return context
}

export const useUserContext = () => {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error('User context must be used within a UserProvider')
	}

	return context
}

export const useModalContext = () => {
	const context = useContext(ModalContext)

	if (!context) {
		throw new Error('Modal context must be used within a ModalProvider')
	}

	return context
}

export const useProjectContext = () => {
	const context = useContext(ProjectContext)
	if (!context) {
		throw new Error('Project context must be used within a ProjectProvider')
	}

	return context
}

export const useDarkModeContext = () => {
	const context = useContext(DarkModeContext)
	if (!context) {
		throw new Error('DarkMode context must be used within a DarkModeProvider')
	}

	return context
}
