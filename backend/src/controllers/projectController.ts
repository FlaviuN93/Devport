import { NextFunction, Request, Response } from 'express'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import { createProject, deleteProject, getProjects, updateProject } from '../models/projectModel'
import AppError from '../utils/appError'

export const getProjectsData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getProjects(req.params.userId)
	if (response instanceof AppError) return next(response)
	const { projects, status, statusText } = response
	res.status(status).json({
		statusText,
		data: projects,
	})
}

export const createProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectData = createProjectSchema.parse(req.body)
	const response = await createProject(projectData)
	if (response instanceof AppError) return next(response)
	res.status(response.status).json({
		statusText: response.statusText,
	})
})

export const updateProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectData = updateProjectSchema.parse(req.body)
	const response = await updateProject(projectData)
	if (response instanceof AppError) return next(response)
	res.status(response.status).json({
		statusText: response.statusText,
	})
})

export const deleteProjectData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await deleteProject(req.params.userId)
	if (response instanceof AppError) return next(response)
	res.status(response.status).json({
		statusText: response.statusText,
	})
}
