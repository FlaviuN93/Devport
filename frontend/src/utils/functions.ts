import { PasswordValidationType } from './types'

export const getMessageForValidation = (messageKey: PasswordValidationType): string => {
	const validationRules = {
		lowerCase: 'one lower case character',
		upperCase: 'one upper case character',
		specialChar: 'one special character',
		number: 'one number',
		minLength: '8 character minimum',
		maxLength: '20 caracters maximum',
	}

	return validationRules[messageKey]
}
