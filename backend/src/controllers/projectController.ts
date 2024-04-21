import { NextFunction, Request, Response } from 'express'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import { createProject, deleteProject, getProjects, updateProject } from '../models/projectModel'
import AppError, { getSuccessMessage } from '../utils/appError'

export const getProjectsData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getProjects(req.userId)

	if (response instanceof AppError) return next(response)
	const { projects, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		data: projects,
	})
}

export const createProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectData = createProjectSchema.parse(req.body)
	projectData.user_id = req.userId

	const response = await createProject(projectData)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})

export const updateProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectData = updateProjectSchema.parse(req.body)
	projectData.user_id = req.userId

	const response = await updateProject(projectData, req.params.projectId)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})

export const deleteProjectData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await deleteProject(req.params.projectId)

	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
}
