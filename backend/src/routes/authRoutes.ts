import express from 'express'
import { forgotPassword, resetPassword } from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/password').post(forgotPassword).patch(resetPassword)

export default authRouter
