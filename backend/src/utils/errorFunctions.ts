import { NextFunction, Request, Response } from 'express'
import AppError from './appError'
import { ZodError } from 'zod'

// Helper Functions
const sendError = (err: AppError, res: Response, type: 'clientError' | 'serverError'): void => {
	res.status(err.statusCode).json({
		status: err.status,
		type,
		message: err.message,
		stack: err.stack,
	})
}

const sendZodError = (err: ZodError, res: Response): void => {
	const formattedErrors = err.flatten()
	res.status(400).json({
		status: 'Bad Request',
		type: 'zodError',
		message: formattedErrors.fieldErrors,
	})
}

const sendErrorInDev = (err: AppError, res: Response) => {
	if (!err.isClientError) return sendError(err, res, 'serverError')

	if (err instanceof ZodError) return sendZodError(err, res)

	sendError(err, res, 'clientError')
}

const sendErrorInProd = (err: AppError, res: Response) => {
	if (!err.isClientError) {
		console.error('Server or programming ERROR', err.stack)
		return res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		})
	}

	if (err instanceof ZodError) return sendZodError(err, res)

	res.status(err.statusCode).json({
		status: err.status,
		type: 'clientError',
		message: err.message,
	})
}

// Main Functions
export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'development') sendErrorInDev(err, res)
	else sendErrorInProd(err, res)
}

export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any | void>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next)
	}
}
