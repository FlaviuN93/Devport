import React, { FC, MouseEvent, ReactNode } from 'react'
import styles from './Avatar.module.css'
import { TailwindClasses } from '../../utils/types'

interface AvatarProps {
	imageUrl?: string
	icon?: ReactNode
	avatarStyles?: TailwindClasses
	role?: 'button' | 'contentInfo'
	onClick?: (event: MouseEvent) => void
}

const Avatar: FC<AvatarProps> = ({ imageUrl, icon, avatarStyles, role = 'contentInfo', onClick }) => {
	const avatarClasses = `${styles.avatarContainer} ${avatarStyles}`

	const handleClick = (event: MouseEvent<HTMLDivElement>) => role === 'button' && onClick?.(event)

	return (
		<div className={avatarClasses} role={role} onClick={handleClick}>
			{imageUrl ? <img src={imageUrl} alt='Avatar' className={styles.image} /> : <span>{icon}</span>}
		</div>
	)
}

export default Avatar
