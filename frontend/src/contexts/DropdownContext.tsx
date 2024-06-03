import { FC, ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface DropdownContextProps {
	isOpen: boolean
	handleClose: () => void
	handleToggle: () => void
	dropdownBtnRef: RefObject<HTMLButtonElement>
	menuRef: RefObject<HTMLDivElement>
	exclusionRef: RefObject<HTMLDivElement>
	selectedItemId: string | null
	handleSelect: (itemId: string) => void
}

export const DropdownContext = createContext({} as DropdownContextProps)

export const DropdownProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const dropdownBtnRef = useRef<HTMLButtonElement>(null)
	const exclusionRef = useRef<HTMLDivElement>(null)

	const handleSelect = (itemId: string) => setSelectedItemId(itemId)

	const handleClose = () => setIsOpen(false)

	const handleToggle = () => setIsOpen(!isOpen)

	return (
		<DropdownContext.Provider
			value={{
				isOpen,
				handleClose,
				handleToggle,
				menuRef,
				dropdownBtnRef,
				selectedItemId,
				handleSelect,
				exclusionRef,
			}}
		>
			{children}
		</DropdownContext.Provider>
	)
}
