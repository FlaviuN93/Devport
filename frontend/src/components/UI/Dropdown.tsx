import React, { FC, ReactNode } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import styles from './Dropdown.module.css'
import { useDropdownContext } from '../../contexts/contextHooks'

import { DropdownProvider } from '../../contexts/DropdownContext'

interface ToggleProps {
	imageUrl?: string
	icon?: ReactNode
	buttonText?: string
	btnStyles?: TailwindClasses
}

interface MenuProps {
	position: tPositions
	children: ReactNode
	menuStyles?: TailwindClasses
}

interface ItemProps {
	itemId: string
	children: ReactNode
	itemStyles?: TailwindClasses
}

const Dropdown: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<DropdownProvider>
			<div className='relative w-min min-w-10'>{children}</div>
		</DropdownProvider>
	)
}

const DropdownMenu: FC<MenuProps> = ({ children, position = 'bottom' }) => {
	const { isOpen, handleClose, menuRef, dropdownBtnRef } = useDropdownContext()
	useOutsideClick(menuRef, handleClose, dropdownBtnRef)

	const menuClasses = `${styles.menu} ${styles[position]}`

	return (
		<>
			{isOpen && (
				<div ref={menuRef} className={menuClasses}>
					{children}
				</div>
			)}
		</>
	)
}

const DropdownToggle: FC<ToggleProps> = ({ btnStyles = '', buttonText, icon, imageUrl }) => {
	const { handleToggle, dropdownBtnRef } = useDropdownContext()

	const buttonClasses = `${styles.dropdownToggle} ${btnStyles}`
	const iconClasses = `${icon && buttonText && 'ml-2'}`

	return (
		<button ref={dropdownBtnRef} className={buttonClasses} onClick={handleToggle}>
			{imageUrl ? (
				<img src={imageUrl} className={styles.toggleImage} alt='Avatar' />
			) : (
				<>
					<span>{buttonText}</span>
					{icon && <span className={iconClasses}>{icon}</span>}
				</>
			)}
		</button>
	)
}

const DropdownItem: FC<ItemProps> = ({ children, itemStyles = '', itemId }) => {
	const { selectedItemId, handleSelect } = useDropdownContext()
	const itemClasses = `${styles.item} ${itemStyles} ${selectedItemId === itemId ? styles.active : ''}`

	const handleClick = () => itemId && handleSelect(itemId)

	return (
		<div className={itemClasses} onClick={handleClick}>
			{children}
		</div>
	)
}

const DropdownDivider: FC<{ dividerStyles?: TailwindClasses }> = ({ dividerStyles = '' }) => {
	const dividerClasses = `${styles.divider} ${dividerStyles}`
	return <hr className={dividerClasses} />
}

export { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, DropdownDivider }
