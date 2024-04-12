import { NextFunction, Request, Response } from 'express'
import { forgotPassword, loginUser, registerUser, resetPassword } from '../models/authModel'

import { catchAsync } from '../utils/errorFunctions'
import { authSchema, forgotPasswordSchema, resetPasswordSchema } from '../services/routeSchema'

export const forgotPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email } = forgotPasswordSchema.parse(req.body)
	const response = forgotPassword(email)
	console.log(response, 'ForgotPassword')
})

export const resetPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { password } = resetPasswordSchema.parse(req.body)
	const response = resetPassword(password)
	console.log(response, 'ResetPassword')
})

export const registerUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = authSchema.parse(req.body)
	const response = await registerUser(email, password)
	console.log(response, 'RegisterUser')
	res.status(200).json('hello From Authenticate')
})

export const loginUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = authSchema.parse(req.body)
	const response = await loginUser(email, password)
	console.log(response, 'Login')
	res.status(200).json('hello From Authenticate')
})
