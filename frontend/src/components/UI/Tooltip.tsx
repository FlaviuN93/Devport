import { FC } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import styles from './Tooltip.module.css'

interface TooltipProps {
	content: string
	position: tPositions
	tooltipStyles?: TailwindClasses
	hoverTooltip?: boolean
}

const Tooltip: FC<TooltipProps> = ({ content, position, tooltipStyles = '', hoverTooltip }) => {
	const toolTipClasses = `${styles.tooltipContent} ${tooltipStyles} ${styles[position]}`

	return (
		<div className={styles.inlineContainer}>
			<div className={styles.tooltipContainer}>
				{hoverTooltip && <span className={toolTipClasses}>{content}</span>}
			</div>
		</div>
	)
}

export default Tooltip
