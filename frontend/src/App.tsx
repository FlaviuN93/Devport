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

function App() {
	return (
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
	)
}

export default App
