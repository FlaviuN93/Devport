import { ChangeEvent, FC, ReactNode, useId, useRef, useEffect, useState } from 'react'
import { TailwindClasses } from '../types'
import { motion } from 'framer-motion'
import styles from './File.module.css'

export interface FileProps {
	onChange: (value: File) => void
	register: (name: string) => void
	name: string
	buttonText: string
	label?: string
	icon?: ReactNode
	fileStyles?: TailwindClasses
	labelStyles?: TailwindClasses
}

const File: FC<FileProps> = ({
	onChange,
	fileStyles = '',
	name,
	labelStyles = '',
	label,
	buttonText,
	icon,
	register,
}) => {
	const uniqueId = useId()
	const divRef = useRef<HTMLDivElement>(null)
	const [size, setSize] = useState({ width: '0', height: '0' })

	useEffect(() => {
		const width = `${divRef.current?.offsetWidth}px`
		const height = `${divRef.current?.offsetHeight}px`
		setSize({
			width,
			height,
		})
	}, [size.width, size.height])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		e.target.files && onChange(e.target.files[0])

	const fileClasses = `${styles.fileButton} ${fileStyles}`
	const labelClasses = `${styles.label} ${labelStyles}`

	return (
		<div className={styles.fileContainer}>
			<label className={labelClasses} htmlFor={label}>
				{label}
			</label>
			<div className={fileClasses} ref={divRef} role='button' tabIndex={0}>
				{icon && <span className='mr-1.5'>{icon}</span>}
				<span className='font-medium'>{buttonText}</span>
				<motion.input
					animate={size}
					name={name}
					className='absolute opacity-0'
					id={uniqueId}
					ref={() => register(name)}
					aria-describedby={`${uniqueId}-${name}`}
					type='file'
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}

export default File
