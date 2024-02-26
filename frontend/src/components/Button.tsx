import { FC, MouseEvent, ReactNode } from 'react'
import { tButtonHtmlType, tButtonType, tSize } from './types'
import styles from './Button.module.css'
// import { XMarkIcon, CheckIcon } from '@heroicons/react/16/solid'
import AirplayIcon from '../assets/airplay.svg?react'
interface IProps {
	htmlType: tButtonHtmlType
	onClick: (event: MouseEvent) => void
	buttonText: string
	type?: tButtonType
	size?: tSize
	pressed?: boolean
	disabled?: boolean
	danger?: boolean
	icon?: ReactNode
	isError?: boolean
	isLoading?: boolean
	isSuccess?: boolean
}

const Button: FC<IProps> = ({
	disabled = false,
	htmlType = 'button',
	size = 'auto',
	onClick,
	icon,
	buttonText,
	danger = false,
	isLoading = false,
	isError = false,
	isSuccess = false,
	pressed = false,
	type = 'primary',
}) => {
	const buttonClasses = `${styles.button} ${styles[size]} ${styles[type]} ${
		danger && styles.danger
	}`

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
			type={htmlType}
			aria-pressed={pressed ? 'true' : undefined}
			aria-disabled={disabled ? 'true' : 'false'}
			onClick={handleClick}
		>
			{isLoading ? (
				<span className={styles.loading}>Loading...</span>
			) : isError ? (
				<span className={styles.error}>{<AirplayIcon />} Error</span>
			) : isSuccess ? (
				<span className={styles.success}>
					{/* {<CheckIcon />}  */}
					Success
				</span>
			) : (
				<div>
					{icon && <span className={styles.icon}>{icon}</span>}
					<span className={styles.text}>{buttonText}</span>
				</div>
			)}
		</button>
	)
}

export default Button
