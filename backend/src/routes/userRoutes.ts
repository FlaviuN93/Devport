import { protectHandler } from '../controllers/authController'
import express from 'express'
import {
	deleteMeHandler,
	getMeHandler,
	getUserAndProjectsHandler,
	resizeUserImages,
	updateMeHandler,
	uploadUserImages,
} from '../controllers/userController'

const userRouter = express.Router()

userRouter.route('/projects/:userId').get(getUserAndProjectsHandler)

userRouter
	.route('/currentUser')
	.get(protectHandler, getMeHandler)
	.patch(protectHandler, uploadUserImages, resizeUserImages, updateMeHandler)
	.delete(protectHandler, deleteMeHandler)

export default userRouter
