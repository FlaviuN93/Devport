import { useState, useRef, FC, useEffect } from 'react'
import styles from './MultiSelect.module.css'

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Technology } from '../../services/types'
import { TailwindClasses } from '../../utils/types'

interface MultiSelectProps {
	onChange: (selectedValue: string[]) => void
	items: Technology[] | undefined
	selectedItem: string[] | undefined
	placeholder: string
	error?: string
	label?: string
	tooltipStyles?: TailwindClasses
}

const MultiSelect: FC<MultiSelectProps> = ({
	items = [],
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
		<div className='w-full'>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>
			<div className='relative mt-1' ref={divRef}>
				<input
					className={inputClasses}
					value={selectedItem}
					id={label}
					onChange={() => {}}
					placeholder={placeholder}
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				/>
				{error && (
					<Tooltip content={error} position={isLaptop ? 'right' : 'top'} tooltipStyles={tooltipStyles} />
				)}
				{selectedItems.length > 0 && !error && (
					<button className={styles.inputIcon} onClick={handleResetItems}>
						<XMarkIcon className='h-6 w-6' />
					</button>
				)}
			</div>
			{isOpen && (
				<ul className={styles.itemList} ref={selectRef}>
					{items.map((item) => (
						<li
							key={item.id}
							onClick={() => handleToggleItem(item.name)}
							className={`${styles.item}  ${isItemActive(item.name) ? styles.isActive : ''}`}
						>
							{item.name}
							{isItemActive(item.name) ? <CheckIcon className='h-6 w-6' /> : null}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default MultiSelect
