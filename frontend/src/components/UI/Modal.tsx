import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'
import styles from './Modal.module.css'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { createPortal } from 'react-dom'

interface IModal {
	showModal: boolean
	onHide: () => void
	children: ReactNode
}

interface IModalHeader {
	closeButton: boolean
	children: ReactNode
}

export const Modal: FC<IModal> = ({ children, showModal, onHide }) => {
	return createPortal(<div className={styles.modalOverlay}>{children}</div>, document.body)
}

export const ModalOpen: FC<{ htmlFor: string; children: ReactNode }> = ({ htmlFor, children }) => {
	return <div>{children}</div>
}

export const ModalWindow = () => {
	const motionVariants = {
		hidden: { display: 'none', opacity: 0 },
		visible: { display: 'flex', opacity: 1 },
	}

	return (
		<motion.div
			initial='hidden'
			animate={showModal ? 'visible' : 'hidden'}
			variants={motionVariants}
			transition={{ duration: 0.5 }}
			className={styles.modalContainer}
		>
			<label htmlFor=''></label>
		</motion.div>
	)
}

export const ModalHeader: FC<IModalHeader> = ({ closeButton, children }) => {
	return (
		<div className={styles.modalHeader}>
			<span className={styles.modalCloseButton}>{closeButton && <XMarkIcon className='h-5 w-5' />}</span>
			{children}
		</div>
	)
}

export const ModalBody: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.modalBody}>{children}</div>
}

export const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.modalFooter}>{children}</div>
}
