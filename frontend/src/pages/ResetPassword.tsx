import { Link, useNavigate, useParams } from 'react-router-dom'
import ResetPasswordForm from '../components/Containers/Forms/ResetPasswordForm'
import Button from '../components/UI/Button'
import { useCheckResetToken } from '../services/queries'
import Loading from '../components/UI/Loading'
import LoginImage from '../components/UI/LoginImage'
import useMediaQuery from '../hooks/useMediaQuery'
import LogoIcon from '../components/UI/LogoIcon'
import { useLayoutEffect } from 'react'

const ResetPassword = () => {
	const { resetToken } = useParams()
	const navigate = useNavigate()
	const { mutate: checkResetToken, isPending } = useCheckResetToken()
	const isTablet = useMediaQuery('(min-width:768px)')

	useLayoutEffect(() => {
		if (resetToken)
			checkResetToken(resetToken, {
				onError: () => navigate('/auth/forgot-password', { replace: true }),
			})
	}, [resetToken, checkResetToken, navigate])
	if (isPending) return <Loading />

	return (
		<div className='min-h-screen flex items-center px-4 gap-10 laptop:gap-16 laptop:px-0 justify-center text-center'>
			{isTablet && (
				<LoginImage
					title='A Portfolio Application for Developers'
					content='As a web developer, having a portfolio is essential for showcasing your technical skills and attracting potential clients. 
			A portfolio is a museum of your work, with new tech stacks, case studies, and your work history.'
				/>
			)}
			<div className='formContainer'>
				<LogoIcon width={78} height={24} iconStyles='place-self-center -mb-3' />
				<div>
					<h1 className='mb-1'>Choose a new password</h1>
					<h6>Enter your new password and you're all set.</h6>
				</div>
				<ResetPasswordForm buttonName='Reset Password' />
				<div className='flex justify-between'>
					<Link to='/auth/login' className='-mt-4 text-start'>
						<Button buttonText='Back to login' variant='text' buttonStyles='text-violet' />
					</Link>
					<Link to='/auth/forgot-password' className='-mt-4 text-start'>
						<Button buttonText='Back to Forgot Password' variant='text' buttonStyles='text-violet' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword
