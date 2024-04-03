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

export const validateCollectionLimit = (stateCollection: string[], maxItems: number) =>
	stateCollection.length > maxItems && `You can only select ${maxItems} items from the list`
