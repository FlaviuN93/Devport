import { FC, ReactNode, useState } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import styles from './Tooltip.module.css'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

interface TooltipProps {
	content: string
	position: tPositions
	tooltipStyles?: TailwindClasses
	iconStyles?: TailwindClasses
	icon?: ReactNode
}

const Tooltip: FC<TooltipProps> = ({ content, position, tooltipStyles = '', iconStyles = '', icon }) => {
	const [toggle, setToggle] = useState(false)
	const toolTipClasses = `${styles.tooltipContent} ${tooltipStyles} ${styles[position]} `
	const iconClasses = `${styles.tooltipIcon} ${iconStyles}`

	return (
		<div className={styles.inlineContainer}>
			<div className={styles.tooltipContainer}>
				{!icon ? (
					<span
						className={iconClasses}
						onMouseOver={() => setToggle(true)}
						onMouseOut={() => setToggle(false)}
					>
						<InformationCircleIcon className='h-6 w-6' />
					</span>
				) : (
					<span className={iconClasses}>{icon}</span>
				)}
				{toggle && <span className={toolTipClasses}>{content}</span>}
			</div>
		</div>
	)
}

export default Tooltip
