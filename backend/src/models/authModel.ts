import supabase from '../services/supabase'

export const registerUser = async (email: string, password: string) => {
	const { data, error, status, statusText } = await supabase
		.from('users')
		.insert({ email, password })
		.select()
		.single()
	console.log(data, error, status, statusText, 'CheckRegister')
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
