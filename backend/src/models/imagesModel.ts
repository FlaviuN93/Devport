import supabase from '../services/supabase'
import AppError from '../utils/appError'
import { splitStringByPattern } from '../utils/functions'

export const addProjectImage = async (file: Express.Multer.File): Promise<string | AppError> => {
	const { data: url, error } = await supabase.storage
		.from('project-images')
		.upload(file.filename, file.buffer, { contentType: file.mimetype })

	if (error) return new AppError(400)

	const { data } = supabase.storage.from('project-images').getPublicUrl(url.path)

	return data.publicUrl
}

export const updateProjectImage = async (
	file: Express.Multer.File,
	projectId?: string
): Promise<string | AppError> => {
	const { data: urlPath } = await supabase.from('projects').select('imageFile').eq('id', projectId).single()
	if (urlPath?.imageFile) {
		const filePath = splitStringByPattern(urlPath.imageFile, 'project-images/')
		const { error: deleteError } = await supabase.storage.from('project-images').remove([filePath])
		if (deleteError)
			return new AppError(400, 'The image could not be deleted. Something went wrong with your request.')
	}

	const { data: url, error } = await supabase.storage
		.from('project-images')
		.upload(file.filename, file.buffer, { contentType: file.mimetype })

	if (error) return new AppError(400)

	const { data } = supabase.storage.from('project-images').getPublicUrl(url.path)

	return data.publicUrl
}

export const removeProjectImage = async (projectId?: string): Promise<string | AppError> => {
	const { data: urlPath, error } = await supabase
		.from('projects')
		.select('imageFile')
		.eq('id', projectId)
		.single()

	if (error) return new AppError(400)

	const filePath = splitStringByPattern(urlPath.imageFile, 'project-images/')
	const { error: deleteError } = await supabase.storage.from('project-images').remove([filePath])
	if (deleteError)
		return new AppError(400, 'The image could not be deleted. Something went wrong with your request.')

	return 'Image deleted succesfully'
}
