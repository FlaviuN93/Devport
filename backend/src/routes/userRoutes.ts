import { protectHandler } from '../controllers/authController'
import { getUserAndProjectsData, getUserData, updateUserData } from '../controllers/userController'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/projects/:userId').get(getUserAndProjectsData)
userRouter.route('/').get(protectHandler, getUserData).patch(protectHandler, updateUserData)

export default userRouter
