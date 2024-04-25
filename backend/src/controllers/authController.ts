import { NextFunction, Request, Response } from 'express'
import {
	forgotPassword,
	loginUser,
	protect,
	registerUser,
	resetPassword,
	updatePassword,
} from '../models/authModel'

import { catchAsync } from '../utils/errorFunctions'
import {
	authSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
	updatePasswordSchema,
} from '../services/routeSchema'
import AppError, { getSuccessMessage } from '../utils/appError'
import { sendTokenByCookie } from '../utils/functions'

export const registerUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)

	const response = await registerUser(email, password)
	if (response instanceof AppError) return next(response)

	const { email: userEmail, token, statusCode, statusText } = response
	sendTokenByCookie(token, res, next)
	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		user: userEmail,
	})
})

export const loginUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = await authSchema.parseAsync(req.body)
	const response = await loginUser(email, password)

	if (response instanceof AppError) return next(response)
	const { user, token, statusCode, statusText } = response
	sendTokenByCookie(token, res, next)
	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		user,
	})
})

export const updatePasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const passwords = updatePasswordSchema.parse(req.body)

	const response = await updatePassword(passwords, req.userId)
	if (response instanceof AppError) return next(response)
	const { user, token, statusCode, statusText } = response

	sendTokenByCookie(token, res, next)
	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
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
		message: getSuccessMessage(statusCode, statusText),
	})
})

export const resetPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { password } = resetPasswordSchema.parse(req.body)
	const response = await resetPassword(password, req.params.token)

	if (response instanceof AppError) return next(response)
	const { user, token, statusCode, statusText } = response

	sendTokenByCookie(token, res, next)
	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		user,
	})
})

export const protectHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	let reqToken = ''
	if (req.headers.authorization?.startsWith('Bearer')) reqToken = req.headers.authorization.split(' ')[1]
	const response = await protect(reqToken)

	if (response instanceof AppError) return next(response)

	// I could add userRoles here if needed
	req.userId = response.userId
	next()
})
