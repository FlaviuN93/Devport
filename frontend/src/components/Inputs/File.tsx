import { ReactNode, useId, useRef, useEffect, useState } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import { motion } from 'framer-motion'
import styles from './File.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface FileProps<T extends FieldValues> {
	register: UseFormRegister<T>
	onFileUpload: (file: File) => void
	name: Path<T>
	buttonText: string
	label?: string
	icon?: ReactNode
	fileStyles?: TailwindClasses
	labelStyles?: TailwindClasses
	error?: string
	errorPosition?: tPositions
}

const File = <T extends FieldValues>({
	fileStyles = '',
	name,
	labelStyles = '',
	label,
	buttonText,
	icon,
	onFileUpload,
	register,
}: FileProps<T>) => {
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
					onChange={(event) => event.target.files && onFileUpload(event.target.files[0])}
					ref={() => register(name)}
					aria-describedby={`${uniqueId}-${name}`}
					type='file'
				/>
			</div>
		</div>
	)
}

export default File
