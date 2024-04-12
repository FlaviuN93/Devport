import express from 'express'
import {
	forgotPasswordHandler,
	loginUserHandler,
	registerUserHandler,
	resetPasswordHandler,
} from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/register').post(registerUserHandler)
authRouter.route('/login').post(loginUserHandler)
authRouter.route('/password').post(forgotPasswordHandler).patch(resetPasswordHandler)

export default authRouter
