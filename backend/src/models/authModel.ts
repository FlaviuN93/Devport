import supabase from '../services/supabase'
import AppError from '../utils/appError'
import jwt from 'jsonwebtoken'

export const registerUser = async (email: string, password: string): Promise<IUser | AppError> => {
	const {
		data: user,
		error,
		status,
		statusText,
	} = await supabase
		.from('users')
		.insert({ email, password })
		.select('id,fullName,email,avatarImage')
		.single()
	if (error) return new AppError(status, statusText)
	const token = jwt.sign({ user }, process.env.JWT_SECRET || '', {
		expiresIn: process.env.JWT_EXPIRES_IN || '',
	})
	return { user, token, status, statusText }
}

export const loginUser = async (email: string, password: string) => {
	const { data, error, status, statusText } = await supabase
		.from('users')
		.select()
		.eq('password', password)
		.single()
	console.log(data, status, error, statusText, 'CheckLogin')
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

type RegisteredUser = {
	fullName: string
	email: string
	id: number
	avatarImage: string
}

interface IUser {
	user: RegisteredUser
	token: string
	status: number
	statusText: string
}
