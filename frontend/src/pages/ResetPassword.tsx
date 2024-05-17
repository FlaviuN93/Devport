import Button from '../components/UI/Button'
import LogoIcon from '../assets/Logo.svg?react'
import ResetPasswordForm from '../components/Containers/ResetPasswordForm'

const ResetPassword = () => {
	return (
		<div className='formContainer'>
			<LogoIcon className='place-self-center -mb-3' />
			<div>
				<h1 className='mb-1'>Choose a new password</h1>
				<h6>Enter your new password and you're all set.</h6>
			</div>
			<ResetPasswordForm formName='resetPassword' />
			<Button
				formName='resetPassword'
				buttonText='Reset Password'
				type='submit'
				buttonStyles='bg-violet text-white w-full'
			/>
		</div>
	)
}

export default ResetPassword
