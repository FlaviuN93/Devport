import { NextFunction, Request, Response } from 'express'
import { forgotPassword, loginUser, protect, registerUser, resetPassword } from '../models/authModel'

import { catchAsync } from '../utils/errorFunctions'
import { authSchema, forgotPasswordSchema, resetPasswordSchema } from '../services/routeSchema'
import AppError, { getSuccessMessage } from '../utils/appError'

export const registerUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)

	const response = await registerUser(email, password)
	if (response instanceof AppError) return next(response)

	const { email: userEmail, token, statusCode, statusText } = response

	res.status(statusCode).json({
		statusText,
		message: getSuccessMessage(statusCode, statusText),
		user: userEmail,
		token,
	})
})

export const loginUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)
	const response = await loginUser(email, password)

	if (response instanceof AppError) return next(response)
	const { user, token, statusCode, statusText } = response

	res.status(statusCode).json({
		statusText,
		message: getSuccessMessage(statusCode, statusText),
		token,
		user,
	})
})

export const forgotPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email } = forgotPasswordSchema.parse(req.body)

	const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/password`
	const response = await forgotPassword(email, resetUrl)

	if (response instanceof AppError) return next(response)
	const { statusCode, statusText } = response

	res.status(statusCode).json({
		statusText,
		message: getSuccessMessage(statusCode, statusText),
	})
})

export const resetPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { password } = resetPasswordSchema.parse(req.body)
	const response = await resetPassword(password, req.params.token)
	console.log(response, 'ResetPassword')

	if (response instanceof AppError) return next(response)
	const { user, token, statusCode, statusText } = response

	res.status(statusCode).json({
		statusText,
		message: getSuccessMessage(statusCode, statusText),
		token,
		user,
	})
})

export const protectHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	let reqToken = ''
	if (req.headers.authorization?.startsWith('Bearer')) reqToken = req.headers.authorization.split(' ')[1]
	const response = await protect(reqToken)

	if (response instanceof AppError) return next(response)

	// I could add here userRoles if needed
	req.userId = response.userId
	next()
})
