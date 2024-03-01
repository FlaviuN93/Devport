import { FC } from 'react'
import { tValidationType } from '../types'
import { getMessageForValidation } from '../../utils/utility'
import styles from './ValidationRow.module.css'
import CheckCircle from '../../assets/check circle.svg?react'

interface IProps {
	validationType: tValidationType
	isActive: boolean
	password: string
}

const ValidationRow: FC<IProps> = ({ validationType, isActive }) => {
	const message = getMessageForValidation(validationType)
	const validationStyles = `${isActive && styles.active}`

	const validatePassword = (password: string) => {
		const hasLowerCase = /[a-z]/.test(password)
		const hasUpperCase = /[A-Z]/.test(password)
		const hasNumber = /\d/.test(password)
		const hasMinLength = password.length >= 8
		const hasSpecialChar = /[\W_]/.test(password)

		return { hasLowerCase, hasUpperCase, hasSpecialChar, hasNumber, hasMinLength }
	}
	return (
		<span className={validationStyles}>
			<CheckCircle />
			{message}
		</span>
	)
}

export default ValidationRow
