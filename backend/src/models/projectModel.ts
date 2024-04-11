import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import supabase from '../services/supabase'

type CreateProjectType = z.infer<typeof createProjectSchema>
type UpdateProjectType = z.infer<typeof updateProjectSchema>

export const getProjects = async (userId: string) => {
	const response = await supabase.from('projects').select('*').eq('user_id', userId)
	const { data: projects, error, status, statusText } = response
	console.log(projects, 'getProjects', error, 'errorMessage')
}

export const createProject = async (reqBody: CreateProjectType) => {
	const response = await supabase.from('projects').insert(reqBody).select().single()
	const { data: project, error, status, statusText } = response
	console.log(project, 'createdProject', error, 'errorMessage')
}

export const updateProject = async (reqBody: UpdateProjectType) => {
	const response = await supabase.from('projects').update(reqBody)
	console.log(response, 'updateProject')
}

export const deleteProject = async (projectId: string) => {
	const response = await supabase.from('projects').delete().eq('id', projectId)
	console.log(response, 'deleteProject')
}
