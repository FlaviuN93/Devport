import express from 'express'
import {
	checkResetTokenHandler,
	contactUsHandler,
	forgotPasswordHandler,
	githubAccessTokenHandler,
	loginUserHandler,
	logoutMeHandler,
	protectHandler,
	refreshTokenHandler,
	registerUserHandler,
	resetPasswordHandler,
	updatePasswordHandler,
	userRolesHandler,
} from '../controllers/authController'

const authRouter = express.Router()

authRouter.route('/contactUs').post(contactUsHandler)
authRouter.route('/register').post(registerUserHandler)
authRouter.route('/login').post(loginUserHandler)
authRouter.route('/refreshToken').get(refreshTokenHandler)
authRouter.route('/logout').post(protectHandler, logoutMeHandler)
authRouter.route('/forgotPassword').post(forgotPasswordHandler)
authRouter.route('/updatePassword').post(protectHandler, userRolesHandler('user'), updatePasswordHandler)
authRouter.route('/resetPassword/:resetToken').get(checkResetTokenHandler).patch(resetPasswordHandler)
authRouter.route('/github/:accessToken').get(githubAccessTokenHandler)

export default authRouter
