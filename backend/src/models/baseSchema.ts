import { z } from 'zod'

// Base Schemas
export const emailSchema = z
	.string()
	.trim()
	.min(1, 'Email is required')
	.email({ message: 'Invalid email address. Please try again.' })

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
	.max(30, 'Name is maximum 30 characters long')
	.regex(/^[a-zA-Z]+$/, 'Name can only contain letters')

export const descriptionSchema = z
	.string()
	.trim()
	.min(30, 'Description must be at least 30 characters long.')
	.max(80, 'Description cannot exceed 80 characters.')
	.regex(/^[a-zA-Z0-9\s]+$/, 'Description can only contain letters and numbers.')

export const urlSchema = z.string().trim().url('Invalid URL format.Please enter a repository URL.')

export const fileSchema = z.instanceof(File).refine((file) => {
	const allowedMimeTypes = ['image/png', 'image/jpeg']
	return allowedMimeTypes.includes(file.type)
}, 'File must be a valid image (PNG, JPEG)')
