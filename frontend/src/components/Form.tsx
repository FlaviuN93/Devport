import React, { FC, ReactNode } from 'react'
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

interface FormFieldProps {
	register: UseFormRegister<FieldValues>
	error: FieldError | undefined
}

interface FormProps<T extends Record<string, any>> {
	schema: z.ZodObject<T>
	onSubmit: (data: T) => void
	children: (props: FormFieldProps) => ReactNode
	initialValues?: Partial<T>
}

const Form: FC<> = () => {
	return <div>Form</div>
}
