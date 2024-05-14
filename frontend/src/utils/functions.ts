import { IDefaultError } from '../services/types'
import { PasswordValidationType } from './types'

export const getMessageForValidation = (messageKey: PasswordValidationType): string => {
	const validationRules = {
		lowerCase: 'Lowercase letter',
		upperCase: 'Uppercase letter',
		specialChar: 'Special character (!?<>@#$)',
		number: 'Number',
		minLength: '8 characters or more',
		maxLength: '20 caracters maximum',
	}

	return validationRules[messageKey]
}
export const getValueFromStorage = <T>(key: string, initialValue: T) => {
	if (typeof window.localStorage === 'undefined') console.log('localStorage is not supported')
	const item = window.localStorage.getItem(key)
	if (!item) return initialValue

	const data: T = JSON.parse(item)

	return data
}

export const getImageFormat = (format: 'landscape' | 'portrait', file: File) => {
	return new Promise<boolean>((resolve) => {
		const img = document.createElement('img')
		img.onload = function () {
			const aspectRatio = img.width / img.height
			if (format === 'landscape' && aspectRatio < 1.3) resolve(false)
			if (format === 'portrait' && aspectRatio > 0.9) resolve(false)
			resolve(true)
		}

		img.src = URL.createObjectURL(file)
	})
}

export const createZodErrorMessage = (error: IDefaultError): string | null => {
	if (error.type === 'zodError' && typeof error.message === 'object') {
		let toastMessage = `${error.statusTitle}\n Errors: \n`

		for (const [field, errorMessage] of Object.entries(error.message)) {
			toastMessage += `- ${field}: ${Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage}\n`
		}

		return toastMessage
	}

	return null
}
