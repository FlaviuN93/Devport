import { useState, useRef, FC, useEffect } from 'react'
import styles from './MultiSelect.module.css'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Item } from '../../services/types'
import { TailwindClasses } from '../../utils/types'

interface MultiSelectProps {
	onChange: (selectedItem: string[]) => void
	items: Item[] | undefined
	placeholderValue: string[]
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
	placeholderValue = '',
	onChange,
}) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const isLaptop = useMediaQuery('(min-width:1024px)')
	const selectRef = useRef(null)
	const divRef = useRef(null)
	const inputClasses = `${styles.input} ${error ? styles.error : ''}`

	const handleClose = () => setIsOpen(false)
	useOutsideClick(selectRef, handleClose, divRef)

	const handleResetItems = () => {
		setSelectedItems([])
		setIsOpen(false)
	}

	const handleToggleItem = async (selectedItem: Item) => {
		setSelectedItems((prevItems) => {
			const index = prevItems.indexOf(selectedItem.name)
			if (index === -1) return [...prevItems, selectedItem.name]
			else return prevItems.filter((item) => item !== selectedItem.name)
		})
	}

	useEffect(() => {
		onChange(selectedItems)
	}, [selectedItems, onChange])

	return (
		<div className='w-full'>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>
			<div className='relative mt-1' ref={divRef}>
				<input
					className={inputClasses}
					value={placeholderValue}
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
				{isOpen && (
					<ul className={styles.itemList} ref={selectRef}>
						{items.map((item) => (
							<label key={item.id} className={styles.item}>
								<input
									name={item.name}
									type='checkbox'
									checked={selectedItems.includes(item.name)}
									onChange={() => handleToggleItem(item)}
									className={styles.checkboxItem}
								/>
								{item.name}
							</label>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default MultiSelect
