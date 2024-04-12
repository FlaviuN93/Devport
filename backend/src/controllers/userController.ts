import { Request, Response } from 'express'
import { getUser, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import { getProjects } from '../models/projectModel'

export const getUserAndProjectsData = async (req: Request, res: Response) => {
	const userData = await getUser(req.params.id)
	const projectsData = await getProjects(req.params.id)
	console.log(projectsData, userData, 'getUserAndPRojects')
}

export const getUserData = async (req: Request, res: Response) => {
	const response = await getUser(req.params.id)
	console.log(response, 'getUser')
}

export const updateUserData = catchAsync(async (req: Request, res: Response) => {
	const userData = updateUserSchema.parse(req.body)
	const response = await updateUser(userData)
	console.log(response, 'Update User')
})
