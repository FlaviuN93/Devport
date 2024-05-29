import { ChangeEvent, FC } from 'react'
import styles from './Slider.module.css'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { TailwindClasses } from '../../utils/types'

interface ISlider {
	min: number
	max: number
	step: number
	value: number
	onSliderChange: (value: number) => void
	label?: string
	sliderStyles?: TailwindClasses
	sliderContainerStyles?: TailwindClasses
}

const Slider: FC<ISlider> = ({ min, max, label, onSliderChange, step, value, sliderStyles, sliderContainerStyles }) => {
	const sliderClasses = `${styles.slider} ${sliderStyles ? sliderStyles : ''}`
	const sliderContainerClasses = `${styles.sliderContainer} ${sliderContainerStyles ? sliderContainerStyles : ''} flex items-center`

	return (
		<div className='w-full'>
			<label className='font-medium' htmlFor='slider'>
				{label}
			</label>
			<div className={sliderContainerClasses}>
				<MinusIcon className='h-7 w-7' />
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
				<PlusIcon className='h-7 w-7' />
			</div>
		</div>
	)
}

export default Slider
