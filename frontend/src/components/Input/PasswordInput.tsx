import React, { ChangeEvent, FC, useState } from 'react'
import Input, { InputProps } from './Input'
import { tPasswordFunctionality } from '../types'
import { getPasswordValidationState } from '../../utils/utility'
import ValidationRow from './ValidationRow'

interface IPasswordProps extends Omit<InputProps, 'onChange'> {
	onChange: (value: string) => void
	functionality: tPasswordFunctionality
	value?: string
}

const PasswordInput: FC<IPasswordProps> = ({ value, onChange, functionality, ...props }) => {
	const rulesForValidation = getPasswordValidationState(functionality)
	const [passwordValue, setPasswordValue] = useState(value || '')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordValue(e.target.value)
		onChange(e.target.value)
	}

	return (
		<div className='flex'>
			<Input value={value} type='text' onChange={handleChange} {...props} />
			<div>
				{rulesForValidation.map((rule) => (
					<ValidationRow
						password={passwordValue}
						key={rule.type}
						isActive={rule.isActive}
						validationType={rule.type}
					/>
				))}
			</div>
		</div>
	)
}
export default PasswordInput
