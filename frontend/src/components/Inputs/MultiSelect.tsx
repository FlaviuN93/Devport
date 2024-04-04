import React, { useState, useRef, useEffect } from 'react'
import styles from './MultiSelect.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'

interface MultiSelectProps<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	items: string[]
	placeholder: string
	label?: string
	error?: string
}

const MultiSelect = <T extends FieldValues>({
	items,
	error,
	placeholder,
	name,
	register,
	label,
}: MultiSelectProps<T>) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const isLaptop = useMediaQuery('(min-width:1024px)')

	const selectRef = useRef(null)
	const divRef = useRef(null)
	const handleClose = () => setIsOpen(false)

	useOutsideClick(selectRef, handleClose, divRef)

	const isItemActive = (item: string) => selectedItems.includes(item)

	const handleResetItems = () => {
		setSelectedItems([])
		setIsOpen(false)
	}

	const handleToggleItem = (selectedItem: string) => {
		setSelectedItems((prevItems) => {
			const index = prevItems.indexOf(selectedItem)
			if (index === -1) return [...prevItems, selectedItem]
			else return prevItems.filter((item) => item !== selectedItem)
		})
	}
	// useEffect(() => {
	// 	console.log(register(name), 'hello')
	// }, [register, name])

	return (
		<div className={styles.selectContainer}>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>
			<div className='relative' ref={divRef}>
				<div
					className={styles.selectedItemContainer}
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				>
					{selectedItems.length > 0 ? (
						selectedItems.map((item) => (
							<span key={item} className={styles.selectedItem}>
								{item}
							</span>
						))
					) : (
						<span>{placeholder}</span>
					)}
				</div>
				{selectedItems.length > 0 && (
					<button className={styles.inputIcon} onClick={handleResetItems}>
						<XMarkIcon className='h-6 w-6' />
					</button>
				)}
				{error && <Tooltip content={error} position={isLaptop ? 'right' : 'left'} />}
			</div>

			{isOpen && (
				<select className={styles.itemList} {...register(name)} multiple>
					{items.map((item) => (
						<option
							key={item}
							value={item}
							className={`${styles.item}  ${isItemActive(item) ? styles.isActive : ''}`}
						>
							{item}
							{isItemActive(item) ? <CheckIcon className='h-6 w-6' /> : null}
						</option>
					))}
				</select>
			)}
		</div>
	)
}

export default MultiSelect
