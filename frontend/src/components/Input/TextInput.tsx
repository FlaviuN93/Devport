import React, { FC } from 'react'
import Input, { InputProps } from './Input'

interface IProps extends InputProps {
	value: string
}

const TextInput: FC<IProps> = ({ value, ...props }) => {
	return <Input value={value} {...props} />
}
export default TextInput
