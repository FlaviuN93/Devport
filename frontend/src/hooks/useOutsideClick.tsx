import { MouseEvent, RefObject, useEffect } from 'react'

interface Options {
	secondaryRef?: RefObject<HTMLElement>
	exclusionRef?: RefObject<HTMLElement>
	outsideClick?: boolean
}

export const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void, options?: Options) => {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			const targetNode = event.target as Node
			if (ref.current && ref.current.contains(targetNode)) return
			if (options?.secondaryRef?.current && options?.secondaryRef.current.contains(targetNode)) return
			if (options?.exclusionRef?.current && options?.exclusionRef.current.contains(targetNode)) return
			handler()
		}
		// @ts-expect-error: Safe conversion, we know the listener matches the type
		document.addEventListener('mousedown', listener)
		// @ts-expect-error: Safe conversion, we know the listener matches the type
		return () => document.removeEventListener('mousedown', listener)
	}, [handler, ref, options?.secondaryRef, options?.exclusionRef, options?.outsideClick])
}
