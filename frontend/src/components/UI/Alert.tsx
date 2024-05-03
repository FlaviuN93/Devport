import { FC, useState } from 'react'
import styles from './Alert.module.css'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/16/solid'

interface IAlert {
	message: string | string[]
	statusTitle: string
	onClose: () => void
	type?: 'success' | 'error' | 'warning' | 'info'
}

const Alert: FC<IAlert> = ({ message = '', type = 'error', onClose, statusTitle }) => {
	const [isVisible, setIsVisible] = useState(true)
	const alertClasses = `${styles.alert} `

	const statusClasses = `${styles[type]}`
	const handleClose = () => {
		setIsVisible(false)
		if (onClose) onClose()
	}

	return (
		isVisible && (
			<div className={alertClasses}>
				<div className={statusClasses}>
					<ExclamationCircleIcon className='h-6 w-6 bg-inherit' />
					<h5>{statusTitle}</h5>
				</div>
				<div>{typeof message === 'string' ? message : message.map((msg: string) => <p>{msg}</p>)}</div>
				<button onClick={handleClose}>
					<XMarkIcon className='h-4 w-4' />
				</button>
			</div>
		)
	)
}

export default Alert
