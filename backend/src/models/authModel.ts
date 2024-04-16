import supabase from '../services/supabase'
import AppError from '../utils/appError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { checkPasswordChange, verifyToken } from '../utils/functions'
import { removePassword } from '../utils/functions'

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
	if (error) return new AppError(status, statusText)

	const arePasswordsEqual = await bcrypt.compare(loginPassword, user.password)

	if (!arePasswordsEqual) return new AppError(401, 'Unauthorized')

	const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

	const newUser = removePassword<LoginUser>(user)

	return { user: newUser, token, status, statusText }
}

export const forgotPassword = async (email: string) => {
	const { data, error, status, statusText } = await supabase
		.from('users')
		.select('email')
		.eq('email', email)
		.single()
	console.log(error, status, statusText, 'forgotPassword')
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
	token: string
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
