import { FC, ReactElement, ReactNode, cloneElement, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Modal.module.css'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createPortal } from 'react-dom'
import { ModalProvider } from '../../contexts/ModalContext'
import { useModalContext } from '../../contexts/contextHooks'
import { useCalculateWindowHeight } from '../../hooks/useCalculateWindowHeight'
import { TailwindClasses } from '../../utils/types'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface IModalWindow {
	modalName: string
	children: ReactNode
	modalWindowStyles?: TailwindClasses
	showCloseIcon?: boolean
}

export const Modal: FC<{ children: ReactNode }> = ({ children }) => {
	return <ModalProvider>{children}</ModalProvider>
}

export const ModalOpen: FC<{ openedModalName: string; children: ReactElement | ReactElement[] }> = ({
	children,
	openedModalName,
}) => {
	const { setOpenModal, setModalPosition } = useModalContext()

	const handleOpenModal = () => {
		const xPosition = (window.scrollX + window.innerWidth / 2).toString()
		const yPosition = (window.scrollY + window.innerHeight / 2).toString()
		setModalPosition({ xPosition, yPosition })
		setOpenModal(openedModalName)
	}

	if (Array.isArray(children)) return children.map((child) => cloneElement(child, { onClick: close }))
	return cloneElement(children, { onClick: handleOpenModal })
}

export const ModalWindow: FC<IModalWindow> = ({
	modalName,
	children,
	showCloseIcon = true,
	modalWindowStyles,
}) => {
	const { openModal, close, modalWindowRef, modalPosition } = useModalContext()
	const isModalOpen = openModal.length > 0
	const overlayRef = useCalculateWindowHeight(isModalOpen)
	useOutsideClick(modalWindowRef, close)

	useEffect(() => {
		if (modalWindowRef.current) {
			modalWindowRef.current.style.top = `${modalPosition?.yPosition}px`
			modalWindowRef.current.style.left = `${modalPosition?.xPosition}px`
		}
	}, [modalPosition, modalWindowRef])

	const modalWindowClasses = `${styles.modalContainer} ${modalWindowStyles ? modalWindowStyles : ''}`

	const motionVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	if (modalName !== openModal) return null

	return createPortal(
		<motion.div
			initial='hidden'
			animate={isModalOpen ? 'visible' : 'hidden'}
			variants={motionVariants}
			className={styles.modalOverlay}
			transition={{ duration: 0.1 }}
			ref={overlayRef}
		>
			<motion.div
				ref={modalWindowRef}
				initial='hidden'
				animate={isModalOpen ? 'visible' : 'hidden'}
				variants={motionVariants}
				transition={{ duration: 0.2 }}
				className={modalWindowClasses}
			>
				{showCloseIcon && (
					<XMarkIcon onClick={close} className='h-6 w-6 cursor-pointer absolute top-1.5 right-1.5' />
				)}
				{children}
			</motion.div>
		</motion.div>,
		document.body
	)
}

export const ModalClose: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
	const { close } = useModalContext()
	if (Array.isArray(children)) return children.map((child) => cloneElement(child, { onClick: close }))

	return cloneElement(children, { onClick: close })
}
