import Button from '../components/UI/Button'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'
import { useForm } from 'react-hook-form'
import { SignupType, signupSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordValidation from '../components/Inputs/PasswordValidation'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext, useUserContext } from '../contexts/contextHooks'
import { useRegister } from '../services/queries'
import { catchPasswordErrors, useValidateResult } from '../utils/functions'

const SignUp = () => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<SignupType>({
		resolver: zodResolver(signupSchema),
		criteriaMode: 'all',
		defaultValues: { email: '', password: '' },
	})
	const { data, isSuccess, mutate: registerUser, isPending } = useRegister()
	const navigate = useNavigate()
	const { handleSetToken } = useAuthContext()
	const watchPassword = watch('password')
	const watchedErrors = catchPasswordErrors(watchPassword)
	const passwordErrors = useValidateResult(watchedErrors)

	const { setEmail, handleIsLoggedIn } = useUserContext()

	useEffect(() => {
		if (isSuccess && !isPending) {
			setEmail(data.email)
			handleIsLoggedIn()
			handleSetToken(data.token)
			navigate('/app/my-portfolio', { replace: true })
		}
	}, [navigate, isSuccess, data?.email, setEmail, handleIsLoggedIn, isPending, handleSetToken, data?.token])

	return (
		<div className='formContainer'>
			<div>
				<h1 className='mb-1'>Create Your Account</h1>
				<h6>Enter the fields below to get started</h6>
			</div>

			<form className='flex flex-col -mt-2.5 gap-4' onSubmit={handleSubmit((data) => registerUser(data))}>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />

				<Password
					name='password'
					register={register}
					placeholder='Enter password'
					showPasswordBtn={true}
					error={!!errors.password?.message}
				/>
				<div className='grid grid-cols-2 gap-1 sm:gap-3'>
					{passwordErrors.map((error) => (
						<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
					))}
				</div>

				<Button buttonText='Create account' type='submit' isLoading={isPending} buttonStyles='bg-violet text-white w-full' />
			</form>

			<div className='-mt-3 text-start'>
				<span className='text-[12px] text-gray mr-1'>Already have an account?</span>
				<Link to={'login'}>
					<Button variant='text' buttonText='Log in' buttonStyles='text-violet' />
				</Link>
			</div>
		</div>
	)
}

export default SignUp
