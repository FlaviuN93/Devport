import { protectHandler, userRolesHandler } from '../controllers/authController'
import express from 'express'
import {
	deleteMeHandler,
	getMeHandler,
	getMyPortfolioHandler,
	getUserAndProjectsHandler,
	resizeUserImages,
	updateMeHandler,
	updateMyPortolioHandler,
	uploadUserImages,
} from '../controllers/userController'

const userRouter = express.Router()

userRouter.route('/projects/:userId').get(getUserAndProjectsHandler)

userRouter
	.route('/projects/currentUser')
	.get(protectHandler, userRolesHandler('user', 'tester'), getMyPortfolioHandler)
	.patch(protectHandler, userRolesHandler('user'), uploadUserImages, resizeUserImages, updateMyPortolioHandler)

userRouter
	.route('/currentUser')
	.get(protectHandler, userRolesHandler('user', 'tester'), getMeHandler)
	.patch(protectHandler, userRolesHandler('user'), uploadUserImages, resizeUserImages, updateMeHandler)
	.delete(protectHandler, userRolesHandler('user'), deleteMeHandler)

export default userRouter
