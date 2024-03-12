// import React, { FC, ReactNode } from 'react'
// import {
// 	FieldError,
// 	FieldErrors,
// 	FieldErrorsImpl,
// 	FieldValues,
// 	Merge,
// 	UseFormRegister,
// 	useForm,
// } from 'react-hook-form'
// import { z } from 'zod'

// interface FormFieldProps {
// 	register: UseFormRegister<FieldValues>
// 	error: FieldError | undefined
// }

// interface FormProps<T extends z.ZodRawShape> {
// 	schema: z.ZodObject<T>
// 	onSubmit: (data: T) => void
// 	children: (props: FormFieldProps) => ReactNode
// 	initialValues?: Partial<T>
// }

// const Form: FC<FormProps<any>> = ({ schema, onSubmit, children, initialValues = {} }) => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<typeof schema.shape>({
// 		defaultValues: initialValues,
// 	})

// 	return (
// 		<section>
// 			<form onSubmit={handleSubmit(onSubmit)}>
// 				{children({ register, error: getFieldErrors(errors) })}
// 			</form>
// 		</section>
// 	)
// }

// export default Form
