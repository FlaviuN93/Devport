import React, { FC, MouseEventHandler, ReactNode } from 'react'
import styles from './Avatar.module.css'
import { TailwindClasses } from '../types'

interface AvatarProps {
	imageUrl?: string
	size?: number
	icon?: ReactNode
	avatarStyles?: TailwindClasses
	iconStyles?: TailwindClasses
	role?: 'button' | 'contentInfo'
	isOpen?: boolean
	onClick?: (value: boolean) => void
}

const Avatar: FC<AvatarProps> = ({
	imageUrl,
	size = 48,
	icon,
	avatarStyles,
	isOpen,
	role = 'contentInfo',
	onClick,
}) => {
	const avatarClasses = `${styles.avatarContainer} ${avatarStyles}`

	const handleClick: MouseEventHandler<HTMLDivElement> = () => role === 'button' && onClick?.(!isOpen)

	return (
		<div
			className={avatarClasses}
			style={{ width: size, height: size }}
			role={role}
			onClick={handleClick}
		>
			{imageUrl ? <img src={imageUrl} alt='Avatar' className={styles.image} /> : <span>{icon}</span>}
		</div>
	)
}

export default Avatar
