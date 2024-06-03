import { Dispatch, FC, ReactNode, RefObject, SetStateAction, createContext, useRef, useState } from 'react'

interface IModalContextProps {
	isModalOpen: boolean
	openModal: string
	setModalPosition: Dispatch<SetStateAction<string>>
	modalPosition: string
	modalWindowRef: RefObject<HTMLDivElement>
	open: (name: string) => void
	close: () => void
}

export const ModalContext = createContext<IModalContextProps>({} as IModalContextProps)

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [openModal, setOpenModal] = useState('')
	const [modalPosition, setModalPosition] = useState('')
	const modalWindowRef = useRef<HTMLDivElement>(null)
	const isModalOpen = openModal.length > 0

	const close = () => setOpenModal('')
	const open = (name: string) => setOpenModal(name)

	return (
		<ModalContext.Provider
			value={{
				openModal,
				isModalOpen,
				open,
				close,
				modalWindowRef,
				modalPosition,
				setModalPosition,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
