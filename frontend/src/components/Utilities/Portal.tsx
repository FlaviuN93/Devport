import { FC, ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Portal: FC<{ children: ReactNode }> = ({ children }) => {
	const [mountDiv, setMountDiv] = useState<HTMLDivElement | null>(null)

	useEffect(() => {
		const body = document.body
		const element = document.createElement('div')
		body.appendChild(element)
		setMountDiv(element)

		return () => {
			body.removeChild(element)
		}
	}, [])

	if (!mountDiv) return null

	return ReactDOM.createPortal(children, mountDiv)
}

export default Portal
