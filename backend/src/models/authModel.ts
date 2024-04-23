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
import { z } from 'zod'
import { updatePasswordSchema } from '../services/routeSchema'

export const registerUser = async (email: string, password: string): Promise<IRegisterUser | AppError> => {
	const hashedPassword = await bcrypt.hash(password, 12)
	const { data: user, error } = await supabase
		.from('users')
		.insert({ email, password: hashedPassword })
		.select('id,email')
		.single()

	if (!user) return new AppError(400)
	if (error) return new AppError(500)

	const token = signToken(user.id)

	return { email: user.email, token, statusCode: 201, statusText: ['user', 'created'] }
}

export const loginUser = async (email: string, loginPassword: string): Promise<ILoginUser | AppError> => {
	const { data: user } = await supabase
		.from('users')
		.select('id,email,fullName,avatarURL,password')
		.eq('email', email)
		.single()
	if (!user) return new AppError(404, `Your user credentials don't match. Try again.`)

	const arePasswordsEqual = await bcrypt.compare(loginPassword, user.password)
	if (!arePasswordsEqual) return new AppError(401, `Hmm, that password doesn't seem to match. Try again.`)

	const token = signToken(user.id)
	const loginUser = removeUserPassword<LoginUser>(user)

	return { user: loginUser, token, statusCode: 200, statusText: [] }
}

export const updatePassword = async (
	passwords: UpdatePasswordType,
	userId: string
): Promise<ILoginUser | AppError> => {
	const { data: user } = await supabase
		.from('users')
		.select('id,email,fullName,avatarURL,password')
		.eq('id', userId)
		.single()
	if (!user) return new AppError(404, 'User token has probably expired. Try to log in again.')

	const arePasswordsEqual = await bcrypt.compare(passwords.currentPassword, user.password)
	if (!arePasswordsEqual) return new AppError(401, `Hmm, that password doesn't seem to match. Try again.`)

	const hashedPassword = bcrypt.hash(passwords.newPassword, 12)
	const { error } = await supabase
		.from('users')
		.update({ password: hashedPassword })
		.eq('id', user.id)
		.select('id')
		.single()
	if (error) return new AppError(500)

	const token = signToken(user.id)
	const loginUser = removeUserPassword<LoginUser>(user)
	return { user: loginUser, token, statusCode: 200, statusText: [] }
}

export const forgotPassword = async (email: string, resetUrl: string): Promise<IDefault | AppError> => {
	const { data: user } = await supabase.from('users').select('email').eq('email', email).single()

	if (!user) return new AppError(404, 'There is no user with the email you entered. Please try again.')

	const { resetToken, encryptedResetToken, tokenExpiresIn } = createPasswordResetToken()

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

	return { statusCode: 200, statusText: ['forgot password', 'reset link was send to your email'] }
}

export const resetPassword = async (
	newPassword: string,
	resetToken: string
): Promise<ILoginUser | AppError> => {
	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

	const { data: user } = await supabase
		.from('users')
		.select('id,email,fullName,avatarURL,password')
		.eq('resetToken', hashedToken)
		.gt('resetTokenExpiresIn', Date.now())
		.single()
	if (!user) return new AppError(400, 'Token is invalid or has expired!')

	const hashedPassword = await bcrypt.hash(newPassword, 12)
	const { error: resetError } = await supabase
		.from('users')
		.update({
			password: hashedPassword,
			resetToken: '',
			resetTokenExpiresIn: null,
			passwordUpdatedAt: new Date().toISOString(),
		})
		.eq('resetToken', hashedToken)

	if (resetError)
		return new AppError(500, 'Something went wrong with saving your new password. Please try again later')

	const token = signToken(user.id)
	const loginUser = removeUserPassword<LoginUser>(user)

	return {
		user: loginUser,
		token,
		statusCode: 200,
		statusText: ['reset password', 'new password was saved successfully'],
	}
}

export const protect = async (reqToken: string): Promise<{ userId: string } | AppError> => {
	if (!reqToken) return new AppError(401)

	const decodedToken = verifyToken<TokenPayload>(reqToken)
	if (decodedToken instanceof AppError) return decodedToken

	const { data: user } = await supabase.from('users').select('*').eq('id', decodedToken.userId).single()

	if (!user) return new AppError(404)
	if (!decodedToken.iat) return new AppError(500, 'Something went wrong. Please log in again')

	const isPasswordChanged = checkPasswordChange(decodedToken.iat, user.passwordUpdatedAt)
	if (isPasswordChanged) return new AppError(401, 'User recently changed password! Please log in again')

	return { userId: (user as BaseUser).id.toString() }
}

type UpdatePasswordType = z.infer<typeof updatePasswordSchema>
