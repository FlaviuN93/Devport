import { useState, useEffect } from 'react'

const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(window.matchMedia(query).matches)

	const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches)

	useEffect(() => {
		const matchQueryList = window.matchMedia(query)

		matchQueryList.addEventListener('change', handleChange)

		return () => matchQueryList.removeEventListener('change', handleChange)
	}, [query])
	return matches
}

export default useMediaQuery
