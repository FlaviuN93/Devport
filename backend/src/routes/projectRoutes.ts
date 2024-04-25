import express from 'express'

import { protectHandler } from '../controllers/authController'
import {
	createMyProjectData,
	getMyProjectsData,
	updateMyProjectData,
	deleteMyProjectData,
} from '../controllers/projectController'

const projectRouter = express.Router()

projectRouter
	.route('/currentProject')
	.get(protectHandler, getMyProjectsData)
	.post(protectHandler, createMyProjectData)

projectRouter
	.route('/currentProject/:projectId')
	.patch(protectHandler, updateMyProjectData)
	.delete(protectHandler, deleteMyProjectData)

export default projectRouter
