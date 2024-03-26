import { useEffect, useRef, useState } from 'react'
import { ValidateResult } from 'react-hook-form'

type ValidationError = {
	type: string
	isActive: boolean
}

export const useValidateResult = (errorTypes: ValidateResult, initialState: ValidationError[]) => {
	const [errors, setErrors] = useState(initialState)
	const hasMounted = useRef(false)

	useEffect(() => {
		setErrors((prevState) => {
			if (hasMounted.current) {
				if (typeof errorTypes === 'undefined')
					return prevState.map((error) => ({ ...error, isActive: true }))

				if (typeof errorTypes === 'string' || Array.isArray(errorTypes))
					return prevState.map((error) =>
						errorTypes.includes(error.type)
							? { ...error, isActive: false }
							: { ...error, isActive: true }
					)
			} else hasMounted.current = true
			return prevState
		})
	}, [errorTypes])

	return errors
}
