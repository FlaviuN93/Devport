import { NextFunction, Request, Response } from 'express'
import { createProjectSchema, updateProjectSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import { createProject, deleteProject, getProjects, updateProject } from '../models/projectModel'
import AppError, { getSuccessMessage } from '../utils/appError'
import { idSchema } from '../services/baseSchema'

export const getMyProjectsData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getProjects(req.userId)

	if (response instanceof AppError) return next(response)
	const { projects, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		data: projects,
	})
}

export const createMyProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	req.body.user_id = req.userId
	const projectData = createProjectSchema.parse(req.body)

	const response = await createProject(projectData)
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

	const response = await updateProject(projectData, projectId)
	if (response instanceof AppError) return next(response)
	const { project: updatedProject, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		project: updatedProject,
	})
})

export const deleteMyProjectData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectId = idSchema.parse(req.params.projectId).toString()

	const response = await deleteProject(projectId)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})
