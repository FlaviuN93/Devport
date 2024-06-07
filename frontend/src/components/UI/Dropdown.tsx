import { FC, ReactNode } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import styles from './Dropdown.module.css'
import { useDropdownContext } from '../../contexts/contextHooks'

import { DropdownProvider } from '../../contexts/DropdownContext'
import useKeyToClose from '../../hooks/useKeyToClose'

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
	children: ReactNode
	itemId?: string
	itemStyles?: TailwindClasses
	closeOnClick?: boolean
}

const Dropdown: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<DropdownProvider>
			<div className='relative w-fit min-w-10'>{children}</div>
		</DropdownProvider>
	)
}

const DropdownMenu: FC<MenuProps> = ({ children, position = 'bottom', menuStyles = '' }) => {
	const { isOpen, handleClose, menuRef, dropdownBtnRef, exclusionRef } = useDropdownContext()
	useKeyToClose('Escape', handleClose)
	useOutsideClick(menuRef, handleClose, { secondaryRef: dropdownBtnRef, exclusionRef })

	const menuClasses = `${styles.menu} ${styles[position]} ${menuStyles}`

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
	const iconClasses = `${icon && buttonText ? 'ml-2' : ''}`

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

const DropdownItem: FC<ItemProps> = ({ children, itemStyles = '', itemId, closeOnClick = true }) => {
	const { selectedItemId, handleSelect, handleClose } = useDropdownContext()
	const itemClasses = `${styles.item} ${itemStyles} ${selectedItemId === itemId ? styles.active : ''}`

	return (
		<div className={itemClasses} onClick={() => closeOnClick && handleClose()} onMouseOver={() => itemId && handleSelect(itemId)}>
			{children}
		</div>
	)
}

const Divider: FC<{ dividerStyles?: TailwindClasses }> = ({ dividerStyles = '' }) => {
	const dividerClasses = `${styles.divider} ${dividerStyles}`
	return <hr className={dividerClasses} />
}

export { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Divider }
