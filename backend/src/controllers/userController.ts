import { NextFunction, Request, Response } from 'express'
import { deleteUser, getUser, getUserAndProjects, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import AppError, { getSuccessMessage } from '../utils/appError'

export const getUserAndProjectsHandler = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUserAndProjects(req.params.userId)
	if (response instanceof AppError) return next(response)
	const { userWithProjects, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		data: userWithProjects,
	})
}

export const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUser(req.userId)
	if (response instanceof AppError) return next(response)
	const { user, statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		data: user,
	})
}

export const updateUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userData = updateUserSchema.parse(req.body)
	const response = await updateUser(userData, req.userId)

	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})

export const deleteUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const response = await deleteUser(req.userId)
	if (response instanceof AppError) return next(response)

	res.status(response.statusCode).json({
		message: getSuccessMessage(response.statusCode, response.statusText),
	})
})
