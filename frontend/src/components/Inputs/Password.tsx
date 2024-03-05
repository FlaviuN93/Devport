import { ChangeEvent, FC, useId, useState } from 'react'
import { TailwindClasses } from '../types'
import textStyles from './Input.module.css'
import Button from '../Button'
import { EyeIcon } from '@heroicons/react/16/solid'

export interface PasswordProps {
	onChange: (value: string) => void
	register: (name: string) => void
	name: string
	placeholder: string
	disabled?: boolean
	label?: string
	showPasswordButton?: boolean
	labelStyles?: TailwindClasses
	passwordStyles?: TailwindClasses
}

const Password: FC<PasswordProps> = ({
	onChange,
	disabled = false,
	placeholder,
	labelStyles,
	passwordStyles,
	label,
	name,
	register,
	showPasswordButton = false,
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const uniqueId = useId()

	const handleTogglePassword = () => setShowPassword(!showPassword)
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => !disabled && onChange(e.target.value)

	const labelClasses = `${textStyles.label} ${labelStyles}`
	const passwordClasses = `${textStyles.input} ${passwordStyles}`

	return (
		<div>
			<div>
				<label className={labelClasses} htmlFor={label} aria-label={label}>
					{label}
				</label>

				<input
					name={name}
					className={passwordClasses}
					id={label}
					placeholder={placeholder}
					ref={() => register(name)}
					aria-placeholder={placeholder}
					aria-describedby={`${uniqueId}-${name}`}
					type={showPassword ? 'text' : 'password'}
					disabled={disabled}
					aria-disabled={disabled ? 'true' : 'false'}
					onChange={handleChange}
				/>
			</div>
			{showPasswordButton && (
				<Button
					icon={<EyeIcon className='h-6 w-6' />}
					onClick={handleTogglePassword}
					type='text'
					size='small'
				/>
			)}
		</div>
	)
}

export default Password
