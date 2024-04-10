import { Request, Response } from 'express'

export const checkUserId = async (req: Request, res: Response) => {
	console.log(req.params.id, 'checkUserId')
}

export const getProjectsData = async (req: Request, res: Response) => {
	console.log(req.params, 'Get projects data')
	// let { data: users, error } = await supabase.from('projects').select('*')
}

export const createProjectData = async (req: Request, res: Response) => {
	console.log(req.body, 'Post a new project data')
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const updateProjectData = async (req: Request, res: Response) => {
	console.log(req.body, req.params, 'Patch an existing project data')
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const deleteProjectData = async (req: Request, res: Response) => {
	console.log(req.body, req.params, 'Delete an existing project data')
}
