import { FC } from 'react'
import { getMessageForValidation } from '../../utils/functions'
import styles from './PasswordValidation.module.css'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { PasswordValidationType } from '../../utils/types'

interface IProps {
	type: string
	isActive: boolean
}

const PasswordValidation: FC<IProps> = ({ type, isActive }) => {
	const messageKey = type as PasswordValidationType
	const message = getMessageForValidation(messageKey)

	const activeClass = `${isActive && 'text-violet'} w-4 h-4 text-lightGray transition-colors duration-200`

	return (
		<div className={styles.container}>
			<span className={activeClass}>
				<CheckCircleIcon />
			</span>
			<span>{message}</span>
		</div>
	)
}

export default PasswordValidation
