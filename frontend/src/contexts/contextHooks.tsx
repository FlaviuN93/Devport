import { useContext } from 'react'
import { DropdownContext } from './DropdownContext'

export const useDropdownContext = () => {
	const context = useContext(DropdownContext)
	if (!context) {
		throw new Error('Dropdown context must be used within a DropdownProvider')
	}
	return context
}
