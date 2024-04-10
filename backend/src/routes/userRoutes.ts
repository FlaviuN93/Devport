import { getUserAndProjects, authenticateUser, getUser, updateUser } from '../controllers/userController'
import supabase from '../services/supabase'
import express from 'express'

const userRouter = express.Router()

userRouter.route('/').get(getUserAndProjects).post(authenticateUser)
userRouter.route('/:id').get(getUser).patch(updateUser)

export default userRouter
