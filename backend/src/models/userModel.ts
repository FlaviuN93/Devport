import { z } from 'zod'
import bcrypt from 'bcrypt'
import supabase from '../services/supabase'
import { patchUserImageSchema, updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { removeUserColumns } from '../utils/functions'
import { User, IDefault, IUser, IUserAndProjects, UserAndProjects } from './types'

export const getUserAndProjects = async (userId: string): Promise<IUserAndProjects | AppError> => {
	const { data: userWithProjects, error } = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()

	if (error) return new AppError(500, 'Something went wrong while trying to get your user and project data. Give us some time to fix this.')

	const newUser = removeUserColumns<UserAndProjects>(userWithProjects)
	return {
		userWithProjects: newUser,
		statusCode: 200,
	}
}

export const getMyPortfolio = async (userId: string): Promise<IUserAndProjects | AppError> => {
	const { data: userWithProjects, error } = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()
	if (error) return new AppError(500, 'Something went wrong while trying to get your user and project data. Give us some time to fix this.')
	const id = userWithProjects.id
	const newUser = removeUserColumns<UserAndProjects>(userWithProjects)
	newUser.userId = id

	return {
		userWithProjects: newUser,
		statusCode: 200,
	}
}

export const updateUser = async (reqBody: UpdateUserType, userId: string): Promise<IUser | AppError> => {
	const { data } = await supabase.from('projects').select('coverURL,avatarURL').eq('id', userId).single()
	if (reqBody.coverURL === null) reqBody.coverURL = data?.coverURL
	if (reqBody.avatarURL === null) reqBody.avatarURL = data?.avatarURL

	const { data: user, error, status } = await supabase.from('users').update(reqBody).eq('id', userId).select('*').single()

	if (error) return new AppError(status)

	const newUser = removeUserColumns<User>(user)

	return {
		user: newUser,
		statusCode: 200,
		statusText: ['update', 'Your profile information has been updated successfully.'],
	}
}

export const updateMyPortfolio = async (reqBody: UpdateMyUserImages, userId: string): Promise<IUser | AppError> => {
	const { data } = await supabase.from('projects').select('coverURL,avatarURL').eq('id', userId).single()
	if (reqBody.coverURL === null) reqBody.coverURL = data?.coverURL
	if (reqBody.avatarURL === null) reqBody.avatarURL = data?.avatarURL

	const { data: user, error, status } = await supabase.from('users').update(reqBody).eq('id', userId).select('*').single()
	if (error) return new AppError(status)

	const newUser = removeUserColumns<User>(user)

	return {
		user: newUser,
		statusCode: 200,
		statusText: ['update', 'Your profile information has been updated succesfully.'],
	}
}

export const deleteUser = async (password: string, userId: string): Promise<IDefault | AppError> => {
	const { data: user } = await supabase.from('users').select('*').eq('id', userId).single()

	const arePasswordsEqual = await bcrypt.compare(password, user.password)
	if (!arePasswordsEqual) return new AppError(401, `Hmm, your passwords don't match. Try again.`)

	const { error, status, data } = await supabase.from('users').delete().eq('id', userId).select('fullName').single()

	if (error) return new AppError(status)

	return { statusCode: 200, statusText: ['delete', `${data.fullName} account has been deleted`] }
}

type UpdateUserType = z.infer<typeof updateUserSchema>
type UpdateMyUserImages = z.infer<typeof patchUserImageSchema>
