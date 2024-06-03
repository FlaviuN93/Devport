import { Link } from 'react-router-dom'
import LogoIcon from '../assets/Logo.svg?react'
import ResetPasswordForm from '../components/Containers/Forms/ResetPasswordForm'
import Button from '../components/UI/Button'

const ResetPassword = () => {
	return (
		<div className='formContainer'>
			<LogoIcon className='place-self-center -mb-3' />
			<div>
				<h1 className='mb-1'>Choose a new password</h1>
				<h6>Enter your new password and you're all set.</h6>
			</div>
			<ResetPasswordForm buttonName='Reset Password' buttonStyles='bg-violet text-white w-full' />
			<Link to='/auth/login' className='-mt-4 text-start'>
				<Button buttonText='Back to login' variant='text' buttonStyles='text-violet' />
			</Link>
		</div>
	)
}

export default ResetPassword
