import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'
import Text from '../components/Inputs/Text'
import { forgotPasswordSchema } from '../utils/schemas'
import { useForgotPassword } from '../services/queries'
import { useEffect } from 'react'
import LogoIcon from '../components/UI/LogoIcon'

const ForgotPassword = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<{ email: string }>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: 'onChange',
	})
	const { mutate: forgotPassword, isSuccess, isPending } = useForgotPassword()

	useEffect(() => {
		if (!isPending && isSuccess) reset()
	}, [isPending, isSuccess, reset])

	return (
		<div className='formContainer'>
			<LogoIcon width={78} height={24} iconStyles='place-self-center -mb-3' />
			<div>
				<h1 className='mb-1'>Forgot Password</h1>
				<h6 className='text-base'>We'll email you instructions to reset your password</h6>
			</div>

			<form onSubmit={handleSubmit((data) => forgotPassword(data))}>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />
				<Button buttonText='Request Password Reset' type='submit' buttonStyles='bg-violet text-white w-full mt-4' isLoading={isPending} />
			</form>
			<Link to='/auth/login' className='-mt-3 text-start'>
				<Button buttonText='Back to login' variant='text' buttonStyles='text-violet' />
			</Link>
		</div>
	)
}

export default ForgotPassword
