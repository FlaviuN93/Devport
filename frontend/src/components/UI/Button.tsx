import { FC, MouseEvent, ReactNode } from 'react'
import { TailwindClasses, tButtonType } from '../types'
import styles from './Button.module.css'

interface ButtonProps {
	onClick: (event: MouseEvent) => void
	type?: tButtonType
	buttonText?: string
	disabled?: boolean
	icon?: ReactNode
	iconPos?: 'left' | 'right'
	isLoading?: boolean
	buttonStyles?: TailwindClasses
}

const Button: FC<ButtonProps> = ({
	disabled = false,
	onClick,
	icon,
	buttonText,
	isLoading = false,
	type,
	iconPos = 'left',
	buttonStyles,
}) => {
	const buttonClasses = `${styles.button} ${type && styles[type]} ${
		isLoading && styles.loading
	} ${buttonStyles} 
	`
	let pressed = false
	const handleClick = (event: MouseEvent) => {
		if (!disabled && onClick) {
			pressed = true
			onClick(event)
		}
	}

	return (
		<button
			className={buttonClasses}
			disabled={disabled}
			aria-pressed={pressed ? 'true' : undefined}
			aria-disabled={disabled ? 'true' : 'false'}
			onClick={handleClick}
		>
			{isLoading ? (
				<span className={styles.spinner}></span>
			) : (
				<>
					{icon && iconPos === 'left' && <span className='mr-2'>{icon}</span>}
					<span>{buttonText}</span>
					{icon && iconPos === 'right' && <span className='ml-2'>{icon}</span>}
				</>
			)}
		</button>
	)
}

export default Button
