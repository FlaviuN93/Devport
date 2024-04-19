const errorMessage: { [key: number]: string } = {
	400: `Looks like there's an issue with your request. Double-check your information and try again.`,
	401: `You don't seem to have permission for this action. Check your credentials and try again.`,
	403: `Looks like you're trying to peek behind the curtain! This resource is off-limits for now.`,
	404: `The item you requested seems to be on a permanent vacation.Try searching for something else?`,
	406: `Incompatible info. Check request format and try again.`,
	409: `Something's conflicting with your request.This could be due a faulty value.Please log in again and try again.`,
	429: `Slow down a bit! You're making too many requests at once. Try again in a few moments.`,
	500: `Something went wrong on our end. We're working on a fix, please try again later.`,
}

export const getSuccessMessage = (statusCode: number, statusText: string[]): string | undefined => {
	if (statusCode === 200)
		return statusText.length > 0
			? `The ${statusText[0]} operation was processed.Your ${statusText[1]}!`
			: '"Your request was successful!"'

	if (statusCode === 201)
		return `The data you entered is correct.The ${statusText[0]} has been ${statusText[1]} successfully!`
}

class AppError extends Error {
	public isClientError: boolean
	constructor(public statusCode: number, message?: string) {
		super(message ? message : errorMessage[statusCode])
		this.isClientError = true
		Error.captureStackTrace(this, this.constructor)
	}
}

export default AppError
