import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from './contexts/UserContext'
import toast, { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/HomePage'
import Portfolio from './pages/Portfolio'
import ProjectSettings from './pages/ProjectSettings'
import ProfileSettings from './pages/ProfileSettings'
import ResetPassword from './pages/ResetPassword'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import AuthLayout from './components/Layouts/AuthLayout'
import AppLayout from './components/Layouts/AppLayout'
import PageNotFound from './pages/PageNotFound'
import { IDefaultError, IDefaultSuccess } from './services/types'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 1,
			throwOnError: (error: unknown) => {
				const defaultError = error as IDefaultError
				return defaultError.statusTitle.startsWith('500')
			},
		},
		mutations: {
			throwOnError: (error: unknown) => {
				const defaultError = error as IDefaultError
				return defaultError.statusTitle.startsWith('500')
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error: unknown) => {
			const defaultError = error as IDefaultError
			return toast.error(`${defaultError.statusTitle}: ${defaultError.message}`)
		},
	}),
	mutationCache: new MutationCache({
		onSuccess: (data: unknown) => {
			const { message } = data as IDefaultSuccess
			return toast.success(`${message}`)
		},
		onError: (error: unknown) => {
			const defaultError = error as IDefaultError
			return toast.error(`${defaultError.statusTitle}: ${defaultError.message}`)
		},
	}),
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<UserProvider>
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
							<Route path='forgot-password' element={<ForgotPassword />} />
							<Route path='reset-password' element={<ResetPassword />} />
						</Route>

						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</UserProvider>

			<Toaster
				position='top-center'
				gutter={12}
				reverseOrder={true}
				toastOptions={{
					success: { duration: 3000 },
					error: {
						duration: 5000,
					},
					style: {
						fontSize: '1rem',
						maxWidth: '500px',
						fontWeight: 'normal',
						textAlign: 'center',
						padding: '1rem 1.5rem',
						background: 'var(--light)',
						color: 'var(--black)',
					},
				}}
			/>
		</QueryClientProvider>
	)
}

export default App
