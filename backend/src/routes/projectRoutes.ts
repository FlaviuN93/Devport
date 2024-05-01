import express from 'express'

import { protectHandler } from '../controllers/authController'
import {
	createMyProjectData,
	getMyProjectsData,
	updateMyProjectData,
	deleteMyProjectData,
	getMyProjectData,
} from '../controllers/projectController'

const projectRouter = express.Router()

projectRouter
	.route('/currentUser')
	.get(protectHandler, getMyProjectsData)
	.post(protectHandler, createMyProjectData)

projectRouter
	.route('/currentUser/:projectId')
	.get(protectHandler, getMyProjectData)
	.patch(protectHandler, updateMyProjectData)
	.delete(protectHandler, deleteMyProjectData)

export default projectRouter
