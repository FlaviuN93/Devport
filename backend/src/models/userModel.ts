import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'

type UpdateUserType = z.infer<typeof updateUserSchema>

type User = {
	coverFile: File
	avatarFile: File
	email: string
	name: string
	jobTitle: string
	linkedin: string
	bio: string
}

interface defaultResponse {
	status: number
	statusText: string
}

interface GetUserResponse extends defaultResponse {
	user: User
}

export const getUser = async (userId: string): Promise<GetUserResponse | AppError> => {
	const response = await supabase.from('users').select().eq('id', userId).single()
	const { data: user, error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	return { user, status, statusText }
}

export const updateUser = async (reqBody: UpdateUserType): Promise<defaultResponse | AppError> => {
	const response = await supabase.from('users').update(reqBody).eq('id', reqBody.name)
	const { error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	return { status, statusText }
}
