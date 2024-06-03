import { ChangeEvent, FC, ReactNode } from 'react'
import styles from './Slider.module.css'
import { TailwindClasses } from '../../utils/types'

interface ISlider {
	min: number
	max: number
	step: number
	value: number
	onSliderChange: (value: number) => void
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	label?: string
	sliderStyles?: TailwindClasses
	sliderContainerStyles?: TailwindClasses
}

const Slider: FC<ISlider> = ({
	min,
	max,
	label,
	onSliderChange,
	step,
	value,
	leftIcon,
	rightIcon,
	sliderStyles,
	sliderContainerStyles,
}) => {
	const sliderClasses = `${styles.slider} ${sliderStyles ? sliderStyles : ''}`
	const sliderContainerClasses = `${sliderContainerStyles ? sliderContainerStyles : ''} ${styles.sliderContainer}`

	return (
		<div className='w-full'>
			<label className='font-medium mb-2' htmlFor='slider'>
				{label}
			</label>
			<div className={sliderContainerClasses}>
				{leftIcon && <span>{leftIcon}</span>}
				<input
					id='slider'
					type='range'
					className={sliderClasses}
					value={value}
					min={min}
					max={max}
					step={step}
					aria-labelledby={label}
					onChange={(e: ChangeEvent<HTMLInputElement>) => onSliderChange(+e.target.value)}
				/>
				{rightIcon && <span>{rightIcon}</span>}
			</div>
		</div>
	)
}

export default Slider
