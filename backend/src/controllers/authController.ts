import { NextFunction, Request, Response } from 'express'
import { forgotPassword, loginUser, protect, registerUser, resetPassword } from '../models/authModel'

import { catchAsync } from '../utils/errorFunctions'
import { authSchema, forgotPasswordSchema, resetPasswordSchema } from '../services/routeSchema'
import AppError, { successMessage } from '../utils/appError'

export const registerUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)

	const response = await registerUser(email, password)
	if (response instanceof AppError) return next(response)

	const { email: userEmail, token, status, statusText } = response

	res.status(status).json({
		statusText,
		message: successMessage[status],
		user: userEmail,
		token,
	})
})

export const loginUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)
	const response = await loginUser(email, password)

	if (response instanceof AppError) return next(response)
	const { user, token, status, statusText } = response

	res.status(status).json({
		statusText: statusText,
		message: successMessage[status],
		user,
		token,
	})
})

export const forgotPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email } = forgotPasswordSchema.parse(req.body)
	const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/password`

	const response = await forgotPassword(email, resetUrl)
	if (response instanceof AppError) return next(response)

	res.status(response.status).json({
		statusText: response.statusText,
		message: 'Token sent to email',
	})
})

export const resetPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { password } = resetPasswordSchema.parse(req.body)
	const response = await resetPassword(password, req.params.token)
	console.log(response, 'ResetPassword')
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
