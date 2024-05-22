import Button from '../components/UI/Button'
import GithubIcon from '../assets/github.svg?react'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'
import { useForm } from 'react-hook-form'
import { SignupType, signupSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordValidation from '../components/Inputs/PasswordValidation'
import { passwordInitialState } from '../utils/variables'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserContext } from '../contexts/contextHooks'
import { useRegister } from '../services/queries'
import { useValidateResult } from '../hooks/useValidateResult'

const SignUp = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignupType>({
		resolver: zodResolver(signupSchema),
		criteriaMode: 'all',
		mode: 'onChange',
		defaultValues: { email: '', password: '' },
	})
	const { data, isSuccess, mutate: registerUser, isPending } = useRegister()
	const navigate = useNavigate()
	const passwordErrorTypes = errors.password?.types?.invalid_string
	const { errors: passwordErrors, isValid } = useValidateResult(passwordErrorTypes, passwordInitialState)
	const { handleSetUser } = useUserContext()

	useEffect(() => {
		console.log(errors.password, 'checkRegister')
		if (isSuccess) {
			handleSetUser(data.user)
			navigate('/profile-settings')
		}
	}, [navigate, isSuccess, data, handleSetUser, errors.password])

	const handleGithubSignup = () => {
		console.log('Github')
	}

	return (
		<div className='formContainer'>
			<div>
				<h1 className='mb-1'>Create Your Account</h1>
				<h6>Enter the fields below to get started</h6>
			</div>
			<Button onClick={handleGithubSignup} buttonText='Sign In with Github' buttonStyles='bg-darkBlue text-white' icon={<GithubIcon />} />
			<div className='borderWord'>or</div>

			<form className='flex flex-col -mt-2.5 gap-4' onSubmit={handleSubmit((data) => registerUser(data))}>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />

				<Password name='password' register={register} placeholder='Enter password' showPasswordBtn={true} error={isValid} />
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
