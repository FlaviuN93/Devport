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

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const fileSchema = z
	.any()
	.refine((file: File) => {
		return file === undefined
	}, 'File is not selected')
	.refine((file: File) => {
		console.log(file, 'checkFile')
		// if (!file) return
		console.log(file, 'checkFile2')
		return ACCEPTED_IMAGE_TYPES.includes(file.type)
	}, 'File must be a valid image (PNG, JPEG, JPG, WEBP)')

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

export const projectSettingsSchema = z.object({
	imageFile: fileSchema.refine((file: File) => {
		if (!file) return
		file.size <= MAX_FILE_SIZE, 'File must be under 2MB'
	}),
	name: nameSchema,
	demoUrl: urlSchema,
	repositoryUrl: urlSchema,
	description: descriptionSchema,
	technologies: z
		.array(z.string())
		.min(2, 'Select a minimum of 2 technologies')
		.max(5, 'Select a maximum of 5 technologies'),
})

export const profileSettingsSchema = z.object({
	coverFile: z.union([
		fileSchema.refine((file) => {
			if (!file) return
			file.size <= MAX_FILE_SIZE
		}, 'File must be under 2MB'),
		z.undefined(),
	]),
	avatarFile: z.union([
		fileSchema.refine((file) => {
			if (!file) return
			file.size <= AVATAR_FILE_SIZE
		}, 'File must be under 1MB'),
		z.undefined(),
	]),
	email: z.union([emailSchema, z.literal('')]),
	name: z.union([nameSchema, z.literal('')]),
	jobTitle: z.union([
		z
			.string()
			.trim()
			.max(30, 'Job title is maximum 30 characters long')
			.regex(/^[a-zA-Z]+$/, 'Position can only contain letters'),
		z.literal(''),
	]),
	linkedin: z.union([urlSchema, z.literal('')]),
	bio: z.union([descriptionSchema, z.literal('')]),
})

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>

export type SignupType = z.infer<typeof signupSchema>

export type LoginType = z.infer<typeof loginSchema>

export interface IProfileSettings {
	coverFile?: File
	avatarFile?: File
	email?: string
	name?: string
	jobTitle?: string
	linkedin?: string
	bio?: string
}

export interface IProjectSettings {
	imageFile?: File
	name?: string
	demoUrl?: string
	repositoryUrl?: string
	description?: string
	technologies?: string[]
}
