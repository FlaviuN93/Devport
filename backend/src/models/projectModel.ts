import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'
import AppError from '../utils/appError'
import { IDefault, IGetProjects } from './types'

export const getProjects = async (userId: string): Promise<IGetProjects | AppError> => {
	const { data: projects } = await supabase.from('projects').select('*').eq('user_id', userId)

	if (projects === null || projects.length === 0) return new AppError(404, 'Not Found')

	return { projects, statusCode: 200, statusText: 'Success' }
}

export const createProject = async (reqBody: CreateProject): Promise<IDefault | AppError> => {
	const { data: projectId } = await supabase.from('projects').insert(reqBody).select('id').single()
	if (!projectId) return new AppError(400, 'Bad Request')
	return { statusCode: 201, statusText: 'Created' }
}

export const updateProject = async (reqBody: UpdateProject): Promise<any | AppError> => {
	const { data: project } = await supabase
		.from('projects')
		.update(reqBody)
		.eq('id', reqBody.id)
		.select()
		.single()

	if (!project) return new AppError(400, 'Bad Request')
	return { statusCode: 201, statusText: 'Updated' }
}

export const deleteProject = async (id: string): Promise<IDefault | AppError> => {
	const { data: projectId } = await supabase.from('projects').delete().eq('id', id).select('id').single()
	if (!projectId) return new AppError(400, 'Bad Request')

	return { statusCode: 201, statusText: 'Deleted' }
}

export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
