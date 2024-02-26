import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
	return (
		<div>
			Login
			<Link to='/forgot-password'>
				<button>Forgot Password</button>
			</Link>
			<Link to='/register'>
				<button>Create an account</button>
			</Link>
		</div>
	)
}
