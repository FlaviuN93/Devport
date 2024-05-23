import multer from 'multer'
import { NextFunction, Request, Response } from 'express'
import { deleteUser, getUser, getUserAndProjects, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import AppError, { getSuccessMessage } from '../utils/appError'
import { idSchema, passwordSchema } from '../services/baseSchema'
import sharp from 'sharp'
import { removeAvatarImage, removeCoverImage, updateAvatarImage, updateCoverImage } from '../models/imagesModel'

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
		if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) cb(null, true)
		else cb(new AppError(400, 'Uploaded file is not a supported image format'))
	},
	limits: { fileSize: 1024 * 1024 * 5 },
})

export const uploadUserImages = upload.fields([
	{ name: 'avatarFile', maxCount: 1 },
	{ name: 'coverFile', maxCount: 1 },
])

export const resizeUserImages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	if (!req.files) return next()
	const { coverFile, avatarFile } = req.files as { [fieldname: string]: Express.Multer.File[] }

	if (coverFile) {
		const resizedBuffer = await sharp(coverFile[0].buffer).resize(1400, 350).toFormat('jpeg').toBuffer()
		coverFile[0].buffer = resizedBuffer
		coverFile[0].mimetype = 'image/jpeg'
		coverFile[0].filename = `cover-${req.userId}-${Date.now()}.jpeg`
	}

	if (avatarFile) {
		const resizedBuffer = await sharp(avatarFile[0].buffer).resize(160, 160).toFormat('jpeg').toBuffer()
		avatarFile[0].buffer = resizedBuffer
		avatarFile[0].mimetype = 'image/jpeg'
		avatarFile[0].filename = `avatar-${req.userId}-${Date.now()}.jpeg`
	}

	next()
})

export const getUserAndProjectsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const userId = idSchema.parse(req.params.userId).toString()

	const response = await getUserAndProjects(userId)
	if (response instanceof AppError) return next(response)
	const { userWithProjects, statusCode, statusText } = response

	res.status(statusCode).send(userWithProjects)
})

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
	const response = await getUser(req.userId)
	if (response instanceof AppError) return next(response)
	const { user, statusCode } = response
	res.status(statusCode).send(user)
}

export const updateMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const reqBody = JSON.parse(req.body.body)

	const { coverFile, avatarFile } = req.files as { [fieldname: string]: Express.Multer.File[] }

	if (coverFile) {
		const coverUrl = await updateCoverImage(coverFile[0], req.userId)
		if (coverUrl instanceof AppError) return next(coverUrl)
		reqBody.coverURL = coverUrl
	}

	if (avatarFile) {
		const avatarUrl = await updateAvatarImage(avatarFile[0], req.userId)
		if (avatarUrl instanceof AppError) return next(avatarUrl)
		reqBody.avatarURL = avatarUrl
	}

	const userData = updateUserSchema.parse(reqBody)
	const response = await updateUser(userData, req.userId)

	if (response instanceof AppError) return next(response)
	const { user, statusCode, statusText = [] } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
		user,
	})
})

export const deleteMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const password = passwordSchema.parse(req.body.password)

	const coverImageResponse = await removeCoverImage(req.userId)
	const avatarImageResponse = await removeAvatarImage(req.userId)
	if (coverImageResponse instanceof AppError) return next(coverImageResponse)
	if (avatarImageResponse instanceof AppError) return next(avatarImageResponse)

	const response = await deleteUser(password, req.userId)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText = [] } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})
