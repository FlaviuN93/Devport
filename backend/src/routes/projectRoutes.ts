import express from 'express'
import {
	getProjectsData,
	createProjectData,
	updateProjectData,
	deleteProjectData,
	checkUserId,
} from '../controllers/projectController'

const projectRouter = express.Router()
projectRouter.param('id', checkUserId)

projectRouter
	.route('/:userId')
	.get(getProjectsData)
	.post(createProjectData)
	.patch(updateProjectData)
	.delete(deleteProjectData)

export default projectRouter
