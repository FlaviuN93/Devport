import { Request, Response } from 'express'
import supabase from '../services/supabase'
import { authentication } from '../models/userModel'

export const checkId = async (req: Request, res: Response) => {
	console.log(req.params.id, 'checkUserId')
}

export const checkAuthUserData = async (req: Request, res: Response) => {
	console.log(req.params.id, 'checkAuthUser')
}

export const checkUserData = async (req: Request, res: Response) => {
	console.log(req.params.id, 'checkUserData')
}

export const getUserAndProjects = async (req: Request, res: Response) => {
	console.log(req, 'Get user and projects data')
	// let { data: users, error } = await supabase.from('users').select('*')
}
export const authenticateUser = async (req: Request, res: Response) => {
	const message = authentication(req.body.email, req.body.password)
	console.log(message, 'ForgotPassword')
}

export const getUser = async (req: Request, res: Response) => {
	console.log(req, 'Get user data')
	let { data: users, error } = await supabase.from('users').select('*')
}

export const updateUser = async (req: Request, res: Response) => {
	console.log(req.body, 'Patch method for updating user settings')
}
