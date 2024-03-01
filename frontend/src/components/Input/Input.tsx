import { ChangeEvent, FC, KeyboardEvent } from 'react'
import { tInputType } from '../types'
// import { styles } from './Input.module.css'

export interface InputProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	label: string
	value?: string | number | string[]
	type?: tInputType
	disabled?: boolean
	onEnterPress?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
	onChange,
	disabled = false,
	value,
	onEnterPress,
	placeholder,
	label,
	type,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => !disabled && onChange && onChange(e)
	const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) =>
		!disabled && onEnterPress && onEnterPress(e)

	return (
		<div>
			<label htmlFor={label} aria-label={label}>
				{label}
			</label>
			<input
				id={label}
				placeholder={placeholder}
				aria-placeholder={placeholder}
				value={value}
				type={type}
				aria-disabled={disabled ? 'true' : 'false'}
				onChange={handleChange}
				onKeyUp={handleEnterKey}
			/>
		</div>
	)
}

export default Input
