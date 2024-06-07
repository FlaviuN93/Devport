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
	formName?: string
	buttonStyles?: TailwindClasses
	iconStyles?: TailwindClasses
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
	formName,
	buttonStyles,
	iconStyles,
}) => {
	const buttonClasses = `${styles.button} ${disabled ? styles.disabled : ''} ${variant ? styles[variant] : ''} ${
		buttonStyles ? buttonStyles : ''
	}`
	const iconClasses = `inline-block ${iconPos ? styles[iconPos] : ''} ${iconStyles}`
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
			form={formName}
		>
			{isLoading && <span className={`${styles.spinner} ${iconClasses}`}></span>}
			{icon && !isLoading && <span className={iconClasses}>{icon}</span>}
			<span>{buttonText}</span>
		</button>
	)
}

export default Button
