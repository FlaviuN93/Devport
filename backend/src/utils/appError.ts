const errorMessage: { [key: number]: string } = {
	400: 'Bad Request. There seems to be a problem with the data you provided. Please check your input and try again.',
	401: 'Unauthorized. You are not authorized to access this resource. Please check your credentials and try again.',
	403: `Forbidden. You don't have permission to access this resource.`,
	404: `Not Found. The resource you requested could not be found.`,
	409: `Conflict. The operation could not be performed due to a conflict. This could be due to trying to create a duplicate entry that violates a unique constraint.`,
	429: `Too Many Requests. You are making too many requests too quickly. Please slow down and try again later.`,
	500: `Internal Server Error. Something went wrong on our end. Please try again later.`,
	544: `Connection reset by peer. The connection to the server was interrupted. This could be due to a network issue.`,
}

export const successMessage: { [key: number]: string } = {
	200: 'Your request was successful! The data you requested has been retrieved.',
	201: 'The resource you requested has been created successfully.',
	204: 'The request was processed successfully, but there is no content to return.',
}

class AppError extends Error {
	public isClientError: boolean
	constructor(public statusCode: number, public statusText: string, message?: string) {
		super(message ? message : errorMessage[statusCode])
		this.isClientError = true
		Error.captureStackTrace(this, this.constructor)
	}
}

export default AppError
