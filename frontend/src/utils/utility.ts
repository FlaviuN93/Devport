import { tValidationType } from '../components/types'

export const getMessageForValidation = (messageKey: tValidationType): string => {
	const validationRules = {
		lowerCase: 'one lower case character',
		upperCase: 'one upper case character',
		specialChar: 'one special character',
		number: 'one number',
		minLength: '8 character minimum',
		invalid: 'Invalid input',
		email: 'Invalid email',
		required: 'Input required',
	}

	return validationRules[messageKey]
}
