export type tButtonType = 'primary' | 'secondary' | 'text' | 'transparent'

export type TailwindClasses = string

export type tPositions = 'top' | 'bottom' | 'right' | 'left'

export type PasswordValidationType =
	| 'lowerCase'
	| 'upperCase'
	| 'number'
	| 'minLength'
	| 'maxLength'
	| 'specialChar'

export type tCardState = 'presentation' | 'edit'

export interface Params {
	[key: string]: boolean | string | string[] | number | number[]
}

export interface HttpParamsType<T> {
	queryParams?: Params
	body?: T
}

export interface HttpParamsType<T = Body> {
	queryParams?: Params
	body?: T
}
