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

function App() {
	return (
		<div className='w-screen m-4'>
			<BrowserRouter>
				<Routes>
					<Route path='/home' element={<HomePage />} />
					<Route path='sign-in' element={<Login />} />
					<Route path='sign-up' element={<SignUp />} />
					<Route path='register' element={<Register />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='reset-password' element={<ResetPassword />} />
					<Route path='my-portfolio' element={<Portfolio />} />
					<Route path='project' element={<ProjectSettings />} />
					<Route path='profile' element={<ProfileSettings />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
