import {
	emailSchema,
	passwordSchema,
	descriptionSchema,
	fileSchema,
	nameSchema,
	urlSchema,
} from '../services/baseSchema'
import { z } from 'zod'
import { getImageFormat } from '../utils/functions'

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

export const updatePasswordSchema = z.object({
	currentPassword: passwordSchema,
	newPassword: passwordSchema,
})

// Project Schema
export const createProjectSchema = z.object({
	imageFile: z.union([
		fileSchema
			.refine((file: File | null) => {
				file && file.size <= MAX_FILE_SIZE
			}, 'Image must be under 2MB')
			.refine(async (file: File | null) => {
				file && (await getImageFormat('landscape', file))
			}, 'Image must have a landscape format.'),
		z.null(),
	]),
	name: nameSchema,
	demoURL: urlSchema,
	repositoryURL: urlSchema,
	technologies: z
		.array(z.string())
		.min(2, 'Select a minimum of 2 technologies')
		.max(5, 'Select a maximum of 5 technologies'),
	description: descriptionSchema,
	user_id: z.string(),
})

// User Schema
export const updateUserSchema = z.object({
	coverFile: z.union([
		fileSchema
			.refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Image must be under 2MB')
			.refine(
				async (file: File) => !file || (await getImageFormat('landscape', file)),
				'Image must have a landscape format.'
			),
		z.undefined(),
	]),
	avatarFile: z.union([
		fileSchema
			.refine((file) => !file || file.size <= AVATAR_FILE_SIZE, 'Image must be under 1MB')
			.refine(
				async (file: File) => !file || (await getImageFormat('portrait', file)),
				'Image must have a portrait format.'
			),
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
