import { Request, Response } from 'express'
import supabase from '../services/supabase'
import { getUser } from '../models/userModel'

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

export const updateUserData = async (req: Request, res: Response) => {
	console.log(req.body, 'Patch method for updating user settings')
}
