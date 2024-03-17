import React, { FC, ReactNode, useRef, useState } from 'react'
import { TailwindClasses, tPositions } from '../types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import styles from './Dropdown.module.css'

interface DropdownProps {
	children: ReactNode
	onClick?: (value: boolean) => void
	position?: tPositions
	initialValue?: boolean
	dropdownStyles?: TailwindClasses
}

const Dropdown: FC<DropdownProps> = ({
	onClick,
	children,
	position = 'center',
	initialValue = false,
}) => {
	const [isOpen, setIsOpen] = useState(initialValue)
	const dropDownRef = useRef<HTMLDivElement>(null)
	const handleClose = () => {
		setIsOpen(false)
		// Call optional callback on close
		onClick?.(isOpen)
	}

	const dropDownClasses = `${styles.dropdownContent} ${styles[position]}`

	useOutsideClick(dropDownRef, handleClose)

	return (
		<div ref={dropDownRef} className={dropDownClasses}>
			{children}
		</div>
	)
}

export default Dropdown
