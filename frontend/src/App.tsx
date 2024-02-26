import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/HomePage'
import Portfolio from './pages/Portfolio'
import ProjectSettings from './pages/ProjectSettings'
import ProfileSettings from './pages/ProfileSettings'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='reset-password' element={<ResetPassword />} />
				<Route path='my-portfolio' element={<Portfolio />} />
				<Route path='project' element={<ProjectSettings />} />
				<Route path='profile' element={<ProfileSettings />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
