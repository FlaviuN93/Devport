import { NextFunction, Request, Response } from 'express'
import { register, login } from '../models/authModel'

import { catchAsync } from '../utils/errorFunctions'
import { authSchema, forgotPasswordSchema, resetPasswordSchema } from '../services/routeSchema'

export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const email = forgotPasswordSchema.parse(req.body)
	console.log(email, 'ForgotPassword')
})

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { password } = resetPasswordSchema.parse(req.body)
	console.log(password, 'ResetPassword')
})

export const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = authSchema.parse(req.body)
	register(email, password)

	res.status(200).json('hello From Authenticate')
})

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = authSchema.parse(req.body)
	const message = login(email, password)
	console.log(message, 'Auntheticate')
	res.status(200).json('hello From Authenticate')
})
