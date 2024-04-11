import { ZodError, z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'

type UpdateUserType = z.infer<typeof updateUserSchema>

export const getUser = async (userId: string) => {
	try {
		let { data: users, error } = await supabase.from('users').select('*')
	} catch (err) {
		console.log(err, 'GetUser')
	}
}

export const updateUser = async (reqBody: UpdateUserType) => {}

export const getUserAndProjects = async (userId: string) => {
	let { data: users, error } = await supabase.from('users').select('*')
}
