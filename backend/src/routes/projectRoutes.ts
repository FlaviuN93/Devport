import express from 'express'
import {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
	checkUserId,
	checkProjectData,
} from '../controllers/projectController'

const projectRouter = express.Router()
projectRouter.param('id', checkUserId)

projectRouter
	.route('/:userId')
	.get(getProjects)
	.post(checkProjectData, createProject)
	.patch(checkProjectData, updateProject)
	.delete(deleteProject)

export default projectRouter
