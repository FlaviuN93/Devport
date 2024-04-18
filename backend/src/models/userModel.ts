import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { removeUserColumns } from '../utils/functions'
import { BaseUser, IDefault, IGetUserAndProjects, IUser, IUserAndProjects } from './types'

export const getUserAndProjects = async (userId: string): Promise<IGetUserAndProjects | AppError> => {
	const response = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()
	const { data: userWithProjects, error, status, statusText } = response

	if (!userWithProjects) return new AppError(404, 'Not Found')
	if (error) return new AppError(status, statusText)
	const newUser = removeUserColumns<IUserAndProjects>(userWithProjects)
	return { userWithProjects: newUser, status, statusText }
}

export const getUser = async (userId: string): Promise<IUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('id', userId).single()
	const { data: user, error, status, statusText } = response

	if (!user) return new AppError(404, 'Not Found')
	if (error) return new AppError(status, statusText)

	const newUser = removeUserColumns<BaseUser>(user)
	return { user: newUser, status, statusText }
}

export const updateUser = async (reqBody: UpdateUserType): Promise<IDefault | AppError> => {
	const { error, status, statusText } = await supabase.from('users').update(reqBody).eq('id', reqBody.name)

	if (error) return new AppError(status, statusText)
	return { status, statusText }
}

type UpdateUserType = z.infer<typeof updateUserSchema>
