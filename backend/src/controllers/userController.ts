import multer from 'multer'
import { NextFunction, Request, Response } from 'express'
import { deleteUser, getUser, getUserAndProjects, updateUser } from '../models/userModel'
import { updateUserSchema } from '../services/routeSchema'
import { catchAsync } from '../utils/errorFunctions'
import AppError, { getSuccessMessage } from '../utils/appError'
import { idSchema, passwordSchema } from '../services/baseSchema'
import sharp from 'sharp'

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
		if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) cb(null, true)
		else cb(new AppError(400))
	},
})

export const uploadUserImages = upload.fields([
	{ name: 'avatarFile', maxCount: 1 },
	{ name: 'coverFile', maxCount: 1 },
])

export const resizeUserImages = (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) return next()

	sharp(req.file.buffer)
		.resize(600, 400)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/projects/project-${req.userId}-${Date.now()}.jpeg`)
	next()
}

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
	const reqBody = JSON.parse(req.body)
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

	const response = await deleteUser(password, req.userId)
	if (response instanceof AppError) return next(response)
	const { statusCode, statusText = [] } = response

	res.status(statusCode).json({
		message: getSuccessMessage(statusCode, statusText),
	})
})

// const upload = multer({dest:''})
// export const uploadUserPhotoHandler = upload.single('')
