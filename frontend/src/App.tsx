import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from './contexts/UserContext'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import ProjectSettings from './pages/ProjectSettings'
import ProfileSettings from './pages/ProfileSettings'
import MyPortfolio from './pages/MyPortfolio'
import ResetPassword from './pages/ResetPassword'

import SignUp from './pages/SignUp'
import Login from './pages/Login'
import AuthLayout from './components/Layouts/AuthLayout'
import AppLayout from './components/Layouts/AppLayout'
import PageNotFound from './pages/PageNotFound'
import { ProjectProvider } from './contexts/ProjectContext'
import { queryClient } from './services/queryClient'
import PrivateRoute from './components/Utilities/PrivateRoute'
import HomePage from './pages/HomePage'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorDisplay from './components/UI/ErrorDisplay'
import TermsOfService from './pages/InfoPages/TermsOfService'
import PrivacyPolicy from './pages/InfoPages/PrivacyPolicy'
import ContactUs from './pages/InfoPages/ContactUs'
import PublicPortfolio from './pages/PublicPortfolio'
import { DarkModeProvider } from './contexts/DarkModeContext'
import ProtectAuthRoutes from './components/Utilities/ProtectAuthRoutes'
import { AuthProvider } from './contexts/AuthContext'

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<AuthProvider>
				<DarkModeProvider>
					<UserProvider>
						<ProjectProvider>
							<BrowserRouter>
								<Routes>
									<Route
										path='/'
										element={
											<ProtectAuthRoutes>
												<HomePage />
											</ProtectAuthRoutes>
										}
									/>
									<Route path='/my-portfolio/:userId' element={<PublicPortfolio />} />
									<Route
										path='/app/my-portfolio'
										element={
											<PrivateRoute>
												<MyPortfolio />
											</PrivateRoute>
										}
									/>
									<Route
										path='/app'
										element={
											<PrivateRoute>
												<AppLayout />
											</PrivateRoute>
										}
									>
										<Route path='project-settings' element={<ProjectSettings />} />
										<Route path='profile-settings' element={<ProfileSettings />} />
									</Route>

									<Route
										path='/auth'
										element={
											<ProtectAuthRoutes>
												<AuthLayout />
											</ProtectAuthRoutes>
										}
									>
										<Route index element={<SignUp />} />
										<Route path='login' element={<Login />} />
										<Route path='forgot-password' element={<ForgotPassword />} />
									</Route>
									<Route
										path='/auth/reset-password/:resetToken'
										element={
											<ErrorBoundary FallbackComponent={ErrorDisplay} onReset={() => window.location.replace('/auth/forgot-password')}>
												<ResetPassword />
											</ErrorBoundary>
										}
									/>
									<Route path='/terms-of-service' element={<TermsOfService />} />
									<Route path='/privacy-policy' element={<PrivacyPolicy />} />
									<Route path='/contact-us' element={<ContactUs />} />

									<Route path='*' element={<PageNotFound />} />
								</Routes>
							</BrowserRouter>
						</ProjectProvider>
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
								textAlign: 'start',
								padding: '1rem 1.5rem',
								background: 'var(--light)',
								color: 'var(--black)',
							},
						}}
					/>
				</DarkModeProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}

export default App
