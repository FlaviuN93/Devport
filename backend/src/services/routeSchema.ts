import { emailSchema, passwordSchema, descriptionSchema, fileSchema, nameSchema, urlSchema } from '../services/baseSchema'
import { z } from 'zod'

// Constants
const MAX_FILE_SIZE = 1024 * 1024 * 5

// Auth Schema
export const authSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
	email: emailSchema,
})

export const resetPasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

// Project Schema
export const createProjectSchema = z.object({
	imageFile: z.union([urlSchema, z.null()]),
	name: nameSchema,
	demoURL: urlSchema,
	repositoryURL: urlSchema,
	technologies: z.array(z.string()).min(2, 'Select a minimum of 2 technologies').max(5, 'Select a maximum of 5 technologies'),
	description: descriptionSchema,
	user_id: z.string(),
})

// User Schema
export const updateUserSchema = z.object({
	coverFile: z.union([urlSchema, z.null()]),
	avatarFile: z.union([urlSchema, z.null()]),
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
