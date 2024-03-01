import { PasswordValidationRule, tPasswordFunctionality, tValidationMessage } from '../components/types'

export const getMessageForValidation = (messageKey: tValidationMessage): string => {
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

export const getPasswordInputState = (
	functionality: tPasswordFunctionality
): PasswordValidationRule[] => {
	switch (functionality) {
		case 'signIn':
			return [
				{ type: 'invalid', isActive: false },
				{ type: 'minLength', isActive: false },
			]
		case 'signUp':
			return [
				{ type: 'lowerCase', isActive: false },
				{ type: 'upperCase', isActive: false },
				{ type: 'specialChar', isActive: false },
				{ type: 'number', isActive: false },
				{ type: 'minLength', isActive: false },
			]
		case 'forgotPassword':
			return [
				{ type: 'invalid', isActive: false },
				{ type: 'minLength', isActive: false },
			]
		case 'resetPassword':
			return [
				{ type: 'specialChar', isActive: false },
				{ type: 'number', isActive: false },
				{ type: 'minLength', isActive: false },
			]
		default:
			throw new Error(`Invalid password state: ${functionality}`)
	}
}
