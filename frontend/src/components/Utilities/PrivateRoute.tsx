import { FC, ReactNode, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/contextHooks'

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const { isLoggedIn } = useUserContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/auth/login', { replace: true })
		}
	}, [isLoggedIn, navigate])

	return children || <Outlet />
}

export default PrivateRoute
