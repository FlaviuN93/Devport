import { useEffect, useRef } from 'react'

export const useCalculateWindowHeight = (isOpen: boolean) => {
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (isOpen) {
			const container = containerRef.current
			if (container) container.style.height = `${document.body.scrollHeight}px`
		}
	}, [isOpen])
	return containerRef
}
