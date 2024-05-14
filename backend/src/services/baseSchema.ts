import { z } from 'zod'

// Base Schemas
export const emailSchema = z
	.string()
	.trim()
	.min(1, 'Email is required')
	.email({ message: 'Invalid email address. Please try again.' })

export const idSchema = z.coerce
	.number({
		invalid_type_error: 'The id you added to the request is not a number',
	})
	.int({ message: 'Id must be an integer' })
	.positive({ message: `Id should not have a negative value` })

export const passwordSchema = z
	.string()
	.trim()
	.regex(/^.{8,}/, 'Password must have at least 8 characters')
	.regex(/^.{1,20}$/, 'Password must have a maximum of 20 characters')
	.regex(/[a-z]/, 'Password must have one lowercase character')
	.regex(/[A-Z]/, 'Password must have one uppercase character')
	.regex(/\d/, 'Password must contain one number')
	.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'Password must contain a special characters')

export const nameSchema = z
	.string()
	.trim()
	.min(4, 'Name must be at least 4 characters')
	.max(50, 'Name must be maximum 50 characters')
	.regex(/^[a-zA-Z0-9-\s]+$/, 'Name can only contain letters and numbers')

export const descriptionSchema = z
	.string()
	.trim()
	.min(75, 'Description must be at least 75 characters long.')
	.max(150, 'Description cannot exceed 150 characters.')
	.regex(
		/^[a-zA-Z0-9\s\.\!\?\'\,\-]+$/,
		'Description cannot contain special characters. Keep it simple and clean.'
	)

export const urlSchema = z.string().trim().min(1, 'Please enter a repository URL.').url('Invalid URL')

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const fileSchema = z
	.any()
	.refine(
		(file: File | null) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
		'File must be a valid image (PNG, JPEG, JPG, WEBP)'
	)
