import { ChangeEvent, FC, useId, useState } from 'react'
import { TailwindClasses } from '../types'
import styles from './Text.module.css'
import Button from '../UI/Button'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'

export interface PasswordProps {
	onChange: (value: string) => void
	register: (name: string) => void
	name: string
	placeholder: string
	disabled?: boolean
	label?: string
	showPasswordBtn?: boolean
	labelStyles?: TailwindClasses
	passwordStyles?: TailwindClasses
}

const Password: FC<PasswordProps> = ({
	onChange,
	disabled = false,
	placeholder,
	labelStyles = '',
	passwordStyles = '',
	label,
	name,
	register,
	showPasswordBtn = false,
}) => {
	const [showPassword, setShowPassword] = useState(false)
	const uniqueId = useId()

	const handleTogglePassword = () => setShowPassword(!showPassword)
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => !disabled && onChange(e.target.value)

	const labelClasses = `${styles.label} ${labelStyles}`
	const passwordClasses = `${styles.text} ${passwordStyles} `
	const passwordContainerClasses = `${styles.textContainer} relative`
	const buttonClasses = `absolute top-[29px] right-0 px-2 py-2 text-[--gray]`

	return (
		<div className={passwordContainerClasses}>
			<label className={labelClasses} htmlFor={label} aria-label={label}>
				{label}
			</label>

			<input
				name={name}
				className={passwordClasses}
				id={uniqueId}
				placeholder={placeholder}
				ref={() => register(name)}
				aria-placeholder={placeholder}
				aria-describedby={`${uniqueId}-${name}`}
				type={showPassword ? 'text' : 'password'}
				disabled={disabled}
				aria-disabled={disabled ? 'true' : 'false'}
				onChange={handleChange}
			/>

			{showPasswordBtn && (
				<Button
					icon={showPassword ? <EyeIcon className='h-6 w-6' /> : <EyeSlashIcon className='h-6 w-6' />}
					onClick={handleTogglePassword}
					buttonStyles={buttonClasses}
					type='text'
				/>
			)}
		</div>
	)
}

export default Password
