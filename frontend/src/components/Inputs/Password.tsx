import { useId, useState } from 'react'
import { TailwindClasses } from '../../utils/types'
import styles from './Password.module.css'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Tooltip from '../UI/Tooltip'
import useMediaQuery from '../../hooks/useMediaQuery'

export interface PasswordProps<T extends FieldValues> {
	register: UseFormRegister<T>
	name: Path<T>
	placeholder: string
	disabled?: boolean
	label?: string
	showPasswordBtn?: boolean
	tooltipStyles?: TailwindClasses
	passwordStyles?: TailwindClasses
	error?: string | boolean
}

const Password = <T extends FieldValues>({
	disabled = false,
	placeholder,
	tooltipStyles = '',
	passwordStyles = '',
	label,
	name,
	register,
	showPasswordBtn = false,
	error,
}: PasswordProps<T>) => {
	const [showPassword, setShowPassword] = useState(false)
	const uniqueId = useId()
	const isLaptop = useMediaQuery('(min-width:1024px)')
	const handleTogglePassword = () => {
		setShowPassword((prevState) => !prevState)
	}
	const passwordClasses = `${styles.password} ${passwordStyles} ${error ? styles.error : ''}`

	return (
		<div>
			<label className={styles.label} htmlFor={label} aria-label={label}>
				{label}
			</label>

			<div className='relative mt-1'>
				<input
					{...register(name)}
					className={passwordClasses}
					name={name}
					id={uniqueId}
					placeholder={placeholder}
					aria-placeholder={placeholder}
					aria-describedby={`${uniqueId}-${name}`}
					type={showPassword ? 'text' : 'password'}
					disabled={disabled}
					aria-disabled={disabled ? 'true' : 'false'}
				/>

				{showPasswordBtn && (
					<button className={styles.passwordIcon} onClick={handleTogglePassword}>
						{showPassword ? <EyeIcon className='h-6 w-6' /> : <EyeSlashIcon className='h-6 w-6' />}
					</button>
				)}

				{error && typeof error === 'string' && (
					<Tooltip
						position={isLaptop ? 'right' : 'left'}
						content={error}
						tooltipStyles={tooltipStyles}
					/>
				)}
			</div>
		</div>
	)
}

export default Password
