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
