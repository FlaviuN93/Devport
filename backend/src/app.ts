import express from 'express'
import 'dotenv/config' // This import should not be moved from here
import cors from 'cors'
import bodyParser from 'body-parser'
import projectRouter from './routes/projectRoutes'
import userRouter from './routes/userRoutes'
import authRouter from './routes/authRoutes'

const app = express()

app.use(cors({ origin: process.env.VITE_APP_LOCAL_DOMAIN }))
app.use(bodyParser.json())

app.use(projectRouter)
app.use(userRouter)
app.use(authRouter)

export default app
