import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'

type UpdateUserType = z.infer<typeof updateUserSchema>

export const getUser = async (userId: string) => {
	const response = await supabase.from('users').select().eq('id', userId).single()
	const { data, error, status, statusText } = response
	console.log(status, statusText, 'GetUserModel')
}

export const updateUser = async (reqBody: UpdateUserType) => {
	const response = await supabase.from('users').update(reqBody).eq('id', reqBody.name)
	const { data, error, status, statusText } = response
	console.log(status, statusText, error, 'UpdateUser')
}
