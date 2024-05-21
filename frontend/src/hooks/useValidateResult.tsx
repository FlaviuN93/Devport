import { useEffect, useState } from 'react'
import { ValidateResult } from 'react-hook-form'

type ValidationError = {
	type: string
	isActive: boolean
}

export const useValidateResult = (errorTypes: ValidateResult, initialState: ValidationError[]) => {
	const [errors, setErrors] = useState(initialState)
	const [isValid, setIsValid] = useState(false)
	const [hasUpdated, setHasUpdated] = useState(false)
	useEffect(() => {
		setErrors((state) => {
			// This is for initial render
			if (typeof errorTypes === 'undefined' && !hasUpdated) {
				return state.map((error) => ({ ...error, isActive: false }))
			}

			// This is for a succesful password
			if (typeof errorTypes === 'undefined' && hasUpdated) {
				setIsValid(false)
				return state.map((error) => ({ ...error, isActive: true }))
			}

			if (typeof errorTypes === 'string' || Array.isArray(errorTypes)) {
				setIsValid(true)
				setHasUpdated(true)
				return state.map((error) =>
					errorTypes.includes(error.type) ? { ...error, isActive: false } : { ...error, isActive: true }
				)
			}
			return state
		})
	}, [errorTypes, hasUpdated])

	return { errors, isValid }
}
