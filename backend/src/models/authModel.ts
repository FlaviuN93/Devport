import { TypeOf, ZodError, z } from 'zod'
import { emailSchema, passwordSchema } from './baseSchema'

const authSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

const forgotPasswordSchema = z.object({
	email: emailSchema,
})

const resetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

type AuthType = z.infer<typeof authSchema>
type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>
type ResetPasswordType = z.infer<typeof resetPasswordSchema>

export const register = (reqBody: AuthType) => {
	try {
		const { email, password } = authSchema.parse(reqBody)
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const login = (reqBody: AuthType) => {
	try {
		const { email, password } = authSchema.parse(reqBody)
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const forgot = (reqBody: ForgotPasswordType) => {
	try {
		const { email } = forgotPasswordSchema.parse(reqBody)
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const reset = (reqBody: ResetPasswordType) => {
	try {
		const { password } = resetPasswordSchema.parse(reqBody)
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}
