import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'
import AppError from '../utils/appError'
import { IDefault, IGetProjects } from './types'

export const getProjects = async (userId: string): Promise<IGetProjects | AppError> => {
	const {
		data: projects,
		error,
		statusText,
	} = await supabase.from('projects').select('*').eq('user_id', userId)

	if (error) return new AppError(+error.code, statusText, error.message)
	if (projects === null || projects.length === 0) return new AppError(404, 'Not Found')

	return { projects, statusCode: 204, statusText: [''] }
}

export const createProject = async (reqBody: CreateProject): Promise<IDefault | AppError> => {
	const {
		data: projectId,
		error,
		statusText,
	} = await supabase.from('projects').insert(reqBody).select('id').single()

	if (error) return new AppError(+error.code, statusText, error.message)
	if (!projectId) return new AppError(400, 'Bad Request')

	return { statusCode: 201, statusText: ['project', 'created'] }
}

export const updateProject = async (reqBody: UpdateProject): Promise<IDefault | AppError> => {
	const {
		data: project,
		error,
		statusText,
	} = await supabase.from('projects').update(reqBody).eq('id', reqBody.id).select().single()

	if (error) return new AppError(+error.code, statusText, error.message)
	if (!project) return new AppError(400, 'Bad Request')

	return { statusCode: 201, statusText: ['project', 'updated'] }
}

export const deleteProject = async (id: string): Promise<IDefault | AppError> => {
	const {
		data: projectId,
		error,
		statusText,
	} = await supabase.from('projects').delete().eq('id', id).select('id').single()

	if (error) return new AppError(+error.code, statusText, error.message)
	if (!projectId) return new AppError(400, 'Bad Request')

	return { statusCode: 200, statusText: ['delete'] }
}

export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
