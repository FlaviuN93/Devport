import { z } from 'zod'

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
		.min(8, 'Password must be of at least 8 characters')
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
		confirmPassword: z.string().min(1, 'Password must be of at least 8 characters'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
// string().trim().url('Invalid URL format.Please enter a valid image.')
const MAX_FILE_SIZE = 1024 * 1024 * 2

export const projectSettingsSchema = z.object({
	imageFile: z.instanceof(File).refine((file) => {
		const allowedMimeTypes = ['image/png', 'image/jpeg']
		return allowedMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
	}, 'File must be a valid image (PNG, JPEG, or GIF) under 2MB'),
	name: z.string().trim().min(4, 'Name of the project has to have a minimum of 4 characters'),
	demoUrl: z.string().trim().url('Invalid URL format.Please enter a valid demo URL.'),
	repositoryUrl: z.string().trim().url('Invalid URL format.Please enter a repository URL.'),
	description: z
		.string()
		.trim()
		.min(30, 'Description must be at least 30 characters long.')
		.max(80, 'Description cannot exceed 80 characters.')
		.regex(/^[a-zA-Z0-9]+$/, 'Description can only contain letters and numbers.'),
	technologies: z.array(z.string().length(3, 'You have to add at least 3 technologies to the field')),
})
