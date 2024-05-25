import supabase from '../services/supabase'
import AppError from '../utils/appError'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import { hasPasswordChanged, createPasswordResetToken, signToken, verifyToken, removeUserColumns } from '../utils/functions'

import { sendEmail } from '../utils/email'
import { IDefault, IRegisterUser, IUser, TokenPayload, User } from './types'

export const registerUser = async (email: string, password: string): Promise<IRegisterUser | AppError> => {
	const hashedPassword = await bcrypt.hash(password, 12)
	const { data: user, error } = await supabase.from('users').insert({ email, password: hashedPassword }).select('id,email').single()

	if (!user) return new AppError(400)
	if (error) return new AppError(500)

	const token = signToken(user.id)

	return { user: { email: user.email }, token, statusCode: 201, statusText: ['user', 'created'] }
}

export const loginUser = async (email: string, loginPassword: string): Promise<IUser | AppError> => {
	const { data: user } = await supabase.from('users').select('*').eq('email', email).single()
	if (!user) return new AppError(400, `Your user credentials don't match. Try again.`)

	const arePasswordsEqual = await bcrypt.compare(loginPassword, user.password)
	if (!arePasswordsEqual) return new AppError(401, `Hmm, your user credentials don't match. Try again`)

	const token = signToken(user.id)
	const loginUser = removeUserColumns<User>(user)

	return { user: loginUser, token, statusCode: 200, statusText: ['login', 'Welcome back'] }
}

export const updatePassword = async (password: string, userId: string): Promise<IUser | AppError> => {
	const { data: user } = await supabase.from('users').select('*').eq('id', userId).single()
	if (!user) return new AppError(404, 'User token has probably expired. Try to log in again.')

	const hashedPassword = bcrypt.hash(password, 12)
	await supabase.from('users').update({ password: hashedPassword, passwordUpdatedAt: new Date().toISOString() }).eq('id', user.id)

	const token = signToken(user.id)
	const loginUser = removeUserColumns<User>(user)

	return {
		user: loginUser,
		token,
		statusCode: 200,
		statusText: ['update password', 'Your new password was updated successfully'],
	}
}

export const forgotPassword = async (email: string): Promise<IDefault | AppError> => {
	const { data: user } = await supabase.from('users').select('email,resetTokenExpiresIn').eq('email', email).single()

	if (!user) return new AppError(404, 'There is no user with the email you entered. Please try again.')

	const timeleft = Math.trunc((user.resetTokenExpiresIn - Date.now()) / (1000 * 60))
	if (Date.now() < user.resetTokenExpiresIn)
		return new AppError(
			429,
			`You have already made a request to reset your password. Check your email or try again in ${timeleft} minutes.`
		)

	const { resetToken, encryptedResetToken, tokenExpiresIn } = createPasswordResetToken()
	await supabase
		.from('users')
		.update({ resetToken: encryptedResetToken, resetTokenExpiresIn: tokenExpiresIn })
		.eq('email', email)
		.select('id')
		.single()

	const url = `${process.env.VITE_APP_LOCAL_DOMAIN}/auth/reset-password`
	const resetURL = `${url}/${resetToken}`
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

	return { statusCode: 200, statusText: ['forgot password', 'The reset link was send to your email'] }
}

export const resetPassword = async (newPassword: string, resetToken: string): Promise<IDefault | AppError> => {
	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
	const { data: user } = await supabase
		.from('users')
		.select('id,resetToken')
		.eq('resetToken', hashedToken)
		.gt('resetTokenExpiresIn', Date.now())
		.single()

	if (!user) return new AppError(400, 'Token is invalid or has expired!')
	if (!user.resetToken)
		return new AppError(
			429,
			'You have already made a succesful request to reset your password. If you want to change it again, go to the forgot password page and start again.'
		)

	const hashedPassword = await bcrypt.hash(newPassword, 12)
	await supabase
		.from('users')
		.update({
			password: hashedPassword,
			resetToken: '',
			resetTokenExpiresIn: null,
			passwordUpdatedAt: new Date().toISOString(),
		})
		.eq('resetToken', hashedToken)

	return {
		statusCode: 200,
		statusText: ['reset password', 'Your new password was saved successfully'],
	}
}

export const protect = async (reqToken: string): Promise<{ userId: string } | AppError> => {
	if (!reqToken) return new AppError(401, 'You are not logged in. Please log in to gain access')

	const decodedToken = verifyToken<TokenPayload>(reqToken)
	if (decodedToken instanceof AppError) return decodedToken

	const { data: user } = await supabase.from('users').select('*').eq('id', decodedToken.userId).single()
	if (!user) return new AppError(401, 'You are not logged in. Please log in to gain access')
	const isPasswordChanged = hasPasswordChanged(decodedToken.iat as number, user.passwordUpdatedAt)
	if (isPasswordChanged) return new AppError(401, 'You recently changed password! Please log in again')

	return { userId: user.id.toString() }
}
