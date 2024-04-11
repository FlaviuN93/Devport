import { z } from 'zod'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'

type CreateProjectType = z.infer<typeof createProjectSchema>
type UpdateProjectType = z.infer<typeof updateProjectSchema>

export const getProjects = async (userId: string) => {
	try {
		console.log(userId, 'Get projects data')
	} catch (err) {
		console.log(err)
	}
	// let { data: users, error } = await supabase.from('projects').select('*')
}

export const createProject = async (reqBody: CreateProjectType) => {
	console.log(reqBody, 'Post a new project data')

	// let { data: users, error } = await supabase.from('users').select('*')
}

export const updateProject = async (reqBody: UpdateProjectType) => {
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const deleteProject = async (userId: string) => {
	try {
		console.log(userId, 'Delete an existing project data')
	} catch (err) {
		console.log(err)
	}
}
