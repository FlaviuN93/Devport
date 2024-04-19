import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { removeUserColumns } from '../utils/functions'
import { BaseUser, IDefault, IGetUserAndProjects, IUser, IUserAndProjects } from './types'

export const getUserAndProjects = async (userId: number): Promise<IGetUserAndProjects | AppError> => {
	const {
		data: userWithProjects,
		error,
		status,
	} = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()

	if (!userWithProjects) return new AppError(404)
	if (error) return new AppError(status)

	const newUser = removeUserColumns<IUserAndProjects>(userWithProjects)
	return {
		userWithProjects: newUser,
		statusCode: 200,
		statusText: ['retrieve', 'user and projects have been sent successfully'],
	}
}

export const getUser = async (userId: number): Promise<IUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('id', userId).single()
	const { data: user, error, status } = response

	if (!user) return new AppError(404)
	if (error) return new AppError(status)

	const newUser = removeUserColumns<BaseUser>(user)
	return { user: newUser, statusCode: 200, statusText: ['retrieve', 'user has been sent successfully'] }
}

export const updateUser = async (reqBody: UpdateUserType): Promise<IDefault | AppError> => {
	const {
		data: userId,
		error,
		status,
	} = await supabase.from('users').update(reqBody).eq('id', reqBody.name).select('id').single()

	if (!userId) return new AppError(400)
	if (error) return new AppError(status)

	return { statusCode: 200, statusText: ['update', 'user has been updated successfully'] }
}

type UpdateUserType = z.infer<typeof updateUserSchema>
