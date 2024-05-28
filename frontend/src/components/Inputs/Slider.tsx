import { ChangeEvent, FC, useState } from 'react'
import { tPositions } from '../../utils/types'
import styles from './Slider.module.css'

interface ISlider {
	min: number
	max: number
	step: number
	startValue: number
	onChange: (value: number) => void
	labelPos?: tPositions
	label?: string
}

const Slider: FC<ISlider> = ({ min, max, label, labelPos = 'top', onChange, step, startValue = 1 }) => {
	const [value, setValue] = useState(startValue)

	const labelClasses = `${styles.label} ${labelPos ? styles[labelPos] : ''}`

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(+e.target.value)
		onChange(+e.target.value)
	}
	return (
		<div>
			<label className={labelClasses} htmlFor='slider'>
				{label}
			</label>
			<input
				id='slider'
				type='range'
				className={styles.slider}
				value={value}
				min={min}
				max={max}
				step={step}
				aria-labelledby={label}
				onChange={handleChange}
			/>
		</div>
	)
}

export default Slider
