import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config' // This import should not be moved from here
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import projectRouter from './routes/projectRoutes'
import userRouter from './routes/userRoutes'
import authRouter from './routes/authRoutes'
import AppError from './utils/appError'
import { globalErrorHandler } from './utils/errorFunctions'

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(cors({ origin: process.env.VITE_APP_LOCAL_DOMAIN }))
app.use(bodyParser.json())

app.use('/api/projects', projectRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(404, 'Not Found'))
})

app.use(globalErrorHandler)

export default app
