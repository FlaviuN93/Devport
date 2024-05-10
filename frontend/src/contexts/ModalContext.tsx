import { Dispatch, FC, ReactNode, RefObject, SetStateAction, createContext, useRef, useState } from 'react'

interface IModalContextProps {
	openModal: string
	setOpenModal: Dispatch<SetStateAction<string>>
	close: () => void
	setModalPosition: Dispatch<SetStateAction<{ xPosition: string; yPosition: string }>>
	modalPosition: { xPosition: string; yPosition: string }
	modalWindowRef: RefObject<HTMLDivElement>
}

export const ModalContext = createContext<IModalContextProps>({} as IModalContextProps)

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [openModal, setOpenModal] = useState('')
	const [modalPosition, setModalPosition] = useState({
		xPosition: '',
		yPosition: '',
	})
	const modalWindowRef = useRef<HTMLDivElement>(null)

	const close = () => setOpenModal('')

	return (
		<ModalContext.Provider
			value={{ openModal, setOpenModal, close, modalWindowRef, modalPosition, setModalPosition }}
		>
			{children}
		</ModalContext.Provider>
	)
}
