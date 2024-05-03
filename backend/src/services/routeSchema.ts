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

export const updatePasswordSchema = z.object({
	currentPassword: passwordSchema,
	newPassword: passwordSchema,
})

// Project Schema
export const createProjectSchema = z.object({
	imageFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB'),
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

export const updateProjectSchema = z.object({
	imageFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB'),
	name: z.union([nameSchema, z.literal('')]),
	demoUrl: z.union([urlSchema, z.literal('')]),
	repositoryUrl: z.union([urlSchema, z.literal('')]),
	description: z.union([descriptionSchema, z.literal('')]),
	technologies: z.union([
		z
			.array(z.string())
			.min(2, 'Select a minimum of 2 technologies')
			.max(5, 'Select a maximum of 5 technologies'),
		z.undefined(),
	]),
})

// User Schema
export const updateUserSchema = z.object({
	coverFile: z.union([
		fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB'),
		z.null(),
	]),
	avatarFile: z.union([
		fileSchema.refine((file) => file.size <= AVATAR_FILE_SIZE, 'File must be under 1MB'),
		z.null(),
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
