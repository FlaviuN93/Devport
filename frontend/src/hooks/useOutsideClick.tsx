import { MouseEvent, RefObject, useEffect } from 'react'

export const useOutsideClick = (
	ref: RefObject<HTMLElement>,
	handler: () => void,
	optionalRef?: RefObject<HTMLElement>,
	exclusionRef?: RefObject<HTMLElement>
) => {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) return
			if (!optionalRef?.current || optionalRef.current.contains(event.target as Node)) return
			if (exclusionRef?.current && exclusionRef.current.contains(event.target as Node)) return
			handler()
		}
		// @ts-expect-error: Safe conversion, we know the listener matches the type
		document.addEventListener('mousedown', listener)
		// @ts-expect-error: Safe conversion, we know the listener matches the type
		return () => document.removeEventListener('mousedown', listener)
	}, [handler, ref, optionalRef, exclusionRef])
}
