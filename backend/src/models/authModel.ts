import { TypeOf, ZodError, z } from 'zod'
import { emailSchema, passwordSchema } from './baseSchema'
import supabase from '../services/supabase'

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

export const register = async (reqBody: AuthType) => {
	try {
		const { email, password } = authSchema.parse(reqBody)
		const { data, error, status } = await supabase.from('users').insert({ email, password }).select().single()
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const login = async (reqBody: AuthType) => {
	try {
		const { email, password } = authSchema.parse(reqBody)
		const { data, error, status } = await supabase.from('users').select().eq('password', password).single()
		console.log(data, 'CheckLogin')
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const forgot = async (reqBody: ForgotPasswordType) => {
	try {
		const { email } = forgotPasswordSchema.parse(reqBody)
		const { data, error, status } = await supabase.from('users').select('email').eq('email', email).single()
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const reset = async (reqBody: ResetPasswordType) => {
	try {
		const { password } = resetPasswordSchema.parse(reqBody)
		const { data, error, status } = await supabase
			.from('users')
			.select('password')
			.eq('password', password)
			.single()
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}
