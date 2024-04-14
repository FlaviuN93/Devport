import { z } from 'zod'
import supabase from '../services/supabase'
import { updateUserSchema } from '../services/routeSchema'
import AppError from '../utils/appError'
import { ProjectType } from './projectModel'
import { removePassword } from '../utils/functions'

export const getUserAndProjects = async (userId: string): Promise<IGetUserAndProjects | AppError> => {
	const response = await supabase.from('users').select(`*, projects(*)`).eq('id', userId).single()
	const { data: userWithProjects, error, status, statusText } = response

	if (error) return new AppError(status, statusText)
	const newUser = removePassword<IUserAndProjects>(userWithProjects)
	return { userWithProjects: newUser, status, statusText }
}

export const getUser = async (userId: string): Promise<IGetUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('id', userId).single()
	const { data: user, error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	const newUser = removePassword<IUser>(user)
	return { user: newUser, status, statusText }
}

export const updateUser = async (reqBody: UpdateUserType): Promise<IDefault | AppError> => {
	const response = await supabase.from('users').update(reqBody).eq('id', reqBody.name)
	const { error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	return { status, statusText }
}

type UpdateUserType = z.infer<typeof updateUserSchema>

interface IUser {
	coverFile: File
	avatarFile: File
	email: string
	name: string
	jobTitle: string
	linkedin: string
	bio: string
}

interface IDefault {
	status: number
	statusText: string
}

interface IUserAndProjects extends IUser {
	projects: ProjectType[]
}

interface IGetUser extends IDefault {
	user: IUser
}

interface IGetUserAndProjects extends IDefault {
	userWithProjects: IUserAndProjects
}
