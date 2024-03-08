import { FC, MouseEvent, ReactNode } from 'react'
import { TailwindClasses, tButtonType, tSize } from './types'
import styles from './Button.module.css'

interface ButtonProps {
	size: tSize
	buttonText?: string
	onClick?: (event: MouseEvent) => void
	type?: tButtonType
	disabled?: boolean
	danger?: boolean
	icon?: ReactNode
	iconPos?: 'left' | 'right'
	isLoading?: boolean
	buttonStyles?: TailwindClasses
}

const Button: FC<ButtonProps> = ({
	disabled = false,
	size,
	onClick,
	icon,
	buttonText,
	danger = false,
	isLoading = false,
	type,
	iconPos = 'left',
	buttonStyles,
}) => {
	const buttonClasses = `${styles.button} ${styles[size]} ${type && styles[type]} ${
		danger && styles.danger
	} ${isLoading && styles.loading} ${buttonStyles} 
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
