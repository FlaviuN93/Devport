import {
	emailSchema,
	passwordSchema,
	descriptionSchema,
	fileSchema,
	nameSchema,
	urlSchema,
} from '../services/baseSchema'
import { z } from 'zod'

// Constants
const MAX_FILE_SIZE = 1024 * 1024 * 2
const AVATAR_FILE_SIZE = 1024 * 1024

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
		passwordConfirm: passwordSchema,
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm'],
	})

// Project Schema
export const createProjectSchema = z.object({
	imageURL: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB').optional(),
	name: nameSchema,
	demoURL: urlSchema,
	repositoryURL: urlSchema,
	technologies: z
		.array(z.string())
		.min(2, 'Select a minimum of 2 technologies')
		.max(5, 'Select a maximum of 5 technologies'),
	description: descriptionSchema,
	user_id: z.number().optional(),
})

export const updateProjectSchema = createProjectSchema.extend({
	id: z.number(),
})

// User Schema
export const updateUserSchema = z
	.object({
		id: z.number(),
		coverURL: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB'),
		avatarURL: fileSchema.refine((file) => file.size <= AVATAR_FILE_SIZE, 'File must be under 1MB'),
		email: emailSchema,
		name: nameSchema,
		jobTitle: z
			.string()
			.trim()
			.max(30, 'Job title is maximum 30 characters long')
			.regex(/^[a-zA-Z]+$/, 'Position can only contain letters'),
		linkedin: urlSchema,
		bio: descriptionSchema,
		user_id: z.number().optional(),
	})
	.partial()
