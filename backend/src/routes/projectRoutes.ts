import express from 'express'

import { protectHandler, userRolesHandler } from '../controllers/authController'
import {
	createMyProjectData,
	getMyProjectsData,
	updateMyProjectData,
	deleteMyProjectData,
	getMyProjectData,
	getTechnologiesData,
	uploadProjectImage,
	resizeProjectImage,
	deleteMyProjectImage,
	updateMyProjectImage,
} from '../controllers/projectController'

// Order matters. Leave the routes with dynamic parameters at the bottom
const projectRouter = express.Router()

projectRouter.route('/currentUser/technologies').get(protectHandler, getTechnologiesData)

projectRouter
	.route('/currentUser')
	.get(protectHandler, userRolesHandler('user', 'tester'), getMyProjectsData)
	.post(protectHandler, userRolesHandler('user', 'tester'), uploadProjectImage, resizeProjectImage, createMyProjectData)

projectRouter.route('/currentUser/projectImg').delete(protectHandler, userRolesHandler('user', 'tester'), deleteMyProjectImage)

projectRouter
	.route('/currentUser/projectImg/:projectId')
	.patch(protectHandler, userRolesHandler('user', 'tester'), uploadProjectImage, resizeProjectImage, updateMyProjectImage)

projectRouter
	.route('/currentUser/:projectId')
	.get(protectHandler, userRolesHandler('user', 'tester'), getMyProjectData)
	.put(protectHandler, userRolesHandler('user', 'tester'), uploadProjectImage, resizeProjectImage, updateMyProjectData)
	.delete(protectHandler, userRolesHandler('user'), deleteMyProjectData)

export default projectRouter
