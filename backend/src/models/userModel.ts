import { ZodError, z } from 'zod'
import supabase from '../services/supabase'
import { descriptionSchema, emailSchema, fileSchema, nameSchema, urlSchema } from './baseSchema'

const MAX_FILE_SIZE = 1024 * 1024 * 2
const AVATAR_FILE_SIZE = 1024 * 1024

const updateUserSchema = z
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

type UpdateUserType = z.infer<typeof updateUserSchema>

export const getUser = async (userId: string) => {
	try {
		let { data: users, error } = await supabase.from('users').select('*')
	} catch (err) {
		console.log(err, 'GetUser')
	}
}

export const updateUser = async (reqBody: UpdateUserType) => {
	try {
		const user = updateUserSchema.parse(reqBody)
		console.log(user)
	} catch (err) {
		if (err instanceof ZodError) {
			const formattedErrors = err.format()
			console.log(formattedErrors, 'Errors')
		}
	}
}

export const getUserAndProjects = async (userId: string) => {
	try {
		let { data: users, error } = await supabase.from('users').select('*')
	} catch (err) {}
}
