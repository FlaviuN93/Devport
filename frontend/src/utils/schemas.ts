import { z } from 'zod'
import { getImageFormat } from './functions'

// Base Schemas
const emailSchema = z.string().trim().min(3, 'Email is required').email('Invalid email address')

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
	.max(40, 'Name must be maximum 40 characters')
	.regex(/^[a-zA-Z_-\s]+$/, 'Name can only contain letters')

const descriptionSchema = z
	.string()
	.trim()
	.min(100, 'Description must be at least 100 characters long.')
	.max(175, 'Description cannot exceed 175 characters.')
	.regex(/^[a-zA-Z0-9,.-\s]+$/, 'Description can only contain letters and numbers.')

const urlSchema = z.string().trim().min(1, 'Please enter a repository URL.').url('Invalid URL')

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const fileSchema = z
	.any()
	.refine((file: File | null) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), 'File must be a valid image (PNG, JPEG, JPG, WEBP)')

// Auth Schemas
export const signupSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().trim().min(8, 'Password must have at least 8 characters').max(20, 'Password must have a maximum of 20 characters'),
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
const MAX_FILE_SIZE = 1024 * 1024 * 5

export const projectSettingsSchema = z.object({
	imageFile: z.union([
		fileSchema
			.refine((file: File | null) => file && file.size <= MAX_FILE_SIZE, 'Image must be under 5MB')
			.refine(async (file: File | null) => file && (await getImageFormat('landscape', file)), 'Image must have a landscape format.'),
		z.null(),
	]),
	name: nameSchema,
	demoURL: urlSchema,
	repositoryURL: urlSchema,
	description: descriptionSchema,
	technologies: z.array(z.string()).min(2, 'Select a minimum of 2 technologies').max(5, 'Select a maximum of 5 technologies'),
})

export const profileSettingsSchema = z.object({
	coverFile: z.union([
		fileSchema
			.refine((file: File | null) => file && file.size <= MAX_FILE_SIZE, 'Image must be under 5MB')
			.refine(
				async (file: File | null) => file && (await getImageFormat('cover', file)),
				`Ensure the image dimensions are of 800 pixels wide by 200 pixels tall or the same ratio of wide and tall.`
			),
		z.null(),
	]),
	avatarFile: z.union([
		fileSchema
			.refine((file: File | null) => file && file.size <= MAX_FILE_SIZE, 'Image must be under 3MB')
			.refine(async (file: File | null) => file && (await getImageFormat('portrait', file)), 'Image must have a portrait format.'),
		z.null(),
	]),
	email: z.union([emailSchema, z.literal('')]),
	fullName: z.union([nameSchema, z.literal('')]),
	jobTitle: z.union([nameSchema, z.literal('')]),
	linkedin: z.union([urlSchema, z.literal('')]),
	bio: z.union([descriptionSchema, z.literal('')]),
})

export const portfolioSchema = z.object({
	coverFile: z.union([
		fileSchema.refine((file: File | null) => file && file.size <= MAX_FILE_SIZE, 'Image must be under 5MB'),
		// .refine(
		// 	async (file: File | null) => file && (await getImageFormat('cover', file)),
		// 	`Ensure the image dimensions are of 800 pixels wide by 200 pixels tall or the same ratio of wide and tall.`
		// )
		z.null(),
	]),
	avatarFile: z.union([
		fileSchema
			.refine((file: File | null) => file && file.size <= MAX_FILE_SIZE, 'Image must be under 5MB')
			.refine(async (file: File | null) => file && (await getImageFormat('portrait', file)), 'Image must have a portrait format.'),
		z.null(),
	]),
})

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>

export type SignupType = z.infer<typeof signupSchema>

export type LoginType = z.infer<typeof loginSchema>

export interface IProfileSettings {
	coverFile: File | null
	avatarFile: File | null
	email?: string
	fullName?: string
	jobTitle?: string
	linkedin?: string
	bio?: string
}

export interface IPortfolio {
	coverFile: File | null
	avatarFile: File | null
}

export interface IProjectSettings {
	imageFile: File | null
	name: string
	demoURL: string
	repositoryURL: string
	description: string
	technologies: string[]
}
