import express from 'express'
import {
	forgotPasswordHandler,
	loginUserHandler,
	protectHandler,
	registerUserHandler,
	resetPasswordHandler,
	updatePasswordHandler,
	userRolesHandler,
} from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/register').post(registerUserHandler)
authRouter.route('/login').post(loginUserHandler)
authRouter.route('/forgotPassword').post(forgotPasswordHandler)
authRouter.route('/changePassword').post(protectHandler, userRolesHandler('user'), updatePasswordHandler)
authRouter.route('/resetPassword/:resetToken').patch(resetPasswordHandler)

export default authRouter
