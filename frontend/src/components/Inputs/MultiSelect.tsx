import { useState, useRef, FC, useEffect, MutableRefObject, MouseEvent } from 'react'
import styles from './MultiSelect.module.css'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Technology } from '../../services/types'
import { TailwindClasses } from '../../utils/types'

interface MultiSelectProps {
	onChange: (selectedItem: string[]) => void
	items: Technology[] | undefined
	placeholderValue: string[]
	placeholder: string
	resetRef: MutableRefObject<(event: MouseEvent) => void>
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
	placeholderValue,
	resetRef,
	onChange,
}) => {
	const [selectedItems, setSelectedItems] = useState<string[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const isLaptop = useMediaQuery('(min-width:1024px)')
	const selectRef = useRef(null)
	const divRef = useRef(null)
	const inputClasses = `${styles.input} ${error ? styles.error : ''}`
	const [showTooltip, setShowTooltip] = useState(false)

	const handleClose = () => setIsOpen(false)
	useOutsideClick(selectRef, handleClose, { secondaryRef: divRef })

	const handleResetItems = (event: MouseEvent) => {
		if (event) event.preventDefault()
		setSelectedItems([])
		setIsOpen(false)
	}

	const handleToggleItem = async (selectedItem: Technology) => {
		setSelectedItems((prevItems) => {
			const index = prevItems.indexOf(selectedItem.name)
			if (index === -1) return [...prevItems, selectedItem.name]
			else return prevItems.filter((item) => item !== selectedItem.name)
		})
	}

	useEffect(() => {
		resetRef.current = handleResetItems
	}, [resetRef])

	useEffect(() => {
		onChange(selectedItems)
	}, [selectedItems, onChange])

	return (
		<div className='w-full'>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>
			<div className='relative mt-1' ref={divRef} onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)}>
				<input
					className={inputClasses}
					value={placeholderValue}
					id={label}
					placeholder={placeholder}
					readOnly
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				/>
				{error && (
					<Tooltip content={error} position={isLaptop ? 'right' : 'bottom'} hoverTooltip={showTooltip} tooltipStyles={tooltipStyles} />
				)}
				{placeholderValue.length > 0 && !error && (
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
									checked={placeholderValue.includes(item.name)}
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
