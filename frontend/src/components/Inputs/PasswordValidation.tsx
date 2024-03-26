import { FC } from 'react'
import { getMessageForValidation, PasswordValidationType } from '../../utils/utility'
import styles from './PasswordValidation.module.css'
import CheckCircle from '../../assets/check circle.svg?react'

interface IProps {
	type: string
	isActive: boolean
}

const PasswordValidation: FC<IProps> = ({ type, isActive }) => {
	const messageKey = type as PasswordValidationType
	const message = getMessageForValidation(messageKey)
	const rowClasses = `${isActive && styles.active}`

	return (
		<div>
			{}
			<span className={rowClasses}>
				<CheckCircle />
				{message}
			</span>
		</div>
	)
}

export default PasswordValidation
