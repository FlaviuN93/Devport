import React, { FC, ReactNode, useRef } from 'react'
import { TailwindClasses, tPositions } from '../types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import styles from './Dropdown.module.css'
import { useDropdownContext } from '../../contexts/contextHooks'
import Button from './Button'
import Avatar from './Avatar'
import { DropdownProvider } from '../../contexts/DropdownContext'

interface ToggleProps {
	type?: 'avatar' | 'button'
	styles?: TailwindClasses
	imageUrl?: string
	iconPos?: 'left' | 'right'
	icon?: ReactNode
	buttonText?: string
}

interface MenuProps {
	position?: tPositions
	children: ReactNode
	menuStyles?: TailwindClasses
}

interface ItemProps {
	children: ReactNode
	itemStyles?: TailwindClasses
}

const Dropdown: FC<{ children: ReactNode }> = ({ children }) => {
	return <DropdownProvider>{children}</DropdownProvider>
}

const DropdownMenu: FC<MenuProps> = ({ children, position = 'center' }) => {
	const { isOpen, handleClose } = useDropdownContext()

	useOutsideClick(dropdownRef, handleClose)

	const menuClasses = `${styles.menu} ${styles[position]}`

	return (
		<>
			{isOpen && (
				<div ref={dropdownRef} className={menuClasses}>
					{children}
				</div>
			)}
		</>
	)
}

const DropdownToggle: FC<ToggleProps> = ({
	type = 'button',
	styles,
	buttonText,
	icon,
	iconPos,
	imageUrl,
}) => {
	const { handleToggle } = useDropdownContext()

	return (
		<div className='relative' id='dropdownToggle'>
			{type === 'button' ? (
				<Button
					buttonText={buttonText}
					icon={icon}
					iconPos={iconPos}
					onClick={() => {}}
					buttonStyles={styles}
				/>
			) : (
				<Avatar
					imageUrl={imageUrl}
					icon={icon}
					role='button'
					onClick={handleToggle}
					avatarStyles={styles}
				/>
			)}
		</div>
	)
}

const DropdownItem: FC<ItemProps> = ({ children, itemStyles }) => {
	const itemClasses = `${styles.item} ${itemStyles}`
	return <div className={itemClasses}>{children}</div>
}

const DropdownDivider: FC<{ dividerStyles?: TailwindClasses }> = ({ dividerStyles }) => {
	const dividerClasses = `${styles.divider} ${dividerStyles}`
	return <hr className={dividerClasses} />
}

export { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, DropdownDivider }
