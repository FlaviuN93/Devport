import { FC, MouseEvent, ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Avatar.module.css'
import { TailwindClasses } from '../../utils/types'
import { PencilIcon } from '@heroicons/react/24/solid'
import { motionVariants } from '../../utils/variables'

interface AvatarProps {
	imageUrl?: string
	icon?: ReactNode
	avatarStyles?: TailwindClasses
	role?: 'button' | 'contentInfo'
	onClick?: (event: MouseEvent) => void
	showEditIcon?: boolean
}

const Avatar: FC<AvatarProps> = ({ imageUrl, icon, avatarStyles, role = 'contentInfo', onClick, showEditIcon }) => {
	const avatarClasses = `${styles.avatarContainer} ${avatarStyles}`
	const avatarOverlay = `${showEditIcon ? styles.avatarOverlay : ''}`
	const [isEditIcon, setIsEditIcon] = useState(false)

	const handleClick = (event: MouseEvent<HTMLDivElement>) => role === 'button' && onClick?.(event)

	return (
		<div
			className={avatarClasses}
			role={role}
			onClick={handleClick}
			onMouseOver={() => setIsEditIcon(true)}
			onMouseLeave={() => setIsEditIcon(false)}
		>
			<div className={avatarOverlay}>
				<>
					<motion.div
						initial='hidden'
						animate={showEditIcon && isEditIcon ? 'visible' : 'hidden'}
						variants={motionVariants}
						transition={{ duration: 0.3 }}
					>
						<PencilIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-black dark:text-light' />
					</motion.div>

					{imageUrl ? <img src={imageUrl} alt='Avatar' className={styles.image} /> : <span>{icon}</span>}
				</>
			</div>
		</div>
	)
}

export default Avatar
