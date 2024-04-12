import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'
import AppError from '../utils/appError'

type ProjectType = z.infer<typeof createProjectSchema>
type OptionalProjectType = z.infer<typeof updateProjectSchema>

interface defaultResponse {
	status: number
	statusText: string
}
interface getProjectsResponse extends defaultResponse {
	projects: ProjectType[]
}

export const getProjects = async (userId: string): Promise<getProjectsResponse | AppError> => {
	const response = await supabase.from('projects').select('*').eq('user_id', userId)
	const { data: projects, error, status, statusText } = response

	if (error) return new AppError(status, statusText)

	return { projects, status, statusText }
}

export const createProject = async (reqBody: ProjectType): Promise<defaultResponse | AppError> => {
	const response = await supabase.from('projects').insert(reqBody)
	const { error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	return { status, statusText }
}

export const updateProject = async (reqBody: OptionalProjectType): Promise<defaultResponse | AppError> => {
	const response = await supabase.from('projects').update(reqBody)
	const { error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	return { status, statusText }
}

export const deleteProject = async (projectId: string): Promise<defaultResponse | AppError> => {
	const response = await supabase.from('projects').delete().eq('id', projectId)
	const { error, status, statusText } = response
	if (error) return new AppError(status, statusText)
	return { status, statusText }
}
