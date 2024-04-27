import express from 'express'
import {
	forgotPasswordHandler,
	loginUserHandler,
	protectHandler,
	registerUserHandler,
	resetPasswordHandler,
	updatePasswordHandler,
} from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/register').post(registerUserHandler)
authRouter.route('/login').post(loginUserHandler)
authRouter.route('/forgotPassword').post(forgotPasswordHandler)
authRouter.route('/changePassword').post(protectHandler, updatePasswordHandler)
authRouter.route('/resetPassword/:resetToken').patch(resetPasswordHandler)
export default authRouter
