import { ChangeEvent, FC, KeyboardEvent } from 'react'

interface IProps {
	onChange: (e: ChangeEvent) => void
	placeholder: string
	disabled?: boolean
	defaultValue?: string
	id?: string
	maxLength?: number
	onEnterPress?: (e: KeyboardEvent) => void
}

const Input: FC<IProps> = ({ onChange, disabled = false, id = 'input', onEnterPress, placeholder }) => {
	const handleChange = (e: ChangeEvent) => {
		if (!disabled && onChange) onChange(e)
	}

	const handleEnterKey = (e: KeyboardEvent) => {
		if (!disabled && onEnterPress) onEnterPress(e)
	}

	return (
		<div>
			<label htmlFor={id}></label>
			<input
				id={id}
				placeholder={placeholder}
				aria-placeholder={placeholder}
				type='text'
				aria-disabled={disabled ? 'true' : 'false'}
				onChange={handleChange}
				onKeyUp={handleEnterKey}
			/>
		</div>
	)
}

export default Input
