import { z } from 'zod'

// Auth Schemas

export const signupSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address. Please try again.' }),
	password: z
		.string()
		.trim()
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
		.trim()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address. Please try again.' }),
	password: z
		.string()
		.min(8, 'Password must have at least 8 characters')
		.max(20, 'Password must have a maximum of 20 characters'),
})

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'Email is required')
		.email({ message: 'Invalid email address. Please try again.' }),
})

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.trim()
			.regex(/^.{8,}/, 'minLength')
			.regex(/^.{1,20}$/, 'maxLength')
			.regex(/[a-z]/, 'lowerCase')
			.regex(/[A-Z]/, 'upperCase')
			.regex(/\d/, 'number')
			.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'specialChar'),
		confirmPassword: z.string().min(1, 'Password must have at least 8 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

// Settings Schemas

const MAX_FILE_SIZE = 1024 * 1024 * 2

export const projectSettingsSchema = z.object({
	imageFile: z
		.instanceof(File)
		.refine((file) => {
			const allowedMimeTypes = ['image/png', 'image/jpeg']
			return allowedMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
		}, 'File must be a valid image (PNG, JPEG, or GIF) under 2MB')
		.optional(),
	name: z
		.string()
		.trim()
		.min(1, 'Project name is required')
		.max(30, 'Project name is maximum 30 characters long'),
	demoUrl: z.string().trim().url('Invalid URL format.Please enter a valid demo URL.'),
	repositoryUrl: z.string().trim().url('Invalid URL format.Please enter a repository URL.'),
	description: z
		.string()
		.trim()
		.min(30, 'Description must be at least 30 characters long.')
		.max(80, 'Description cannot exceed 80 characters.')
		.regex(/^[a-zA-Z0-9\s]+$/, 'Description can only contain letters and numbers.'),
	technologies: z
		.array(z.string())
		.min(2, { message: 'Select a minimum of 2 technologies' })
		.max(5, { message: 'Select a maximum of 5 technologies' }),
})

export const profileSettingsSchema = z.object({
	imageFile: z
		.instanceof(File)
		.refine((file) => {
			const allowedMimeTypes = ['image/png', 'image/jpeg']
			return allowedMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
		}, 'File must be a valid image (PNG, JPEG, or GIF) under 2MB')
		.optional(),
	email: z.string().trim().email({ message: 'Invalid email address. Please try again.' }).optional(),
	name: z
		.string()
		.trim()
		.max(30, 'Your name can be maximum 30 characters long')
		.regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, { message: 'No special characters allowed' })
		.optional(),
	jobTitle: z
		.string()
		.trim()
		.regex(/^[a-zA-Z]+$/, 'Position can only contain letters')
		.optional(),

	linkedin: z.string().trim().url('Invalid URL format. Please enter a valid URL.').optional(),
	bio: z
		.string()
		.trim()
		.min(30, 'Bio must be at least 30 characters long.')
		.max(60, 'Bio cannot exceed 60 characters.')
		.regex(/^[a-zA-Z0-9]+$/, 'Bio can only contain letters and numbers.')
		.optional(),
})

export type ProfileSettingsType = z.infer<typeof profileSettingsSchema>
export type ProjectSettingsType = z.infer<typeof projectSettingsSchema>
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>
export type SignupType = z.infer<typeof signupSchema>
export type LoginType = z.infer<typeof loginSchema>
