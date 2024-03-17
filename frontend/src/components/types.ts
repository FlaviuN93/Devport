export type tButtonType = 'primary' | 'secondary' | 'text'
export type tSize = 'small' | 'large' | 'auto'

export type tValidationType =
	| 'lowerCase'
	| 'upperCase'
	| 'number'
	| 'email'
	| 'required'
	| 'minLength'
	| 'specialChar'

export type tInputValidationType = Record<tValidationType, boolean>

export type TailwindClasses = string

export type tPositions = 'top' | 'bottom' | 'right' | 'left' | 'center'
