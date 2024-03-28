import { useEffect, useRef, useState } from 'react'
import { ValidateResult } from 'react-hook-form'

type ValidationError = {
	type: string
	isActive: boolean
}

export const useValidateResult = (errorTypes: ValidateResult, initialState: ValidationError[]) => {
	const [errors, setErrors] = useState(initialState)
	const [isValid, setIsValid] = useState(false)
	const hasMounted = useRef(false)

	useEffect(() => {
		setErrors((state) => {
			if (hasMounted.current) {
				if (typeof errorTypes === 'undefined') {
					setIsValid(false)
					return state.map((error) => ({ ...error, isActive: true }))
				}

				if (typeof errorTypes === 'string' || Array.isArray(errorTypes)) {
					setIsValid(true)
					return state.map((error) =>
						errorTypes.includes(error.type)
							? { ...error, isActive: false }
							: { ...error, isActive: true }
					)
				}
			} else hasMounted.current = true
			return state
		})
	}, [errorTypes])

	return { errors, isValid }
}
