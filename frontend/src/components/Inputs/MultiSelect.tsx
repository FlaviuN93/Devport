import React, { useState, useRef, useEffect } from 'react'
import styles from './MultiSelect.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { validateCollectionLimit } from '../../utils/functions'
import Button from '../UI/Button'
import PlusIcon from '../../assets/Plus-1.svg?react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

interface MultiSelectProps<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	items: string[]
	limit: number
	placeholder: string
	label?: string
}

const MultiSelect = <T extends FieldValues>({
	items,
	limit,
	placeholder,
	name,
	register,
	label,
}: MultiSelectProps<T>) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const selectRef = useRef(null)

	const handleClose = () => setIsOpen(false)

	useOutsideClick(selectRef, handleClose)

	const errorMessage = validateCollectionLimit(selectedItems, limit)
	const isItemActive = (item: string) => selectedItems.includes(item)

	const handleResetItems = () => setSelectedItems([])
	const handleAddItems = () => setIsOpen(false)

	const handleToggleItem = (selectedItem: string) => {
		setSelectedItems((prevItems) => {
			const index = prevItems.indexOf(selectedItem)
			if (index === -1) return [...prevItems, selectedItem]
			else return prevItems.filter((item) => item !== selectedItem)
		})
	}
	useEffect(() => {
		console.log(register(name), 'hello')
	}, [register, name])

	return (
		<div className={styles.selectContainer}>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>
			<div className='relative'>
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

					<Button
						buttonText='Add'
						buttonStyles='place-self-start py-4 w-full rounded-md'
						variant='primary'
						icon={<PlusIcon />}
						onClick={handleAddItems}
					/>
				</ul>
			)}
		</div>
	)
}

export default MultiSelect
