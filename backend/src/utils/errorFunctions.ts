import { NextFunction, Request, Response } from 'express'
import AppError from './appError'
import { ZodError } from 'zod'

// Helper Functions
const sendError = (err: AppError, res: Response, type: 'clientError' | 'serverError'): void => {
	res.status(err.statusCode).json({
		type,
		message: err.message,
		stack: err.stack,
	})
}

const sendZodError = (err: ZodError, res: Response): void => {
	const formattedErrors = err.flatten()

	res.status(400).json({
		type: 'zodError',
		message: formattedErrors.fieldErrors,
	})
}

const sendErrorInDev = (err: AppError, res: Response) => {
	// Order matters. This check is first
	if (err instanceof ZodError) return sendZodError(err, res)

	if (!err.isClientError) return sendError(err, res, 'serverError')

	sendError(err, res, 'clientError')
}

const sendErrorInProd = (err: AppError, res: Response) => {
	// Order matters. This check is first
	if (err instanceof ZodError) return sendZodError(err, res)

	if (!err.isClientError) {
		return res.status(500).json({
			type: 'serverError',
			message: 'Something went very wrong!',
		})
	}

	res.status(err.statusCode).json({
		type: 'clientError',
		message: err.message,
	})
}

// Main Functions
export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'development') sendErrorInDev(err, res)
	else sendErrorInProd(err, res)
}

// This function wrapper catches any error in a handler function and sends it to the globalErrorHandler
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any | void>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next)
	}
}
