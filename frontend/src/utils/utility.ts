import {
	PasswordValidationRule,
	tInputValidationType,
	tPasswordFunctionality,
	tValidationType,
} from '../components/types'

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

export const getPasswordValidationState = (
	functionality: tPasswordFunctionality
): PasswordValidationRule[] => {
	switch (functionality) {
		case 'signUp':
			return [
				{ type: 'lowerCase', isActive: false },
				{ type: 'upperCase', isActive: false },
				{ type: 'specialChar', isActive: false },
				{ type: 'number', isActive: false },
				{ type: 'minLength', isActive: false },
			]

		case 'resetPassword':
			return [
				{ type: 'lowerCase', isActive: false },
				{ type: 'upperCase', isActive: false },
				{ type: 'specialChar', isActive: false },
				{ type: 'number', isActive: false },
				{ type: 'minLength', isActive: false },
			]
		default:
			throw new Error(`Invalid password state: ${functionality}`)
	}
}

export const validateInputValue = (inputValue: string, validationType: tValidationType) => {
	const inputValidationResults: tInputValidationType = {
		lowerCase: /[a-z]/.test(inputValue),
		upperCase: /[A-Z]/.test(inputValue),
		number: /\d/.test(inputValue),
		minLength: inputValue.length >= 8,
		specialChar: /[\W_]/.test(inputValue),
		email: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(inputValue),
		required: inputValue.length === 0,
	}

	return inputValidationResults[validationType]
}
