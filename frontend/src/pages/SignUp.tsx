import React, { useEffect } from 'react'
import Button from '../components/UI/Button'
import styles from './SignUp.module.css'
import GithubIcon from '../assets/github.svg?react'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signupSchema } from '../utils/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useValidateResult } from '../hooks/useValidateResult'
import PasswordValidation from '../components/Inputs/PasswordValidation'

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
	const passwordInitialState = [
		{ type: 'lowerCase', isActive: false },
		{ type: 'upperCase', isActive: false },
		{ type: 'specialChar', isActive: false },
		{ type: 'number', isActive: false },
		{ type: 'minLength', isActive: false },
		{ type: 'maxLength', isActive: false },
	]
	const passwordErrors = useValidateResult(passwordErrorTypes, passwordInitialState)

	const handleGithubSignup = () => {
		console.log('Github')
	}

	useEffect(() => {
		console.log(passwordErrors, 'hello')
	})
	const onSubmit: SubmitHandler<SignupData> = (data) => {
		console.log('Submitted Data', data, errors, 'helrolsd')
	}

	return (
		<section className={styles.signupContainer}>
			<div>
				<h1 className='mb-1'>Create your account</h1>
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
					label='Password'
				/>
				<div>
					{passwordErrors.map((error) => (
						<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
					))}
				</div>

				{/* {errors.password &&errors.password.map()} */}
				<Button buttonText='Create account' type='submit' buttonStyles='bg-violet text-white w-full' />
			</form>

			<div className='-mt-2 text-start'>
				<span className='text-[12px] text-gray'>Already have an account?</span>{' '}
				<Button variant='text' buttonText='Log in' onClick={() => {}} />
			</div>
		</section>
	)
}

export default SignUp
