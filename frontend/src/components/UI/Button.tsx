import { FC, MouseEvent, ReactNode } from 'react'
import { TailwindClasses, tButtonType } from '../../utils/types'
import styles from './Button.module.css'

interface ButtonProps {
	onClick?: (event: MouseEvent) => void
	type?: 'button' | 'submit' | 'reset'
	buttonText?: string
	variant?: tButtonType
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
	type = 'button',
	variant,
	iconPos = 'left',
	buttonStyles,
}) => {
	const buttonClasses = `${styles.button} ${variant ? styles[variant] : ''} ${
		isLoading && styles.loading
	} ${buttonStyles} 
	`
	const iconClasses = `${icon && iconPos === 'left' && buttonText && 'mr-2'} ${
		icon && iconPos === 'right' && buttonText && 'ml-2'
	}`
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
			type={type}
		>
			{isLoading ? (
				<span className={styles.spinner}></span>
			) : (
				<>
					{icon && iconPos === 'left' && <span className={iconClasses}>{icon}</span>}
					<span>{buttonText}</span>
					{icon && iconPos === 'right' && <span className={iconClasses}>{icon}</span>}
				</>
			)}
		</button>
	)
}

export default Button
