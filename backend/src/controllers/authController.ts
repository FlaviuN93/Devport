import { Request, Response } from 'express'

export const forgotPassword = async (req: Request, res: Response) => {
	const email = req.body.email
	console.log(email, 'ForgotPassword')
}

export const resetPassword = async (req: Request, res: Response) => {
	const body = req.body
	console.log(body, 'ResetPassword')
}
