import { NextFunction, Request, Response } from 'express'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import {
	createMyProject,
	deleteMyProject,
	getMyProject,
	getMyProjects,
	getTechnologies,
	updateMyProject,
} from '../models/projectModel'
import AppError, { getSuccessMessage } from '../utils/appError'
import { idSchema } from '../services/baseSchema'

export const getTechnologiesData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getTechnologies()

	if (response instanceof AppError) return next(response)
	const { technologies, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		technologies,
	})
}

export const getMyProjectsData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getMyProjects(req.userId)

	if (response instanceof AppError) return next(response)
	const { projects, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		projects,
	})
}

export const getMyProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectId = idSchema.parse(req.params.projectId).toString()
	const response = await getMyProject(req.userId, projectId)

	if (response instanceof AppError) return next(response)
	const { project, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		project,
	})
})

export const createMyProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	req.body.user_id = req.userId
	const projectData = createProjectSchema.parse(req.body)

	const response = await createMyProject(projectData)
	if (response instanceof AppError) return next(response)
	const { project, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		project,
	})
})

export const updateMyProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	req.body.user_id = req.userId
	const projectData = updateProjectSchema.parse(req.body)
	const projectId = idSchema.parse(req.params.projectId).toString()

	const response = await updateMyProject(projectData, projectId)
	if (response instanceof AppError) return next(response)
	const { project: updatedProject, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		project: updatedProject,
	})
})

export const deleteMyProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectId = idSchema.parse(req.params.projectId).toString()

	const response = await deleteMyProject(projectId)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})
