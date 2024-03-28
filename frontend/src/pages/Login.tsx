import React from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import GithubIcon from '../assets/github.svg?react'
import Button from '../components/UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'

type LoginData = {
	email: string
	password: string
}

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
		criteriaMode: 'all',
	})
	const handleGithubSignup = () => {
		console.log('Github')
	}

	const onSubmit: SubmitHandler<LoginData> = (data) => {
		console.log('Submitted Data', data, errors, 'helrolsd')
	}
	return (
		<div className={styles.loginContainer}>
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
			<div className={styles.borderWord}>or</div>

			<form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />

				<Password
					name='password'
					register={register}
					placeholder='Enter password'
					showPasswordBtn={true}
					error={errors.password?.message}
				/>
				<Link to='/forgot-password' className='place-self-end -mt-2'>
					<Button buttonText='Forgot Password' variant='text' />
				</Link>
				<Button buttonText='Sign In' type='submit' buttonStyles='bg-violet text-white w-full' />
			</form>

			<div className='-mt-3 text-start'>
				<span className='text-[12px] text-gray mr-1'>Not a member?</span>
				<Link to={'/sign-up'}>
					<Button variant='text' buttonText='Create an account' />
				</Link>
			</div>
		</div>
	)
}

export default Login
