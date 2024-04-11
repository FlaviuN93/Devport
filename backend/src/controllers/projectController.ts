import { NextFunction, Request, Response } from 'express'
import { createProjectSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'

export const getProjectsData = async (req: Request, res: Response) => {
	console.log(req.params, 'Get projects data')
	// let { data: users, error } = await supabase.from('projects').select('*')
}

export const createProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const data = createProjectSchema.parse(req.body)
	// let { data: users, error } = await supabase.from('users').select('*')
})

export const updateProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body, req.params, 'Patch an existing project data')
	// let { data: users, error } = await supabase.from('users').select('*')
})

export const deleteProjectData = async (req: Request, res: Response) => {
	console.log(req.body, req.params, 'Delete an existing project data')
}
