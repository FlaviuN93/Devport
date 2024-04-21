import supabase from '../services/supabase'
import AppError from '../utils/appError'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import {
	checkPasswordChange,
	createPasswordResetToken,
	removeUserPassword,
	signToken,
	verifyToken,
} from '../utils/functions'

import { sendEmail } from '../utils/email'
import { BaseUser, IDefault, ILoginUser, IRegisterUser, LoginUser, TokenPayload } from './types'

export const registerUser = async (email: string, password: string): Promise<IRegisterUser | AppError> => {
	const hashedPassword = await bcrypt.hash(password, 12)
	const {
		data: user,
		error,
		status,
	} = await supabase.from('users').insert({ email, password: hashedPassword }).select('id,email').single()

	if (!user) return new AppError(400)
	if (error) return new AppError(status)

	const token = signToken(user.id)

	return { email: user.email, token, statusCode: 201, statusText: ['user', 'created'] }
}

export const loginUser = async (email: string, loginPassword: string): Promise<ILoginUser | AppError> => {
	const {
		data: user,
		error,
		status,
	} = await supabase
		.from('users')
		.select('id,email,fullName,avatarImage,password')
		.eq('email', email)
		.single()

	if (!user) return new AppError(404, 'The user credentials you entered are incorect. Please try again.')
	if (error) return new AppError(status)

	const arePasswordsEqual = await bcrypt.compare(loginPassword, user.password)
	if (!arePasswordsEqual) return new AppError(401)

	const newUser = removeUserPassword<LoginUser>(user)
	const token = signToken(user.id)

	return { user: newUser, token, statusCode: 200, statusText: [''] }
}

export const forgotPassword = async (email: string, resetUrl: string): Promise<IDefault | AppError> => {
	const {
		data: user,
		error,
		status,
	} = await supabase.from('users').select('email').eq('email', email).single()

	if (!user) return new AppError(404, 'There is no user with the email you entered. Please try again.')
	if (error) return new AppError(status)

	const { resetToken, encryptedResetToken, tokenExpiresIn } = createPasswordResetToken()
	console.log('forgotPassword', user, encryptedResetToken, tokenExpiresIn)

	await supabase
		.from('users')
		.update({ resetToken: encryptedResetToken, resetTokenExpiresIn: tokenExpiresIn })
		.eq('email', email)
		.select('id')
		.single()

	const resetURL = `${resetUrl}/${resetToken}`
	const message = `Forgot your password? Submit a patch request with your new password and password confirm to: ${resetURL}.\n
						If you didin't forget your password, please ignore this email!`

	try {
		await sendEmail({
			email: user.email,
			subject: 'Your password reset token is only valid for 10 minutes',
			message,
		})
	} catch (err) {
		return new AppError(500, 'There was an error sending the email. Try again later!')
	}

	return { statusCode: 200, statusText: ['forgot password', 'reset password link was send to your email'] }
}

export const resetPassword = async (
	newPassword: string,
	resetToken: string
): Promise<ILoginUser | AppError> => {
	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

	const {
		data: user,
		error,
		status,
	} = await supabase
		.from('users')
		.select('id,email,fullName,avatarImage,password')
		.eq('resetToken', hashedToken)
		.gt('resetTokenExpiresIn', Date.now())
		.single()

	if (!user) return new AppError(400, 'Token is invalid or has expired!')
	if (error) return new AppError(status)

	const hashedPassword = await bcrypt.hash(newPassword, 12)
	console.log(hashedPassword, 'New Password', user.password, 'OldPassword')
	await supabase.from('users').update({ password: hashedPassword, resetToken: '', resetTokenExpiresIn: null })

	const token = signToken(user.id)

	return {
		user,
		token,
		statusCode: 200,
		statusText: ['reset password', 'new password was saved successfully'],
	}
}

export const protect = async (reqToken: string): Promise<{ userId: string } | AppError> => {
	if (!reqToken) return new AppError(401)

	const decodedToken = verifyToken<TokenPayload>(reqToken)
	if (decodedToken instanceof AppError) return decodedToken

	const {
		data: user,
		error,
		status,
	} = await supabase.from('users').select('*').eq('id', decodedToken.userId).single()

	if (!user) return new AppError(404)
	if (error) return new AppError(status)
	if (!decodedToken.iat) return new AppError(500, 'Something went wrong. Please log in again')

	const isPasswordChanged = checkPasswordChange(decodedToken.iat, user.passwordUpdatedAt)
	if (isPasswordChanged) return new AppError(401, 'User recently changed password! Please log in again')

	return { userId: (user as BaseUser).id.toString() }
}
