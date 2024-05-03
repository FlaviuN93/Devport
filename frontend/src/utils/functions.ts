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
