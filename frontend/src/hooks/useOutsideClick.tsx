import { MouseEvent, RefObject, useEffect } from 'react'

export const useOutsideClick = (
	menuRef: RefObject<HTMLElement>,
	toggleBtnRef: RefObject<HTMLElement>,
	handler: () => void
) => {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!menuRef.current || menuRef.current.contains(event.target as Node)) return
			if (toggleBtnRef.current && toggleBtnRef.current.contains(event.target as Node)) return
			handler()
		}
		// @ts-expect-error: Safe conversion, we know the listener matches the type
		document.addEventListener('mousedown', listener)
		// @ts-expect-error: Safe conversion, we know the listener matches the type
		return () => document.removeEventListener('mousedown', listener)
	}, [handler, menuRef, toggleBtnRef])
}
