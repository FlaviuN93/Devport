import { Request, Response } from 'express'
import { register, login } from '../models/authModel'

export const forgotPassword = async (req: Request, res: Response) => {
	const email = req.body.email
	console.log(email, 'ForgotPassword')
}

export const resetPassword = async (req: Request, res: Response) => {
	const body = req.body
	console.log(body, 'ResetPassword')
}

export const registerUser = async (req: Request, res: Response) => {
	// if(req.body)
	const message = register(req.body)
	console.log(message, 'Auntheticate')
	res.status(200).json('hello From Authenticate')
}

export const loginUser = async (req: Request, res: Response) => {
	// if(req.body)
	const message = login(req.body)
	console.log(message, 'Auntheticate')
	res.status(200).json('hello From Authenticate')
}
