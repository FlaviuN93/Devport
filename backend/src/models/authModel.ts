import supabase from '../services/supabase'
import AppError from '../utils/appError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { checkPasswordChange, createPasswordResetToken, verifyToken } from '../utils/functions'
import { removePassword } from '../utils/functions'
import { sendEmail } from '../utils/email'

export const registerUser = async (email: string, password: string): Promise<IRegisterUser | AppError> => {
	const hashedPassword = await bcrypt.hash(password, 12)
	const {
		data: user,
		error,
		status,
		statusText,
	} = await supabase.from('users').insert({ email, password: hashedPassword }).select('id,email').single()

	if (error) return new AppError(status, statusText)

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

	return { email: user.email, token, status, statusText }
}

export const loginUser = async (email: string, loginPassword: string): Promise<ILoginUser | AppError> => {
	const response = await supabase.from('users').select('*').eq('email', email).single()
	const { data: user, error, status, statusText } = response

	if (!user)
		return new AppError(404, 'Not Found', 'The user credentials you entered are incorect. Please try again.')
	if (error) return new AppError(status, statusText)

	const arePasswordsEqual = await bcrypt.compare(loginPassword, user.password)
	if (!arePasswordsEqual) return new AppError(401, 'Unauthorized')

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

	const newUser = removePassword<LoginUser>(user)

	return { user: newUser, token, status, statusText }
}

export const forgotPassword = async (email: string, resetUrl: string): Promise<IDefault | AppError> => {
	const {
		data: user,
		error,
		status,
		statusText,
	} = await supabase.from('users').select('email').eq('email', email).single()

	if (!user)
		return new AppError(404, 'Not Found', 'There is no user with the email you entered. Please try again.')
	if (error) return new AppError(status, statusText)

	const resetToken = createPasswordResetToken()

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
		return new AppError(
			500,
			'Internal Server Error',
			'There was an error sending the email. Try again later!'
		)
	}

	return { status, statusText }
}

export const resetPassword = async (newPassword: string) => {
	const { data, error, status, statusText } = await supabase
		.from('users')
		.select('password')
		.eq('password', newPassword)
		.single()

	console.log(error, status, statusText, 'resetPassword')
}

export const protect = async (reqToken: string): Promise<{ userId: number } | AppError> => {
	if (!reqToken) return new AppError(401, 'Unauthorized')

	const decodedToken = verifyToken<TokenPayload>(reqToken)
	if (decodedToken instanceof AppError) return decodedToken

	const { data: user } = await supabase.from('users').select('*').eq('id', decodedToken.userId).single()

	if (!decodedToken.iat) return new AppError(500, 'JsonWebToken', 'Something went wrong. Please log in again')
	if (!user) return new AppError(404, 'Not Found')

	const isPasswordChanged = checkPasswordChange(decodedToken.iat, (user as User).password_updated_at)
	if (isPasswordChanged)
		return new AppError(401, 'Unauthorized', 'User recently changed password! Please log in again')

	return { userId: (user as User).id }
}

type LoginUser = {
	fullName: string
	email: string
	id: number
	avatarImage: string
}

interface IDefault {
	token?: string
	status: number
	statusText: string
}
interface ILoginUser extends IDefault {
	user: LoginUser
}

interface IRegisterUser extends IDefault {
	email: string
}

interface TokenPayload extends JwtPayload {
	userId: number
}

type User = {
	fullName: string
	email: string
	jobTitle: string
	password: string
	bio: string
	id: number
	coverImage: string
	avatarImage: string
	password_updated_at: string
}
