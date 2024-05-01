import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'
import AppError from '../utils/appError'
import { IDefault, IProjects, IProject } from './types'

export const getMyProjects = async (userId: string): Promise<IProjects | AppError> => {
	const {
		data: projects,
		error,
		status,
	} = await supabase
		.from('projects')
		.select('id,imageURL,name,demoURL,repositoryURL,technologies,description')
		.eq('user_id', userId)

	if (error) return new AppError(status)
	if (projects === null || projects.length === 0)
		return new AppError(404, 'User does not have any projects created')

	return { projects, statusCode: 200, statusText: ['retrieve', 'projects have been sent successfully'] }
}

export const getMyProject = async (userId: string, projectId: string): Promise<IProject | AppError> => {
	const {
		data: project,
		error,
		status,
	} = await supabase
		.from('projects')
		.select('id, imageURL, name, demoURL, repositoryURL, technologies, description')
		.eq('id', projectId)
		.eq('user_id', userId)
		.single()

	if (error) return new AppError(status)
	if (!project) return new AppError(400)

	return { project, statusCode: 200, statusText: ['retrieve', 'project has been sent successfully'] }
}

export const createMyProject = async (reqBody: CreateProject): Promise<IProject | AppError> => {
	const {
		data: project,
		error,
		status,
	} = await supabase.from('projects').insert(reqBody).select('*').single()

	if (error) return new AppError(status)

	return { project, statusCode: 201, statusText: ['project', 'created'] }
}

export const updateMyProject = async (
	reqBody: UpdateProject,
	projectId: string
): Promise<IProject | AppError> => {
	const {
		data: project,
		error,
		status,
	} = await supabase.from('projects').update(reqBody).eq('id', projectId).select('*').single()

	if (error) return new AppError(status)

	return { project, statusCode: 200, statusText: ['update', 'project has been updated successfully'] }
}

export const deleteMyProject = async (id: string): Promise<IDefault | AppError> => {
	const { error } = await supabase.from('projects').delete().eq('id', id).select('id').single()

	if (error) return new AppError(404, 'The project you tried to delete does not exist')

	return { statusCode: 200, statusText: ['delete', 'project has been deleted'] }
}

export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
