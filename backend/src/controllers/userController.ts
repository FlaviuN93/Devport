import { NextFunction, Request, Response } from 'express'
import { getUser, getUserAndProjects, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import AppError, { getSuccessMessage } from '../utils/appError'

export const getUserAndProjectsData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUserAndProjects(req.userId)
	if (response instanceof AppError) return next(response)
	const { userWithProjects, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		data: userWithProjects,
	})
}

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUser(req.userId)
	if (response instanceof AppError) return next(response)
	const { user, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		data: user,
	})
}

export const updateUserData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userData = updateUserSchema.parse(req.body)
	const response = await updateUser(userData)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})
