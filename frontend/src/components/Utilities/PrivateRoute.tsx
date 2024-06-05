import { FC, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../contexts/contextHooks'

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const { isLoggedIn } = useUserContext()

	if (!isLoggedIn) return <Navigate to={'/auth/login'} replace={true} />
	return children || <Outlet />
}

export default PrivateRoute
