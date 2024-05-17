import styles from './ResetPasswordForm.module.css'
import Password from '../Inputs/Password'
import PasswordValidation from '../Inputs/PasswordValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useValidateResult } from '../../hooks/useValidateResult'
import { ResetPasswordType, resetPasswordSchema } from '../../utils/schemas'
import { passwordInitialState } from '../../utils/variables'
import { FC } from 'react'
import { TailwindClasses } from '../../utils/types'

interface IResetPasswordForm {
	formName: string
	passwordLabel?: string
	confirmLabel?: string
	formStyles?: TailwindClasses
}

const ResetPasswordForm: FC<IResetPasswordForm> = ({ formName, passwordLabel, confirmLabel, formStyles }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		criteriaMode: 'all',
		mode: 'onChange',
	})

	const formClasses = `${styles.formContainer} ${formStyles}`
	const passwordErrorTypes = errors.password?.types?.invalid_string
	const { errors: passwordErrors, isValid } = useValidateResult(passwordErrorTypes, passwordInitialState)
	const resetPasswordData: SubmitHandler<ResetPasswordType> = (data) => {
		console.log('Submitted Data', data, errors, 'submitResetPassword')
	}
	return (
		<form id={formName} className={formClasses} onSubmit={handleSubmit(resetPasswordData)}>
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
				label={confirmLabel}
				placeholder='Re-enter a password'
				error={errors.confirmPassword?.message}
			/>

			<div className={styles.passwordValidation}>
				{passwordErrors.map((error) => (
					<PasswordValidation key={error.type} isActive={error.isActive} type={error.type} />
				))}
			</div>
		</form>
	)
}

export default ResetPasswordForm
