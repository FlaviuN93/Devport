import express from 'express'
import {
	getProjectsData,
	createProjectData,
	updateProjectData,
	deleteProjectData,
} from '../controllers/projectController'
import { protectHandler } from '../controllers/authController'

const projectRouter = express.Router()

projectRouter
	.route('/')
	.get(protectHandler, getProjectsData)
	.post(protectHandler, createProjectData)
	.patch(protectHandler, updateProjectData)
projectRouter.route('/:projectId').delete(protectHandler, deleteProjectData)

export default projectRouter
