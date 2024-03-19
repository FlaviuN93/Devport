import React from 'react'
import Button from '../components/UI/Button'
import styles from './SignUp.module.css'
import GithubIcon from '../assets/github.svg?react'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'

const SignUp = () => {
	const handleGithubSignup = () => {
		console.log('Github')
	}

	return (
		<section className={styles.signupContainer}>
			<div>
				<h1>Create Your Account</h1>
				<h6>Enter the fields below to get started</h6>
			</div>
			<Button
				onClick={handleGithubSignup}
				buttonText='Sign In with Github'
				buttonStyles='bg-darkBlue text-white'
				icon={<GithubIcon />}
			/>
			<div>
				<span>or</span>
			</div>
			<form>
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

				<Button buttonText='Create account' onClick={() => {}} buttonStyles='bg-violet text-white' />

				<div>
					<span className='text-[12px] text-gray'>Already have an account?</span>{' '}
					<Button type='text' buttonText='Log in' onClick={() => {}} />
				</div>
			</form>
		</section>
	)
}

export default SignUp
