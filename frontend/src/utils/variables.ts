export const disableRadiusRight = 'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none'
export const disableRadiusLeft = 'rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none'

export const passwordInitialState = [
	{ type: 'lowerCase', isActive: false },
	{ type: 'upperCase', isActive: false },
	{ type: 'specialChar', isActive: false },
	{ type: 'number', isActive: false },
	{ type: 'minLength', isActive: false },
	{ type: 'maxLength', isActive: false },
]

export const motionVariants = {
	hidden: { display: 'none', opacity: 0 },
	visible: { display: 'flex', opacity: 1 },
}
