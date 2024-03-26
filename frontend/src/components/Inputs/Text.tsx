import { useId } from 'react'
import { TailwindClasses } from '../types'
import styles from './Text.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Tooltip from '../UI/Tooltip'

export interface TextProps<T extends FieldValues> {
	name: Path<T>
	register: UseFormRegister<T>
	placeholder: string
	variant?: 'input' | 'textarea'
	label?: string
	disabled?: boolean
	tooltipStyles?: TailwindClasses
	textStyles?: TailwindClasses
	error?: string
	rows?: number
	cols?: number
}

const Text = <T extends FieldValues>({
	register,
	name,
	disabled = false,
	placeholder,
	tooltipStyles = '',
	textStyles = '',
	label,
	variant = 'input',
	error,
	rows,
	cols,
}: TextProps<T>) => {
	const uniqueId = useId()

	const textClasses = `${styles.text} ${textStyles} ${error && styles.error}`

	return (
		<div className={styles.textContainer}>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>

			{variant === 'input' ? (
				<div className='relative'>
					<input
						{...register(name)}
						className={textClasses}
						id={label}
						placeholder={placeholder}
						disabled={disabled}
						aria-placeholder={placeholder}
						aria-describedby={`${uniqueId}-${name}`}
						type='text'
						aria-disabled={disabled ? 'true' : 'false'}
					/>
					{error && <Tooltip content={error} />}
				</div>
			) : (
				<>
					<textarea
						{...register(name)}
						className={textClasses}
						id={label}
						disabled={disabled}
						placeholder={placeholder}
						aria-placeholder={placeholder}
						aria-describedby={`${uniqueId}-${name}`}
						aria-disabled={disabled ? 'true' : 'false'}
						rows={rows}
						cols={cols}
					/>
					{error && <Tooltip content={error} tooltipStyles={tooltipStyles} />}
				</>
			)}
		</div>
	)
}

export default Text
