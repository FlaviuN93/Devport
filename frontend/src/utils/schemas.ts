import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5

// Base Schemas
const emailSchema = z.string().trim().min(3, { message: 'Email is required' }).email('Your email address is not valid. Try again.')

export const passwordSchema = z
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
	.min(4, 'Your name is too short. Please enter at least 4 characters.')
	.max(50, 'It seems like a very long name. While we appreciate the details, most names fit within 50 characters')
	.regex(/^[a-zA-Z_-\s]+$/, 'You can only add letters to your name')

const jobSchema = z
	.string()
	.trim()
	.min(4, 'Please enter your current job title. It helps showcase your experience.')
	.max(50, 'Whoa, that`s a long job title! Aim for under 50 characters to ensure clear display.')
	.regex(/^[a-zA-Z_-\s]+$/, 'Your job title can only contain letters')

const descriptionSchema = z
	.string()
	.trim()
	.min(125, 'To present your skills in more detail, include a description (at least 125 characters) for each project.')
	.max(250, 'Your description has too many characters! Please keep it under 250 characters.')
	.regex(/^[a-zA-Z0-9,.-\s]+$/, 'Your description should be clean and readable. No special characters allowed.')

const bioSchema = z
	.string()
	.trim()
	.min(175, 'Tell us more about yourself! A more detailed bio helps potential clients understand your background.')
	.max(300, 'Length of the bio exceeded! To ensure readability, please keep it under 300 characters.')
	.regex(/^[a-zA-Z0-9\s.!?',-]+$/, 'Your bio should be clean and readable. No special characters allowed.')

const urlSchema = z.string().trim().min(3, 'Please enter a repository URL.').url('Invalid URL')

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const fileSchema = z
	.any()
	.refine((file: File | null) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), 'File must be a valid image (PNG, JPEG, JPG, WEBP)')
	.refine((file: File | null) => file && file.size <= MAX_FILE_SIZE, 'Image must be under 5MB')

export const contactUsSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	message: z
		.string()
		.trim()
		.min(50, `You should write at least 50 characters. Tell us what's on your mind.`)
		.max(500, `Your message is too long. Try to be more concise with your message.`)
		.regex(/^[a-zA-Z0-9,.-\s]+$/, 'Your message can only contain letters and numbers.'),
})
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

export const projectSettingsSchema = z.object({
	imageFile: z.union([fileSchema, z.null()]),
	name: nameSchema,
	demoURL: urlSchema,
	repositoryURL: urlSchema,
	description: descriptionSchema,
	technologies: z.array(z.string()).min(2, 'Select a minimum of 2 technologies').max(5, 'Select a maximum of 5 technologies'),
})

export const profileSettingsSchema = z.object({
	email: z.union([emailSchema, z.literal('')]),
	fullName: z.union([nameSchema, z.literal('')]),
	jobTitle: z.union([jobSchema, z.literal('')]),
	linkedin: z.union([urlSchema, z.literal('')]),
	bio: z.union([bioSchema, z.literal('')]),
})

export const coverSchema = z.object({
	coverFile: z.union([fileSchema, z.null()]),
})

export const avatarSchema = z.object({
	avatarFile: z.union([fileSchema, z.null()]),
})

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>

export type SignupType = z.infer<typeof signupSchema>

export type LoginType = z.infer<typeof loginSchema>

export interface IProfileSettings {
	email?: string
	fullName?: string
	jobTitle?: string
	linkedin?: string
	bio?: string
}

export interface IProjectSettings {
	imageFile: File | null
	name: string
	demoURL: string
	repositoryURL: string
	description: string
	technologies: string[]
}
