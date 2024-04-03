import { ReactNode, useId, useRef, useEffect, useState } from 'react'
import { TailwindClasses, tPositions } from '../../utils/types'
import { motion } from 'framer-motion'
import styles from './File.module.css'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import Tooltip from '../UI/Tooltip'

export interface FileProps<T extends FieldValues> {
	register: UseFormRegister<T>
	onFileUpload: (file: File) => void
	name: Path<T>
	buttonText: string
	label?: string
	icon?: ReactNode
	fileStyles?: TailwindClasses
	error?: string
	tooltipPosition?: tPositions
	tooltipStyles?: TailwindClasses
}

const File = <T extends FieldValues>({
	fileStyles = '',
	name,
	label,
	buttonText,
	icon,
	onFileUpload,
	error,
	tooltipPosition,
	register,
	tooltipStyles,
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

	const fileContainerClasses = `${styles.fileContainer} ${!label ? 'flex-row' : ''}`
	const fileClasses = `${styles.fileButton} ${fileStyles} relative`

	return (
		<div className={fileContainerClasses}>
			<label className={styles.label} htmlFor={label}>
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
				{error && <Tooltip content={error} position={tooltipPosition} tooltipStyles={tooltipStyles} />}
			</div>
		</div>
	)
}

export default File
