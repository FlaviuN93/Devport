import express from 'express'
import { forgotPassword, loginUser, registerUser, resetPassword } from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/register').post(registerUser)
authRouter.route('/login').post(loginUser)
authRouter.route('/password').post(forgotPassword).patch(resetPassword)

export default authRouter
