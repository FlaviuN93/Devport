import { z } from 'zod'

export const signupSchema = z.object({
	email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
	password: z
		.string()
		.regex(/^.{8,}/, 'minLength')
		.regex(/^.{0,20}$/, 'maxLength')
		.regex(/[a-z]/, 'lowerCase')
		.regex(/[A-Z]/, 'upperCase')
		.regex(/\d/, 'number')
		.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'specialChar'),
})

export const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be of at least 8 characters')
		.max(20, 'Password must have a maximum of 20 characters'),
})
