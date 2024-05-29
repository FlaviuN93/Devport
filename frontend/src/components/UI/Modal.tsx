import { FC, ReactElement, ReactNode, cloneElement, useEffect } from 'react'
import styles from './Modal.module.css'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createPortal } from 'react-dom'
import { ModalProvider } from '../../contexts/ModalContext'
import { useDropdownContext, useModalContext } from '../../contexts/contextHooks'
import { useCalculateWindowHeight } from '../../hooks/useCalculateWindowHeight'
import { TailwindClasses } from '../../utils/types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import useKeyToClose from '../../hooks/useKeyToClose'
import { motionVariants } from '../../utils/variables'

interface IModalWindow {
	modalName: string
	children: ReactNode
	modalWindowStyles?: TailwindClasses
	showCloseIcon?: boolean
}

interface IModalOpen {
	openedModalName: string
	children: ReactElement | ReactElement[]
	isInputValid?: boolean
}

export const Modal: FC<{ children: ReactNode }> = ({ children }) => {
	return <ModalProvider>{children}</ModalProvider>
}

export const ModalOpen: FC<IModalOpen> = ({ children, openedModalName, isInputValid }) => {
	const { open } = useModalContext()

	const handleOpenModal = () => {
		open(openedModalName)
	}

	useEffect(() => {
		if (isInputValid) handleOpenModal()
	}, [isInputValid])

	if (Array.isArray(children)) return children.map((child) => cloneElement(child, { onClick: handleOpenModal }))
	return cloneElement(children, { onClick: handleOpenModal })
}

export const ModalWindow: FC<IModalWindow> = ({ modalName, children, showCloseIcon = true, modalWindowStyles }) => {
	const { close, modalWindowRef, modalPosition, openModal, isOpenModal } = useModalContext()
	const { exclusionRef } = useDropdownContext()
	const overlayRef = useCalculateWindowHeight(isOpenModal)

	useKeyToClose('Escape', close)
	useOutsideClick(modalWindowRef, close)

	useEffect(() => {
		setTimeout(() => {
			if (modalWindowRef.current) {
				const topPosition = (window.innerHeight + window.scrollY * 2 - modalWindowRef.current.offsetHeight) / 2
				modalWindowRef.current.style.top = `${topPosition}px`
			}
		})
	}, [modalPosition, modalWindowRef, isOpenModal])

	const modalWindowClasses = `${styles.modalContainer} ${modalWindowStyles ? modalWindowStyles : ''}`

	if (modalName !== openModal) return null

	return createPortal(
		<div className={styles.modalOverlay} ref={overlayRef}>
			<motion.div
				initial='hidden'
				animate={isOpenModal ? 'visible' : 'hidden'}
				variants={motionVariants}
				transition={{ duration: 0.3 }}
				ref={modalWindowRef}
				className={modalWindowClasses}
			>
				<div ref={exclusionRef}>
					{showCloseIcon && <XMarkIcon onClick={close} className='h-6 w-6 cursor-pointer absolute top-3 right-4' />}
					{children}
				</div>
			</motion.div>
		</div>,
		document.body
	)
}

export const ModalClose: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
	const { close } = useModalContext()
	if (Array.isArray(children)) return children.map((child) => cloneElement(child, { onClick: close }))

	return cloneElement(children, { onClick: close })
}
