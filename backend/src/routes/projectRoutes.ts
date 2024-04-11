import express from 'express'
import {
	getProjectsData,
	createProjectData,
	updateProjectData,
	deleteProjectData,
} from '../controllers/projectController'

const projectRouter = express.Router()

projectRouter
	.route('/:userId')
	.get(getProjectsData)
	.post(createProjectData)
	.patch(updateProjectData)
	.delete(deleteProjectData)

export default projectRouter
