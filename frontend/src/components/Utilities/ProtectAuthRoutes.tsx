import { FC, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../contexts/contextHooks'

const ProtectAuthRoutes: FC<{ children: ReactNode }> = ({ children }) => {
	const { isLoggedIn } = useUserContext()
	const isAuthRoute = isLoggedIn && (window.location.pathname.startsWith('/auth') || window.location.pathname.startsWith(''))

	if (isAuthRoute) return <Navigate to={'/app/my-portfolio'} />

	return children || <Outlet />
}

export default ProtectAuthRoutes
