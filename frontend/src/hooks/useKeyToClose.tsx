import { useEffect } from 'react'

const useKeyToClose = (keyName: string, closeFn: () => void) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === keyName) {
				closeFn() // Your function to close the modal
			}
		}
		document.addEventListener('keydown', handleKeyDown, true) // Capture phase
		return () => document.removeEventListener('keydown', handleKeyDown, true)
	}, [])
}

export default useKeyToClose
