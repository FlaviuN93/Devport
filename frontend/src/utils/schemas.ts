import { z } from 'zod'

export const signupSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address. Please try again.' }),
	password: z
		.string()
		.regex(/^.{8,}/, 'minLength')
		.regex(/^.{1,20}$/, 'maxLength')
		.regex(/[a-z]/, 'lowerCase')
		.regex(/[A-Z]/, 'upperCase')
		.regex(/\d/, 'number')
		.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'specialChar'),
})

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address. Please try again.' }),
	password: z
		.string()
		.min(8, 'Password must be of at least 8 characters')
		.max(20, 'Password must have a maximum of 20 characters'),
})

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address. Please try again.' }),
})

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.regex(/^.{8,}/, 'minLength')
			.regex(/^.{1,20}$/, 'maxLength')
			.regex(/[a-z]/, 'lowerCase')
			.regex(/[A-Z]/, 'upperCase')
			.regex(/\d/, 'number')
			.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'specialChar'),
		confirmPassword: z.string().min(8, { message: 'Password must be of at least 8 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
