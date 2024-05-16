import express from 'express'

import { protectHandler } from '../controllers/authController'
import {
	createMyProjectData,
	getMyProjectsData,
	updateMyProjectData,
	deleteMyProjectData,
	getMyProjectData,
	getTechnologiesData,
	uploadProjectImage,
	resizeProjectImage,
} from '../controllers/projectController'

const projectRouter = express.Router()

projectRouter.route('/currentUser/technologies').get(protectHandler, getTechnologiesData)

projectRouter
	.route('/currentUser')
	.get(protectHandler, getMyProjectsData)
	.post(protectHandler, uploadProjectImage, resizeProjectImage, createMyProjectData)

projectRouter
	.route('/currentUser/:projectId')
	.get(protectHandler, getMyProjectData)
	.put(protectHandler, uploadProjectImage, resizeProjectImage, updateMyProjectData)
	.delete(protectHandler, deleteMyProjectData)

export default projectRouter
