import {
	getUserAndProjectsData,
	getUserData,
	updateUserData,
	checkId,
} from '../controllers/userController'
import express from 'express'

const userRouter = express.Router()

userRouter.param('id', checkId)

userRouter.route('/').get(getUserAndProjectsData)
userRouter.route('/:id').get(getUserData).patch(updateUserData)

export default userRouter
