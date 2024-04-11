import supabase from '../services/supabase'

export const register = async (email: string, password: string) => {
	const { data, error, status } = await supabase.from('users').insert({ email, password }).select().single()
	console.log(data, 'CheckRegister')
}

export const login = async (email: string, password: string) => {
	const { data, error, status } = await supabase.from('users').select().eq('password', password).single()
	console.log(data, 'CheckLogin')
}

export const forgot = async (email: string) => {
	const { data, error, status } = await supabase.from('users').select('email').eq('email', email).single()
}

export const reset = async (newPassword: string) => {
	const { data, error, status } = await supabase
		.from('users')
		.select('password')
		.eq('password', newPassword)
		.single()
}
