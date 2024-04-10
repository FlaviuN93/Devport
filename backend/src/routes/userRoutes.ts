import {
	getUserAndProjects,
	authenticateUser,
	getUser,
	updateUser,
	checkId,
	checkAuthUserData,
	checkUserData,
} from '../controllers/userController'
import express from 'express'

const userRouter = express.Router()

userRouter.param('id', checkId)

userRouter.route('/').get(getUserAndProjects).post(checkAuthUserData, authenticateUser)
userRouter.route('/:id').get(getUser).patch(checkUserData, updateUser)

export default userRouter
