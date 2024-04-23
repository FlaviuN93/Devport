import { z } from 'zod'

// Base Schemas
const emailSchema = z
	.string()
	.trim()
	.min(1, 'Email is required')
	.email('Invalid email address. Please try again.')

const passwordSchema = z
	.string()
	.trim()
	.regex(/^.{8,}/, 'minLength')
	.regex(/^.{1,20}$/, 'maxLength')
	.regex(/[a-z]/, 'lowerCase')
	.regex(/[A-Z]/, 'upperCase')
	.regex(/\d/, 'number')
	.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'specialChar')

const nameSchema = z
	.string()
	.trim()
	.min(4, 'Name must be at least 4 characters')
	.max(30, 'Name must be maximum 30 characters')
	.regex(/^[a-zA-Z]+$/, 'Name can only contain letters')

const descriptionSchema = z
	.string()
	.trim()
	.min(30, 'Description must be at least 30 characters long.')
	.max(80, 'Description cannot exceed 80 characters.')
	.regex(/^[a-zA-Z0-9\s]+$/, 'Description can only contain letters and numbers.')

const urlSchema = z.string().trim().min(1, 'Please enter a repository URL.').url('Invalid URL')

const fileSchema = z.instanceof(File).refine((file) => {
	const allowedMimeTypes = ['image/png', 'image/jpeg']
	return allowedMimeTypes.includes(file.type)
}, 'File must be a valid image (PNG, JPEG)')

// Auth Schemas
export const signupSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

export const loginSchema = z.object({
	email: emailSchema,
	password: z
		.string()
		.min(8, 'Password must have at least 8 characters')
		.max(20, 'Password must have a maximum of 20 characters'),
})

export const forgotPasswordSchema = z.object({
	email: emailSchema,
})

export const resetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string().min(8, 'Password must have at least 8 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

// Settings Schemas
const MAX_FILE_SIZE = 1024 * 1024 * 2
const AVATAR_FILE_SIZE = 1024 * 1024

export const projectSettingsSchema = z
	.object({
		imageFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB').optional(),
		name: nameSchema,
		demoUrl: urlSchema,
		repositoryUrl: urlSchema,
		description: descriptionSchema,
		technologies: z
			.array(z.string())
			.min(2, 'Select a minimum of 2 technologies')
			.max(5, 'Select a maximum of 5 technologies'),
	})
	.partial()

export const profileSettingsSchema = z.object({
	coverFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB').optional(),
	avatarFile: fileSchema.refine((file) => file.size <= AVATAR_FILE_SIZE, 'File must be under 1MB').optional(),
	email: emailSchema.optional(),
	name: nameSchema.optional(),
	jobTitle: z
		.string()
		.trim()
		.max(30, 'Job title is maximum 30 characters long')
		.regex(/^[a-zA-Z]+$/, 'Position can only contain letters')
		.optional(),
	linkedin: urlSchema.optional(),
	bio: descriptionSchema.optional(),
})

export type ProfileSettingsType = z.infer<typeof profileSettingsSchema>
export type ProjectSettingsType = z.infer<typeof projectSettingsSchema>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>
export type SignupType = z.infer<typeof signupSchema>
export type LoginType = z.infer<typeof loginSchema>
