export type tButtonType = 'primary' | 'secondary' | 'text'
export type tSize = 'small' | 'large' | 'auto'
export type tInputType = 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'radio' | 'file'

export type tValidationType =
	| 'lowerCase'
	| 'upperCase'
	| 'number'
	| 'email'
	| 'required'
	| 'invalid'
	| 'minLength'
	| 'specialChar'
	| 'invalid'

export type tPasswordFunctionality = 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword'

export interface PasswordValidationRule {
	type: tValidationType
	isActive: boolean
}
