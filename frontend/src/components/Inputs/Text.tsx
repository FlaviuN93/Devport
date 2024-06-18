import { useId, useState } from 'react'
import { TailwindClasses } from '../../utils/types'
import styles from './Text.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'

export interface TextProps<T extends FieldValues> {
	name: Path<T>
	register?: UseFormRegister<T>
	placeholder: string
	variant?: 'input' | 'textarea'
	label?: string
	disabled?: boolean
	tooltipStyles?: TailwindClasses
	textStyles?: TailwindClasses
	error?: string | boolean
	rows?: number
	cols?: number
}

const Text = <T extends FieldValues>({
	register,
	name,
	disabled = false,
	placeholder,
	tooltipStyles = '',
	textStyles = 'm-0',
	label,
	variant = 'input',
	error,
	rows,
	cols,
}: TextProps<T>) => {
	const uniqueId = useId()
	const isLaptop = useMediaQuery('(min-width:1024px)')
	const textClasses = `${styles.text} ${textStyles} ${error ? styles.error : ''}`
	const [showTooltip, setShowTooltip] = useState(false)
	return (
		<div className='w-full'>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>

			<div className='relative mt-1' onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)}>
				{variant === 'input' ? (
					<input
						{...register?.(name)}
						className={textClasses}
						id={label}
						placeholder={placeholder}
						disabled={disabled}
						autoComplete='on'
						aria-placeholder={placeholder}
						aria-describedby={`${uniqueId}-${name}`}
						type='text'
						aria-disabled={disabled ? 'true' : 'false'}
					/>
				) : (
					<textarea
						{...register?.(name)}
						className={textClasses}
						id={label}
						disabled={disabled}
						autoComplete='on'
						placeholder={placeholder}
						aria-placeholder={placeholder}
						aria-describedby={`${uniqueId}-${name}`}
						aria-disabled={disabled ? 'true' : 'false'}
						rows={rows}
						cols={cols}
					/>
				)}{' '}
				{error && typeof error === 'string' && (
					<Tooltip position={isLaptop ? 'right' : 'bottom'} content={error} hoverTooltip={showTooltip} tooltipStyles={tooltipStyles} />
				)}
			</div>
		</div>
	)
}

export default Text
