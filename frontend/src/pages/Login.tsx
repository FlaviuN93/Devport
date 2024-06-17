import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button'
import { useForm } from 'react-hook-form'
import { LoginType, loginSchema } from '../utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Text from '../components/Inputs/Text'
import Password from '../components/Inputs/Password'
import { useGithubAccessToken, useLogin } from '../services/queries'
import { useEffect } from 'react'
import { useAuthContext, useUserContext } from '../contexts/contextHooks'
import { useSearchParams } from 'react-router-dom'
import { BiLogoGithub } from 'react-icons/bi'

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})
	const { mutate: loginUser, isPending, isSuccess, data } = useLogin()
	const { handleSetUser, handleIsLoggedIn } = useUserContext()
	const { handleSetToken } = useAuthContext()
	const githubUrl = `${import.meta.env.VITE_GITHUB_DOMAIN}?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	// const { data: githubData, isSuccess: githubSuccess, isLoading: githubLoading } = useGithubAccessToken(searchParams.get('code') || '')

	useEffect(() => {
		if (isSuccess && !isPending) {
			handleSetUser(data.user)
			handleSetToken(data.token as string)
			handleIsLoggedIn()
			navigate('/app/my-portfolio', { replace: true })
		}
	}, [navigate, isSuccess, data?.user, handleSetUser, handleIsLoggedIn, isPending, handleSetToken, data?.token])

	return (
		<div className='formContainer'>
			<div>
				<h1 className='mb-1'>Login to Account</h1>
				<h6>Enter your credentials to access your account</h6>
			</div>

			<Link to={githubUrl} className='w-full'>
				<Button
					// onClick={handleGithubSignup}
					buttonText='Sign In with Github'
					buttonStyles='bg-darkBlue text-white w-full'
					icon={<BiLogoGithub className='h-6 w-6' />}
				/>
			</Link>
			<div className='borderWord'>or</div>

			<form className='flex flex-col -mt-2.5 gap-4' onSubmit={handleSubmit((data) => loginUser(data))} autoComplete='on'>
				<Text name='email' register={register} placeholder='Enter email' error={errors.email?.message} />

				<Password
					name='password'
					register={register}
					placeholder='Enter password'
					showPasswordBtn={true}
					error={errors.password?.message}
				/>
				<Link to='/auth/forgot-password' className='place-self-end -mt-2'>
					<Button buttonText='Forgot Password' variant='text' buttonStyles='text-violet' />
				</Link>
				<Button buttonText='Sign In' isLoading={isPending} type='submit' buttonStyles='bg-violet text-white w-full' />
			</form>

			<div className='-mt-3 text-start'>
				<span className='text-[12px] text-gray mr-1'>Not a member?</span>
				<Link to='/auth'>
					<Button variant='text' buttonText='Create an account' buttonStyles='text-violet' />
				</Link>
			</div>
		</div>
	)
}

export default Login
