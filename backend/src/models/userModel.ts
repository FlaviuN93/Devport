import { z } from 'zod'
import { emailSchema, passwordSchema } from './baseSchema'

const authSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})

export const authentication = (email: string, password: string) => {
	try {
		const data = authSchema.parse({ email, password })
		console.log(data, 'authSchema')
	} catch (err) {
		console.log(err, 'Error Message from auth')
	}
}
