import { FC, ReactNode, RefObject, createContext, useRef, useState } from 'react'

interface IModalContextProps {
	openModal: string
	setOpenModal: React.Dispatch<React.SetStateAction<string>>
	close: () => void
	modalWindowRef: RefObject<HTMLDivElement>
}

export const ModalContext = createContext<IModalContextProps>({} as IModalContextProps)

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [openModal, setOpenModal] = useState('')
	const modalWindowRef = useRef<HTMLDivElement>(null)

	// const modalRef = useRef(null)
	// const modal2Ref = useRef(null)
	const close = () => setOpenModal('')

	return (
		<ModalContext.Provider value={{ openModal, setOpenModal, close, modalWindowRef }}>
			{children}
		</ModalContext.Provider>
	)
}
