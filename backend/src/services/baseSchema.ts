import { z } from 'zod'

// Base Schemas
export const emailSchema = z.string().trim().email({ message: 'Invalid email address. Please try again.' })

export const idSchema = z.coerce
	.number({
		invalid_type_error: 'The id you added to the request is not a number',
	})
	.int({ message: 'Id must be an integer' })
	.positive({ message: `Id should not have a negative value` })

export const passwordSchema = z
	.string()
	.trim()
	.regex(/^.{8,}/, ' Must have at least 8 characters')
	.regex(/^.{1,20}$/, ' Must have a maximum of 20 characters')
	.regex(/[a-z]/, ' Must have one lowercase character')
	.regex(/[A-Z]/, ' Must have one uppercase character')
	.regex(/\d/, ' Must contain one number')
	.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'Must contain a special characters')

export const nameSchema = z
	.string()
	.trim()
	.min(4, 'Name must be at least 4 characters')
	.max(50, 'Name must be maximum 50 characters')
	.regex(/^[a-zA-Z0-9-\s]+$/, 'Name can only contain letters and numbers')

export const descriptionSchema = z
	.string()
	.trim()
	.min(100, 'Must be at least 100 characters long.')
	.max(175, 'Cannot exceed 175 characters.')
	.regex(/^[a-zA-Z0-9\s\.\!\?\'\,\-]+$/, 'Cannot contain special characters. Keep it simple and clean.')

export const urlSchema = z.string().trim().min(1, 'Please enter a repository URL.').url('Invalid URL')
