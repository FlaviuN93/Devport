import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'
import Text from '../components/Inputs/Text'
import { forgotPasswordSchema } from '../utils/schemas'
import LogoIcon from '../assets/Logo.svg?react'

const ForgotPassword = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<{ email: string }>({
		resolver: zodResolver(forgotPasswordSchema),
	})

	useEffect(() => {
		console.log(errors)
	}, [errors])
	const onSubmit: SubmitHandler<{ email: string }> = (data) => {
		console.log('Submitted Data', data, errors, 'helrolsd')
	}
	return (
		<div className='formContainer'>
			<LogoIcon className='place-self-center -mb-3' />
			<div>
				<h1 className='mb-1'>Forgot Password</h1>
				<h6 className='text-base'>We'll email you instructions to reset your password</h6>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />
				<Button
					buttonText='Request Password Reset'
					type='submit'
					buttonStyles='bg-violet text-white w-full mt-4'
				/>
			</form>
			<Link to='/login' className='-mt-3 text-start'>
				<Button buttonText='Back to login' variant='text' />
			</Link>
		</div>
	)
}

export default ForgotPassword
