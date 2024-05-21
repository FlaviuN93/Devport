import { z } from 'zod'
import bcrypt from 'bcrypt'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { removeUserColumns } from '../utils/functions'
import { User, IDefault, IGetUserAndProjects, IUser, IUserAndProjects } from './types'

export const getUserAndProjects = async (userId: string): Promise<IGetUserAndProjects | AppError> => {
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
	}
}

export const getUser = async (userId: string): Promise<IUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('id', userId).single()
	const { data: user, error, status } = response

	if (error) return new AppError(status)
	if (!user) return new AppError(404)

	const newUser = removeUserColumns<User>(user)
	return { user: newUser, statusCode: 200 }
}

export const updateUser = async (reqBody: UpdateUserType, userId: string): Promise<IUser | AppError> => {
	const response = await supabase.from('users').update(reqBody).eq('id', userId).select('*').single()
	const { data: user, error, status } = response

	if (error) return new AppError(status)
	if (!user) return new AppError(400)

	const newUser = removeUserColumns<User>(user)

	return {
		user: newUser,
		statusCode: 200,
		statusText: ['update', 'Your profile information has been updated successfully'],
	}
}

export const deleteUser = async (password: string, userId: string): Promise<IDefault | AppError> => {
	const { data: user } = await supabase.from('users').select('*').eq('id', userId).single()

	const arePasswordsEqual = await bcrypt.compare(password, user.password)
	if (!arePasswordsEqual) return new AppError(401, `Hmm, your passwords don't match. Try again.`)

	const { error, status, data } = await supabase
		.from('users')
		.delete()
		.eq('id', userId)
		.select('fullName')
		.single()

	if (error) return new AppError(status)

	return { statusCode: 200, statusText: ['delete', `${data.fullName} account has been deleted`] }
}

type UpdateUserType = z.infer<typeof updateUserSchema>
