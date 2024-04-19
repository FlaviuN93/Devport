const errorMessage: { [key: number]: string } = {
	400: 'Bad Request. There seems to be a problem with the data you provided. Please check your input and try again.',
	401: 'Unauthorized. You are not authorized to access this resource. Please check your credentials and try again.',
	403: `Forbidden. You don't have permission to access this resource.`,
	404: `The resource you requested could not be found.`,
	406: `There seems to be a mismatch with the information you provided. Please double-check and try again.`,
	409: `Conflict. The operation could not be performed due to a conflict. This could be due to trying to create a duplicate entry that violates a unique constraint.`,
	429: `Too Many Requests. You are making too many requests too quickly. Please slow down and try again later.`,
	500: `Internal Server Error. Something went wrong on our end. Please try again later.`,
}

export const getSuccessMessage = (statusCode: number, statusText: string[]): string | undefined => {
	if (statusCode === 200) return `Your ${statusText[0]} request was successful!`
	if (statusCode === 201)
		return `The data you entered is correct.The ${statusText[0]} has been ${statusText[1]} successfully!`
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
