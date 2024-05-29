import styles from './ResetPasswordForm.module.css'
import Password from '../Inputs/Password'
import PasswordValidation from '../Inputs/PasswordValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useValidateResult } from '../../hooks/useValidateResult'
import { ResetPasswordType, resetPasswordSchema } from '../../utils/schemas'
import { passwordInitialState } from '../../utils/variables'
import { FC, useEffect } from 'react'
import { TailwindClasses } from '../../utils/types'
import Button from '../UI/Button'
import { useModalContext } from '../../contexts/contextHooks'
import { useChangePassword, useResetPassword } from '../../services/queries'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface IResetPasswordForm {
	buttonName: string
	passwordLabel?: string
	confirmLabel?: string
	formStyles?: TailwindClasses
	buttonStyles?: TailwindClasses
	showCancelBtn?: boolean
}

const ResetPasswordForm: FC<IResetPasswordForm> = ({
	passwordLabel,
	confirmLabel,
	formStyles,
	buttonName,
	buttonStyles,
	showCancelBtn = false,
}) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		criteriaMode: 'all',
		mode: 'onChange',
		defaultValues: { password: '', confirmPassword: '' },
	})

	const formClasses = `${styles.formContainer} ${formStyles}`
	const passwordErrorTypes = errors.password?.types?.invalid_string
	const { errors: passwordErrors, isValid } = useValidateResult(passwordErrorTypes, passwordInitialState)

	const navigate = useNavigate()
	const { close } = useModalContext()
	const { resetToken } = useParams()

	const { isPending: isChangeLoading, mutate: changePassword, isSuccess: isChangeSuccess } = useChangePassword()
	const { isPending: isResetLoading, mutate: resetPassword, isSuccess: isResetSuccess } = useResetPassword(resetToken)

	useEffect(() => {
		if (resetToken) {
			if (!isResetLoading && isResetSuccess) {
				reset()
				setTimeout(() => {
					navigate('/auth/login')
				}, 1000)
			}
		} else if (!isChangeLoading && isChangeSuccess) {
			reset()
			close()
		}
	}, [isResetLoading, isResetSuccess, reset, isChangeLoading, isChangeSuccess, close, resetToken, navigate])

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
				error={isValid}
			/>

			<Password
				name='confirmPassword'
				register={register}
				showPasswordBtn={true}
				label={confirmLabel}
				placeholder='Re-enter a password'
				error={errors.confirmPassword?.message}
			/>

			<div className={styles.passwordValidation}>
				{passwordErrors.map((error) => (
					<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
				))}
			</div>
			<div className='flex gap-2 flex-col mobile:flex-row mobile:justify-end'>
				{showCancelBtn && <Button type='button' variant='transparent' buttonText='Cancel' onClick={() => close()} />}
				<Button
					buttonText={buttonName}
					type='submit'
					buttonStyles={buttonStyles}
					isLoading={isResetLoading || isChangeLoading}
					icon={<CheckCircleIcon className='h-5 w-5' />}
				/>
			</div>
		</form>
	)
}

export default ResetPasswordForm
