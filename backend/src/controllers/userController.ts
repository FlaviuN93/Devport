import { NextFunction, Request, Response } from 'express'
import { deleteUser, getUser, getUserAndProjects, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import AppError, { getSuccessMessage } from '../utils/appError'
import { idSchema } from '../services/baseSchema'

export const getUserAndProjectsHandler = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = idSchema.parse(req.params.userId).toString()

		const response = await getUserAndProjects(userId)
		if (response instanceof AppError) return next(response)
		const { userWithProjects, statusCode, statusText } = response

		res.status(statusCode).json({
			message: getSuccessMessage(statusCode, statusText),
			user: userWithProjects,
		})
	}
)

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUser(req.userId)
	if (response instanceof AppError) return next(response)
	const { user, statusCode, statusText } = response
	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		user,
	})
}

export const updateMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userData = updateUserSchema.parse(req.body)
	const response = await updateUser(userData, req.userId)

	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})

export const deleteMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const response = await deleteUser(req.userId)
	if (response instanceof AppError) return next(response)

	res.status(response.statusCode).json({
		message: getSuccessMessage(response.statusCode, response.statusText),
	})
})
