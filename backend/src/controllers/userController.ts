import { Request, Response } from 'express'
import supabase from '../services/supabase'
import { getUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'

export const checkId = async (req: Request, res: Response) => {
	console.log(req.params.id, 'checkUserId')
}

export const getUserAndProjectsData = async (req: Request, res: Response) => {
	console.log(req, 'Get user and projects data')
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const getUserData = async (req: Request, res: Response) => {
	const data = await getUser(req.params.id)
}

export const updateUserData = catchAsync(async (req: Request, res: Response) => {
	console.log(req.body, 'Patch method for updating user settings')
	const user = updateUserSchema.parse(req.body)
})
