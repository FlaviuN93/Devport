import { FC, ReactElement, ReactNode, cloneElement } from 'react'
import { motion } from 'framer-motion'
import styles from './Modal.module.css'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createPortal } from 'react-dom'
import { ModalProvider } from '../../contexts/ModalContext'
import { useModalContext } from '../../contexts/contextHooks'
import { useCalculateHeight } from '../../hooks/useCalculateHeight'
import { TailwindClasses } from '../../utils/types'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface IModalWindow {
	modalName: string
	children: ReactNode
	modalWindowStyles: TailwindClasses
	showCloseIcon?: boolean
}

export const Modal: FC<{ children: ReactNode }> = ({ children }) => {
	return <ModalProvider>{children}</ModalProvider>
}

export const ModalOpen: FC<{ openedModalName: string; children: ReactElement }> = ({
	children,
	openedModalName,
}) => {
	const { setOpenModal } = useModalContext()

	return cloneElement(children, { onClick: () => setOpenModal(openedModalName) })
}

export const ModalWindow: FC<IModalWindow> = ({
	modalName,
	children,
	showCloseIcon = true,
	modalWindowStyles,
}) => {
	const { openModal, close, modalWindowRef } = useModalContext()
	const isModalOpen = openModal.length > 0
	const overlayRef = useCalculateHeight(isModalOpen)
	useOutsideClick(modalWindowRef, close)

	const modalWindowClasses = `${styles.modalContainer} ${modalWindowStyles}`

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
			transition={{ duration: 0.2 }}
			className={styles.modalOverlay}
			ref={overlayRef}
		>
			<div className={styles.modalWrapper}>
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
			</div>
		</motion.div>,
		document.body
	)
}

export const ModalClose: FC<{ children: ReactElement }> = ({ children }) => {
	const { close } = useModalContext()
	return cloneElement(children, { onClick: close })
}
