import Password from '../../Inputs/Password'
import PasswordValidation from '../../Inputs/PasswordValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ResetPasswordType, resetPasswordSchema } from '../../../utils/schemas'
import { FC, useEffect } from 'react'
import { TailwindClasses } from '../../../utils/types'
import Button from '../../UI/Button'
import { useModalContext } from '../../../contexts/contextHooks'
import { useChangePassword, useResetPassword } from '../../../services/queries'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { catchPasswordErrors, useValidateResult } from '../../../utils/functions'

interface IResetPasswordForm {
	buttonName: string
	passwordLabel?: string
	confirmLabel?: string
	formStyles?: TailwindClasses
	showCancelBtn?: boolean
}

const ResetPasswordForm: FC<IResetPasswordForm> = ({ passwordLabel, confirmLabel, formStyles, buttonName, showCancelBtn = false }) => {
	const {
		handleSubmit,
		register,
		watch,
		reset,
		formState: { errors },
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		criteriaMode: 'all',
		mode: 'onChange',
		defaultValues: { password: '', confirmPassword: '' },
	})

	const formClasses = `flex flex-col -mt-1 gap-4 ${formStyles}`
	const watchPassword = watch('password')
	const watchedErrors = catchPasswordErrors(watchPassword)
	const passwordErrors = useValidateResult(watchedErrors)

	const navigate = useNavigate()
	const { close } = useModalContext()
	const { resetToken } = useParams()

	const { isPending: isChangeLoading, mutate: changePassword, isSuccess: isChangeSuccess } = useChangePassword()
	const { isPending: isResetLoading, mutate: resetPassword, isSuccess: isResetSuccess } = useResetPassword(resetToken)

	useEffect(() => {
		if (!isResetLoading && isResetSuccess) setTimeout(() => navigate('/auth/login', { replace: true }), 500)
		else if (!isChangeLoading && isChangeSuccess) {
			reset()
			setTimeout(() => close(), 500)
		}
	}, [isResetLoading, isResetSuccess, reset, isChangeLoading, isChangeSuccess, close, navigate])

	const handleResetPassword: SubmitHandler<ResetPasswordType> = (data) => {
		if (resetToken) return resetPassword(data)
		else changePassword(data)
	}

	return (
		<form className={formClasses} onSubmit={handleSubmit(handleResetPassword)}>
			<Password
				name='password'
				register={register}
				label={passwordLabel}
				placeholder='Enter a password'
				showPasswordBtn={true}
				error={!!errors.password?.message}
			/>

			<Password
				name='confirmPassword'
				register={register}
				showPasswordBtn={true}
				label={confirmLabel}
				placeholder='Re-enter a password'
				error={errors.confirmPassword?.message}
			/>

			<div className='grid grid-cols-2 gap-3'>
				{passwordErrors.map((error) => (
					<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
				))}
			</div>
			<div className='flex gap-2 mt-2 flex-col mobile:flex-row mobile:justify-end'>
				{showCancelBtn && (
					<Button type='button' buttonStyles='bg-light dark:text-light dark:bg-gray2' buttonText='Cancel' onClick={() => close()} />
				)}
				<Button
					buttonText={buttonName}
					type='submit'
					variant='primary'
					buttonStyles='w-full mobile:w-auto'
					isLoading={isResetLoading || isChangeLoading}
					icon={<CheckCircleIcon className='h-5 w-5' />}
				/>
			</div>
		</form>
	)
}

export default ResetPasswordForm
