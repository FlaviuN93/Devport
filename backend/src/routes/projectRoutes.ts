import express from 'express'
import {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
} from '../controllers/projectController'

const projectRouter = express.Router()

projectRouter
	.route('/:userId')
	.get(getProjects)
	.post(createProject)
	.patch(updateProject)
	.delete(deleteProject)

export default projectRouter
