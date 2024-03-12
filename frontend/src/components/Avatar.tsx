import React, { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react'
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
	onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

const Avatar: FC<AvatarProps> = ({
	imageUrl,
	altText,
	size,
	icon,
	avatarType = 'primary',
	iconStyles,
	onClick,
}) => {
	const avatarClasses = `${styles.avatarContainer} ${styles[avatarType]}`
	const iconClasses = `${styles.icon} ${iconStyles}`
	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		if (onClick) onClick(event)
	}
	return (
		<div
			className={avatarClasses}
			style={{ width: size, height: size }}
			role='button'
			onClick={handleClick}
		>
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
