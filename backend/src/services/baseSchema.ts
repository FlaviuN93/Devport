import { z } from 'zod'

// Base Schemas
export const emailSchema = z.string().trim().email({ message: 'Invalid email address. Please try again.' })

export const idSchema = z.coerce
	.number({
		invalid_type_error: 'The id you added to the request is not a number',
	})
	.int({ message: 'Id must be an integer' })
	.lte(100000, { message: 'Your value is too large for an id' })
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
	.max(40, 'Name must be maximum 40 characters')
	.regex(/^[a-zA-Z0-9-\s]+$/, 'Name can only contain letters and numbers')

export const descriptionSchema = z
	.string()
	.trim()
	.min(125, 'Must be at least 125 characters long.')
	.max(200, 'Cannot exceed 200 characters.')
	.regex(/^[a-zA-Z0-9\s\.\!\?\'\,\-]+$/, 'Cannot contain special characters. Keep it simple and clean.')

export const bioSchema = z
	.string()
	.trim()
	.min(200, 'Must be at least 200 characters long.')
	.max(300, 'Cannot exceed 300 characters.')
	.regex(/^[a-zA-Z0-9\s\.\!\?\'\,\-]+$/, 'Cannot contain special characters. Keep it simple and clean.')

export const urlSchema = z.string().trim().min(1, 'Please enter a repository URL.').url('Invalid URL')
