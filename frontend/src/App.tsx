import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/HomePage'
import Portfolio from './pages/Portfolio'
import ProjectSettings from './pages/ProjectSettings'
import ProfileSettings from './pages/ProfileSettings'
import ResetPassword from './pages/ResetPassword'

import Register from './pages/Register'
import Error from './pages/Error'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import AuthLayout from './components/Layouts/AuthLayout'
import AppLayout from './components/Layouts/AppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<Routes>
					<Route path='/home' element={<HomePage />} />
					<Route path='/' element={<Portfolio />} />
					<Route path='/' element={<AppLayout />}>
						<Route path='project-settings' element={<ProjectSettings />} />
						<Route path='profile-settings' element={<ProfileSettings />} />
					</Route>

					<Route path='/auth' element={<AuthLayout />}>
						<Route index element={<SignUp />} />
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
						<Route path='forgot-password' element={<ForgotPassword />} />
						<Route path='reset-password' element={<ResetPassword />} />
					</Route>

					<Route path='*' element={<Error />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
