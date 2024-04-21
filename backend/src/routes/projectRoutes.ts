import express from 'express'
import {
	getProjectsData,
	createProjectData,
	updateProjectData,
	deleteProjectData,
} from '../controllers/projectController'
import { protectHandler } from '../controllers/authController'

const projectRouter = express.Router()

projectRouter.route('/').get(protectHandler, getProjectsData).post(protectHandler, createProjectData)
projectRouter
	.route('/:projectId')
	.patch(protectHandler, updateProjectData)
	.delete(protectHandler, deleteProjectData)

export default projectRouter
