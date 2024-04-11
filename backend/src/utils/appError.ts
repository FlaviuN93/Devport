import { ZodIssueCode } from 'zod'

type StatusType =
	| 'not_found'
	| 'already_exists'
	| 'unauthorized'
	| 'too many requests'
	| 'database_timeout'
	| 'internal_server_error'
	| ZodIssueCode

class AppError extends Error {
	public isClientError: boolean
	constructor(public statusCode: number, public status: StatusType, message: string) {
		super(message)
		this.isClientError = true
		Error.captureStackTrace(this, this.constructor)
	}
}

export default AppError
