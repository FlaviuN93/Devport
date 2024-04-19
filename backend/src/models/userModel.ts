import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { removeUserColumns } from '../utils/functions'
import { BaseUser, IDefault, IGetUserAndProjects, IUser, IUserAndProjects } from './types'

export const getUserAndProjects = async (userId: string): Promise<IGetUserAndProjects | AppError> => {
	const {
		data: userWithProjects,
		error,
		statusText,
	} = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()

	if (error) return new AppError(+error.code, statusText, error.message)
	if (!userWithProjects) return new AppError(404, 'Not Found')

	const newUser = removeUserColumns<IUserAndProjects>(userWithProjects)
	return { userWithProjects: newUser, statusCode: 204, statusText: [''] }
}

export const getUser = async (userId: string): Promise<IUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('id', userId).single()
	const { data: user, error, statusText } = response

	if (error) return new AppError(+error.code, statusText, error.message)
	if (!user) return new AppError(404, 'Not Found')

	const newUser = removeUserColumns<BaseUser>(user)
	return { user: newUser, statusCode: 204, statusText: [''] }
}

export const updateUser = async (reqBody: UpdateUserType): Promise<IDefault | AppError> => {
	const {
		data: userId,
		error,
		statusText,
	} = await supabase.from('users').update(reqBody).eq('id', reqBody.name).select('id').single()

	if (error) return new AppError(+error.code, statusText, error.message)
	if (!userId) return new AppError(400, 'Bad Request')

	return { statusCode: 201, statusText: ['updated'] }
}

type UpdateUserType = z.infer<typeof updateUserSchema>
