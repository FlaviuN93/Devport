import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'
import AppError from '../utils/appError'
import { IDefault, IGetProjects } from './types'

export const getProjects = async (userId: string): Promise<IGetProjects | AppError> => {
	const { data: projects, error, status } = await supabase.from('projects').select('*').eq('user_id', userId)

	if (error) return new AppError(status, 'User token has probably expired. Please try to log in again.')
	if (projects === null || projects.length === 0)
		return new AppError(404, 'User does not have any projects created')

	return { projects, statusCode: 200, statusText: ['retrieve', 'projects have been sent successfully'] }
}

export const createProject = async (reqBody: CreateProject): Promise<IDefault | AppError> => {
	const {
		data: projectId,
		error,
		status,
	} = await supabase.from('projects').insert(reqBody).select('id').single()

	if (error) return new AppError(status)
	if (!projectId) return new AppError(400)

	return { statusCode: 201, statusText: ['project', 'created'] }
}

export const updateProject = async (
	reqBody: UpdateProject,
	projectId: string
): Promise<IDefault | AppError> => {
	const {
		data: project,
		error,
		status,
	} = await supabase.from('projects').update(reqBody).eq('id', projectId).select().single()

	if (error) return new AppError(status)
	if (!project) return new AppError(400)

	return { statusCode: 200, statusText: ['update', 'project has been updated successfully'] }
}

export const deleteProject = async (id: string): Promise<IDefault | AppError> => {
	const { error } = await supabase.from('projects').delete().eq('id', id).select('id').single()

	if (error) return new AppError(404, 'The project you tried to delete does not exist')

	return { statusCode: 200, statusText: ['delete', 'project has been deleted'] }
}

export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
