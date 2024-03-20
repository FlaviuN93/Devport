import React from 'react'
import Button from '../components/UI/Button'
import styles from './SignUp.module.css'
import GithubIcon from '../assets/github.svg?react'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from './schemas'

type SignupData = {
	email: string
	password: string
}

const SignUp = () => {
	const { register } = useForm<SignupData>({ resolver: zodResolver(signupSchema) })

	const handleGithubSignup = () => {
		console.log('Github')
	}

	return (
		<section className={styles.signupContainer}>
			<div>
				<h1 className='mb-2'>Create Your Account</h1>
				<h6>Enter the fields below to get started</h6>
			</div>
			<Button
				onClick={handleGithubSignup}
				buttonText='Sign In with Github'
				buttonStyles='bg-darkBlue text-white'
				icon={<GithubIcon />}
			/>
			<div className={styles.borderWord}>or</div>
			<form className='-mt-5' onSubmit={() => {}}>
				<Text
					placeholder='Enter email'
					name='email'
					onChange={(value) => {
						console.log('email', value)
					}}
					register={() => {}}
				/>

				<Password
					name='password'
					register={() => {}}
					onChange={(value) => {
						console.log(value, 'password')
					}}
					placeholder='Enter password'
				/>

				<Button
					buttonText='Create account'
					onClick={() => {}}
					buttonStyles='bg-violet text-white w-full'
				/>

				<div className='mt-4 text-start'>
					<span className='text-[12px] text-gray'>Already have an account?</span>{' '}
					<Button type='text' buttonText='Log in' onClick={() => {}} />
				</div>
			</form>
		</section>
	)
}

export default SignUp
