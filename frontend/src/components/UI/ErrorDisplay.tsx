import { FC } from 'react'
import styles from './ErrorDisplay.module.css'
import { IDefaultError } from '../../services/types'
import Button from './Button'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

interface IErrorDisplay {
	resetErrorBoundary: () => void
	error: IDefaultError
}

export const ErrorDisplay: FC<IErrorDisplay> = ({ error, resetErrorBoundary }) => {
	return (
		<main className={styles.errorBackground}>
			<div className={styles.errorBox}>
				<h2 className='mb-2'>{error.statusTitle} 🫠</h2>
				<p className='mb-4'>{error.message}</p>
				<Button icon={<ArrowUturnLeftIcon className='h-5 w-5' />} onClick={resetErrorBoundary} buttonText='Try again' />
			</div>
		</main>
	)
}

export default ErrorDisplay
