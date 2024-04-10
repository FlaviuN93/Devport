import { Link } from 'react-router-dom'
import GithubIcon from '../assets/github.svg?react'
import Button from '../components/UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginType, loginSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
	})
	const handleGithubSignup = () => {
		console.log('Github')
	}

	const loginData: SubmitHandler<LoginType> = (data) => {
		console.log('Submitted Data', data, errors, 'helrolsd')
	}
	return (
		<div className='formContainer'>
			<div>
				<h1 className='mb-1'>Login to Account</h1>
				<h6>Enter your credentials to access your account</h6>
			</div>
			<Button
				onClick={handleGithubSignup}
				buttonText='Sign In with Github'
				buttonStyles='bg-darkBlue text-white'
				icon={<GithubIcon />}
			/>
			<div className='borderWord'>or</div>

			<form className='flex flex-col -mt-2.5 gap-4' onSubmit={handleSubmit(loginData)}>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />

				<Password
					name='password'
					register={register}
					placeholder='Enter password'
					showPasswordBtn={true}
					error={errors.password?.message}
				/>
				<Link to='/auth/forgot-password' className='place-self-end -mt-2'>
					<Button buttonText='Forgot Password' variant='text' />
				</Link>
				<Button buttonText='Sign In' type='submit' buttonStyles='bg-violet text-white w-full' />
			</form>

			<div className='-mt-3 text-start'>
				<span className='text-[12px] text-gray mr-1'>Not a member?</span>
				<Link to='/auth'>
					<Button variant='text' buttonText='Create an account' />
				</Link>
			</div>
		</div>
	)
}

export default Login
