import { FC, ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface DropdownContextType {
	isOpen: boolean
	handleClose: () => void
	handleToggle: () => void
	menuRef: RefObject<HTMLDivElement>
	dropdownBtnRef: RefObject<HTMLButtonElement>
	selectedItemId: string | null
	handleSelect: (itemId: string) => void
}

export const DropdownContext = createContext<DropdownContextType>({} as DropdownContextType)

export const DropdownProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const dropdownBtnRef = useRef<HTMLButtonElement>(null)

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
			}}
		>
			{children}
		</DropdownContext.Provider>
	)
}
