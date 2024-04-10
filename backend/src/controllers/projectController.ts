import { Request, Response } from 'express'

export const getProjects = async (req: Request, res: Response) => {
	console.log(req.params, 'Get projects data')
	// let { data: users, error } = await supabase.from('projects').select('*')
}

export const createProject = async (req: Request, res: Response) => {
	console.log(req.body, 'Post a new project data')
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const updateProject = async (req: Request, res: Response) => {
	console.log(req.body, req.params, 'Patch an existing project data')
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const deleteProject = async (req: Request, res: Response) => {
	console.log(req.body, req.params, 'Delete an existing project data')
}
