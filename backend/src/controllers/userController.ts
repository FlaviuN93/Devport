import { NextFunction, Request, Response } from 'express'
import { getUser, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import { getProjects } from '../models/projectModel'
import AppError from '../utils/appError'

export const getUserAndProjectsData = async (req: Request, res: Response, next: NextFunction) => {
	const userData = await getUser(req.params.userId)
	const projectsData = await getProjects(req.params.userId)
	if (userData instanceof AppError) return next(userData)
	if (projectsData instanceof AppError) return next(projectsData)
	// const
}

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUser(req.params.userId)
	if (response instanceof AppError) return next(response)
	const { user, status, statusText } = response
	res.status(status).json({
		statusText,
		data: user,
	})
}

export const updateUserData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userData = updateUserSchema.parse(req.body)
	const response = await updateUser(userData)
	if (response instanceof AppError) return next(response)

	res.status(response.status).json({
		statusText: response.statusText,
	})
})
