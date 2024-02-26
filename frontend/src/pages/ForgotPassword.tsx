import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
	return (
		<div>
			ForgotPassword
			<Link to='/login'>
				<button>Back to login</button>
			</Link>
		</div>
	)
}
