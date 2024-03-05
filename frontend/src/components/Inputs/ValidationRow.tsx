import { FC } from 'react'
import { tValidationType } from '../types'
import { getMessageForValidation } from '../../utils/utility'
import styles from './ValidationRow.module.css'
import CheckCircle from '../../assets/check circle.svg?react'

interface IProps {
	validationType: tValidationType
	isActive: boolean
}

const ValidationRow: FC<IProps> = ({ validationType, isActive }) => {
	const message = getMessageForValidation(validationType)

	const validationStyles = `${isActive && styles.active}`

	return (
		<span className={validationStyles}>
			<CheckCircle />
			{message}
		</span>
	)
}

export default ValidationRow
