import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import supabase from './services/supabase'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: process.env.VITE_APP_LOCAL_DOMAIN }))
app.use(bodyParser.json())

app.get('/hello', async (req: Request, res: Response) => {
	let { data: users, error } = await supabase.from('users').select('*')

	res.json({ data: users, message: 'Hello from express server' })
})

app
	.route('/api/v1/users')
	.get(async (req: Request, res: Response) => {
		console.log(req, 'Get all users')
		let { data: users, error } = await supabase.from('users').select('*')
	})
	.post(async (req: Request, res: Response) => {
		const body = req.body
		console.log(body, 'Post method for users')
	})
app.route('/api/v1/auth/forgot-password').post(async (req: Request, res: Response) => {
	const email = req.body.email
	console.log(email, 'ForgotPassword')
})

app.route('/api/v1/auth/reset-password').patch(async (req: Request, res: Response) => {
	const body = req.body
	console.log(body, 'ResetPassword')
})

app
	.route('/api/v1/users/:id')
	.get(async (req: Request, res: Response) => {
		console.log(req, 'Get user data')
		let { data: users, error } = await supabase.from('users').select('*')
	})
	.patch(async (req: Request, res: Response) => {
		console.log(req.body, 'Patch method for updating user settings')
	})

app
	.route('/api/v1/projects/:userId')
	.get(async (req: Request, res: Response) => {
		console.log(req.params, 'Get projects data')
		// let { data: users, error } = await supabase.from('projects').select('*')
	})
	.post(async (req: Request, res: Response) => {
		console.log(req.body, 'Post a new project data')
		// let { data: users, error } = await supabase.from('users').select('*')
	})
	.patch(async (req: Request, res: Response) => {
		console.log(req.body, req.params, 'Patch an existing project data')
		// let { data: users, error } = await supabase.from('users').select('*')
	})

app.route('/api/v1/my-portfolio/:userId').get(async (req: Request, res: Response) => {
	console.log(req, 'Get user and projects data')
	// let { data: users, error } = await supabase.from('users').select('*')
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

export default app
