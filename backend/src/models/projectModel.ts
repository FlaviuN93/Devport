import { z } from 'zod'
import { descriptionSchema, fileSchema, nameSchema, urlSchema } from './baseSchema'

const MAX_FILE_SIZE = 1024 * 1024 * 2

const createProjectSchema = z.object({
	imageFile: fileSchema.refine((file) => file.size <= MAX_FILE_SIZE, 'File must be under 2MB'),
	name: nameSchema,
	demoUrl: urlSchema,
	repositoryUrl: urlSchema,
	technologies: z
		.array(z.string())
		.min(2, 'Select a minimum of 2 technologies')
		.max(5, 'Select a maximum of 5 technologies'),
	description: descriptionSchema,
})

const updateProjectSchema = createProjectSchema.optional()

type CreateProjectType = z.infer<typeof createProjectSchema>
type UpdateProjectType = z.infer<typeof updateProjectSchema>

export const getProjects = async (userId: string) => {
	try {
		console.log(userId, 'Get projects data')
	} catch (err) {
		console.log(err)
	}
	// let { data: users, error } = await supabase.from('projects').select('*')
}

export const createProject = async (reqBody: CreateProjectType) => {
	console.log(reqBody, 'Post a new project data')
	const data = createProjectSchema.parse(reqBody)
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const updateProject = async (reqBody: UpdateProjectType) => {
	const data = updateProjectSchema.parse(reqBody)
	console.log(data, 'Patch an existing project data')
	// let { data: users, error } = await supabase.from('users').select('*')
}

export const deleteProject = async (userId: string) => {
	try {
		console.log(userId, 'Delete an existing project data')
	} catch (err) {
		console.log(err)
	}
}
