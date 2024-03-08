import React, { FC, ReactNode } from 'react'
import styles from './Avatar.module.css'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { TailwindClasses } from './types'

interface AvatarProps {
	imageUrl?: string
	altText?: string
	size?: number
	avatarType?: 'primary' | 'secondary'
	icon?: ReactNode
	iconStyles?: TailwindClasses
}

const Avatar: FC<AvatarProps> = ({
	imageUrl,
	altText,
	size,
	icon,
	avatarType = 'primary',
	iconStyles,
}) => {
	const avatarClasses = `${styles.avatarContainer} ${styles[avatarType]}`
	const iconClasses = `${styles.icon} ${iconStyles}`
	return (
		<div className={avatarClasses} style={{ width: size, height: size }}>
			{imageUrl ? (
				<img src={imageUrl} alt={altText} className={styles.image} />
			) : (
				<UserCircleIcon className={iconClasses} />
			)}
			{icon && !imageUrl && <span className={iconClasses}>{icon}</span>}
		</div>
	)
}

export default Avatar
