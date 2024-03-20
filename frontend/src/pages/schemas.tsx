import { z } from 'zod'

export const signupSchema = z.object({
	email: z.string().email('email is invalid').min(1),
	password: z.object({
		lowercase: z.string().regex(/[a-z]/, 'one lower case character'),
		uppercase: z.string().regex(/[A-Z]/, 'one upper case character'),
		specialChar: z.string().regex(/[^a-zA-Z0-9]/, 'one special character'),
		minLength: z.string().min(8, '8 character min'),
		number: z.coerce.number().max(1, 'one number'),
		maxLength: z.string().max(20, 'maximum of 20 characters'),
		whitespace: z.string().regex(/\S+/, 'no whitespaces allowed'),
	}),
})
