import {
	emailSchema,
	passwordSchema,
	descriptionSchema,
	fileSchema,
	nameSchema,
	urlSchema,
} from '../services/baseSchema'
import { z } from 'zod'
import bcrypt from 'bcrypt'

// Constants
const MAX_FILE_SIZE = 1024 * 1024 * 2
const AVATAR_FILE_SIZE = 1024 * 1024

// Auth Schema
export const authSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
	})
	.transform(async (data) => {
		data.password = await bcrypt.hash(data.password, 12)
		return data
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
	.transform(async (data) => await bcrypt.hash(data.password, 12))

// Project Schema
export const createProjectSchema = z.object({
	imageFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB').optional(),
	name: nameSchema,
	demoUrl: urlSchema,
	repositoryUrl: urlSchema,
	technologies: z
		.array(z.string())
		.min(2, 'Select a minimum of 2 technologies')
		.max(5, 'Select a maximum of 5 technologies'),
	description: descriptionSchema,
})

export const updateProjectSchema = createProjectSchema.optional()

// User Schema
export const updateUserSchema = z
	.object({
		coverFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB'),
		avatarFile: fileSchema.refine((file) => file.size <= AVATAR_FILE_SIZE, 'File must be under 1MB'),
		email: emailSchema,
		name: nameSchema,
		jobTitle: z
			.string()
			.trim()
			.max(30, 'Job title is maximum 30 characters long')
			.regex(/^[a-zA-Z]+$/, 'Position can only contain letters'),
		linkedin: urlSchema,
		bio: descriptionSchema,
	})
	.partial()
