import React from 'react'
import Button from '../components/UI/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { resetPasswordSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Password from '../components/Inputs/Password'
import LogoIcon from '../assets/Logo.svg?react'
import { useValidateResult } from '../hooks/useValidateResult'
import { passwordInitialState } from '../utils/variables'
import PasswordValidation from '../components/Inputs/PasswordValidation'

type ResetPasswordData = {
	password: string
	confirmPassword: string
}

const ResetPassword = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ResetPasswordData>({
		resolver: zodResolver(resetPasswordSchema),
		criteriaMode: 'all',
		mode: 'onChange',
	})

	const passwordErrorTypes = errors.password?.types?.invalid_string
	const { errors: passwordErrors, isValid } = useValidateResult(passwordErrorTypes, passwordInitialState)

	const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
		console.log('Submitted Data', data, errors, 'submitResetPassword')
	}
	return (
		<div className='formContainer'>
			<LogoIcon className='place-self-center -mb-3' />
			<div>
				<h1 className='mb-1'>Choose a new password</h1>
				<h6>Enter your new password and you're all set.</h6>
			</div>

			<form className='flex flex-col -mt-2.5 gap-4' onSubmit={handleSubmit(onSubmit)}>
				<Password
					name='password'
					register={register}
					placeholder='Enter a password'
					showPasswordBtn={true}
					error={isValid}
				/>

				<Password
					name='confirmPassword'
					register={register}
					placeholder='Re-enter a password'
					error={errors.confirmPassword?.message}
				/>

				<div className='grid grid-cols-2 gap-3'>
					{passwordErrors.map((error) => (
						<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
					))}
				</div>

				<Button buttonText='Reset Password' type='submit' buttonStyles='bg-violet text-white w-full' />
			</form>
		</div>
	)
}

export default ResetPassword
