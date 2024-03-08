import { ChangeEvent, FC, useId } from 'react'
import { TailwindClasses } from '../types'
import styles from './Text.module.css'

export interface TextProps {
	onChange: (value: string) => void
	register: (name: string) => void
	name: string
	type: 'input' | 'textarea'
	placeholder: string
	label?: string
	value?: string
	disabled?: boolean
	labelStyles?: TailwindClasses
	textStyles?: TailwindClasses
	rows?: number
	cols?: number
}

const Text: FC<TextProps> = ({
	onChange,
	disabled = false,
	value,
	placeholder,
	labelStyles = '',
	textStyles = '',
	label,
	register,
	name,
	type,
	rows,
	cols,
}) => {
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => !disabled && onChange(e.target.value)
	const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => !disabled && onChange(e.target.value)
	const uniqueId = useId()

	const labelClasses = `${styles.label} ${labelStyles}`
	const textClasses = `${styles.text} ${textStyles}`

	return (
		<div className={styles.textContainer}>
			<label className={labelClasses} htmlFor={label} aria-label={label}>
				{label}
			</label>

			{type === 'input' ? (
				<input
					name={name}
					className={textClasses}
					id={label}
					ref={() => register(name)}
					placeholder={placeholder}
					disabled={disabled}
					aria-placeholder={placeholder}
					aria-describedby={`${uniqueId}-${name}`}
					value={value}
					type='text'
					aria-disabled={disabled ? 'true' : 'false'}
					onChange={handleInput}
				/>
			) : (
				<textarea
					name={name}
					className={textClasses}
					id={label}
					disabled={disabled}
					ref={() => register(name)}
					placeholder={placeholder}
					aria-placeholder={placeholder}
					aria-describedby={`${uniqueId}-${name}`}
					value={value}
					aria-disabled={disabled ? 'true' : 'false'}
					onChange={handleTextarea}
					rows={rows}
					cols={cols}
				/>
			)}
		</div>
	)
}

export default Text
