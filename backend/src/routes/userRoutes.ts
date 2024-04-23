import { protectHandler } from '../controllers/authController'
import {
	deleteUserHandler,
	getUserAndProjectsHandler,
	getUserHandler,
	updateUserHandler,
} from '../controllers/userController'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/projects/:userId').get(getUserAndProjectsHandler)

userRouter
	.route('/:userId')
	.get(protectHandler, getUserHandler)
	.patch(protectHandler, updateUserHandler)
	.delete(protectHandler, deleteUserHandler)

export default userRouter
