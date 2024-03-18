import { FC, ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface DropdownContextType {
	isOpen: boolean
	handleClose: () => void
	handleToggle: () => void
	menuRef: RefObject<HTMLElement> | null
	dropdownBtnRef: RefObject<HTMLElement> | null
}

const defaultContext: DropdownContextType = {
	isOpen: false,
	handleClose: () => {},
	handleToggle: () => {},
	menuRef: null,
	dropdownBtnRef: null,
}

export const DropdownContext = createContext<DropdownContextType | undefined>(defaultContext)

export const DropdownProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	const dropdownBtnRef = useRef(null)

	const handleClose = () => {
		console.log('false')
		setIsOpen(false)
	}
	const handleToggle = () => {
		console.log('hello')
		setIsOpen(!isOpen)
	}

	return (
		<DropdownContext.Provider value={{ isOpen, handleClose, handleToggle, menuRef, dropdownBtnRef }}>
			{children}
		</DropdownContext.Provider>
	)
}
