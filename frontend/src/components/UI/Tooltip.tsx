import { FC, useState } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import styles from './Tooltip.module.css'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

interface TooltipProps {
	content: string
	position: tPositions
	tooltipStyles?: TailwindClasses
	hoverTooltip?: boolean
	showIcon?: boolean
}

const Tooltip: FC<TooltipProps> = ({
	content,
	position,
	tooltipStyles = '',
	showIcon = true,
	hoverTooltip,
}) => {
	const [toggle, setToggle] = useState(false)
	const toolTipClasses = `${styles.tooltipContent} ${tooltipStyles} ${styles[position]}`

	return (
		<div className={styles.inlineContainer}>
			<div className={styles.tooltipContainer}>
				{showIcon && (
					<span
						className={styles.tooltipIcon}
						onMouseOver={() => setToggle(true)}
						onMouseOut={() => setToggle(false)}
					>
						<InformationCircleIcon className='h-6 w-6' />
					</span>
				)}
				{toggle && showIcon && <span className={toolTipClasses}>{content}</span>}
				{hoverTooltip && <span className={` ${toolTipClasses}`}>{content}</span>}
			</div>
		</div>
	)
}

export default Tooltip
