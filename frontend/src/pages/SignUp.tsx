import React from 'react'
import Button from '../components/UI/Button'
import styles from './SignUp.module.css'
import GithubIcon from '../assets/github.svg?react'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signupSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useValidateResult } from '../hooks/useValidateResult'
import PasswordValidation from '../components/Inputs/PasswordValidation'
import { passwordInitialState } from '../utils/variables'
import { Link } from 'react-router-dom'

type SignupData = {
	email: string
	password: string
}

const SignUp = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignupData>({
		resolver: zodResolver(signupSchema),
		criteriaMode: 'all',
	})

	const passwordErrorTypes = errors.password?.types?.invalid_string
	const { errors: passwordErrors, isValid } = useValidateResult(passwordErrorTypes, passwordInitialState)

	const handleGithubSignup = () => {
		console.log('Github')
	}

	const onSubmit: SubmitHandler<SignupData> = (data) => {
		console.log('Submitted Data', data, errors, 'helrolsd')
	}

	return (
		<div className={styles.signupContainer}>
			<div>
				<h1 className='mb-1'>Create Your Account</h1>
				<h6>Enter the fields below to get started</h6>
			</div>
			<Button
				onClick={handleGithubSignup}
				buttonText='Sign In with Github'
				buttonStyles='bg-darkBlue text-white'
				icon={<GithubIcon />}
			/>
			<div className={styles.borderWord}>or</div>

			<form className='-mt-5' onSubmit={handleSubmit(onSubmit)}>
				<Text
					name='email'
					register={register}
					placeholder='Enter email'
					error={errors.email?.message}
					label='Email'
				/>

				<Password
					name='password'
					register={register}
					placeholder='Enter password'
					showPasswordBtn={true}
					error={isValid}
					label='Password'
				/>
				<div className={styles.validationContainer}>
					{passwordErrors.map((error) => (
						<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
					))}
				</div>

				<Button buttonText='Create account' type='submit' buttonStyles='bg-violet text-white w-full' />
			</form>

			<div className='-mt-2 text-start'>
				<span className='text-[12px] text-gray'>Already have an account?</span>{' '}
				<Link to={'/login'}>
					<Button variant='text' buttonText='Log in' />
				</Link>
			</div>
		</div>
	)
}

export default SignUp
