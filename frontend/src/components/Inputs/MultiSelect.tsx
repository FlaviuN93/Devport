import React, { useState, useRef, FC, useEffect } from 'react'
import styles from './MultiSelect.module.css'

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { TailwindClasses } from '../../utils/types'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'

interface MultiSelectProps {
	onChange: (selectedValue: string[]) => void
	items: string[]
	selectedItem: string
	placeholder: string
	error?: string
	label?: string
	tooltipStyles?: TailwindClasses
}

const MultiSelect: FC<MultiSelectProps> = ({
	items,
	placeholder,
	label,
	error,
	tooltipStyles,
	selectedItem = '',
	onChange,
}) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const isLaptop = useMediaQuery('(min-width:1024px)')

	const selectRef = useRef(null)
	const divRef = useRef(null)

	const handleClose = () => setIsOpen(false)
	useOutsideClick(selectRef, handleClose, divRef)

	const handleResetItems = () => {
		setSelectedItems([])
		setIsOpen(false)
	}

	const handleToggleItem = async (selectedItem: string) => {
		setSelectedItems((prevItems) => {
			const index = prevItems.indexOf(selectedItem)
			if (index === -1) return [...prevItems, selectedItem]
			else return prevItems.filter((item) => item !== selectedItem)
		})
	}

	useEffect(() => {
		onChange(selectedItems)
	}, [selectedItems, onChange])

	const isItemActive = (item: string) => selectedItems.includes(item)
	const inputClasses = `${styles.input} ${error ? styles.error : ''}`

	return (
		<div className={styles.selectContainer}>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>
			<div className='relative w-full' ref={divRef}>
				<input
					className={inputClasses}
					value={selectedItem}
					onChange={() => {}}
					placeholder={placeholder}
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				/>
				{error && (
					<Tooltip
						content={error}
						position={isLaptop ? 'right' : 'left'}
						tooltipStyles={tooltipStyles}
					/>
				)}
				{selectedItems.length > 0 && (
					<button className={styles.inputIcon} onClick={handleResetItems}>
						<XMarkIcon className='h-6 w-6' />
					</button>
				)}
			</div>
			{isOpen && (
				<ul className={styles.itemList} ref={selectRef}>
					{items.map((item) => (
						<li
							key={item}
							onClick={() => handleToggleItem(item)}
							className={`${styles.item}  ${isItemActive(item) ? styles.isActive : ''}`}
						>
							{item}
							{isItemActive(item) ? <CheckIcon className='h-6 w-6' /> : null}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MultiSelect
