import supabase from '../services/supabase'
import AppError from '../utils/appError'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { removePassword } from '../utils/functions'

export const registerUser = async (email: string, password: string): Promise<any | AppError> => {
	const hashedPassword = await bcrypt.hash(password, 12)
	const {
		data: user,
		error,
		status,
		statusText,
	} = await supabase.from('users').insert({ email, password: hashedPassword }).select('id,email').single()

	if (error) return new AppError(status, statusText)

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})

	return { email: user.email, token, status, statusText }
}

export const loginUser = async (email: string, loginPassword: string): Promise<any | AppError> => {
	const response = await supabase
		.from('users')
		.select('id,password,fullName,email,avatarImage')
		.eq('email', email)
		.single()
	const { data: user, error, status, statusText } = response
	if (error) return new AppError(status, statusText)

	const arePasswordsEqual = await bcrypt.compare(loginPassword, user.password)
	if (!arePasswordsEqual) return new AppError(401, 'Unauthorized')

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
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
