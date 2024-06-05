import { useEffect, useState } from 'react'
import Password from '../../Inputs/Password'
import Button from '../../UI/Button'
import { useDeleteMe } from '../../../services/queries'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { useModalContext } from '../../../contexts/contextHooks'

const DeleteAccountForm = () => {
	const { error, isPending, mutate: deleteUser, isSuccess } = useDeleteMe()
	const { close } = useModalContext()
	const [deletePassword, setDeletePassword] = useState('')
	const navigate = useNavigate()

	// Still have to work on logout functionality here and other places
	useEffect(() => {
		console.log(close, 'close')
		if (!isPending && isSuccess) setTimeout(() => navigate('/auth'), 1000)
	}, [isPending, isSuccess, navigate, close])

	return (
		<div>
			<div className='flex flex-col gap-3 mt-2'>
				<h4 className='text-danger'>Delete Account</h4>
				<h5 className='font-bold'>
					Important! Deleting your account is permanent. You will lose access to all of your data and information associated with it.
				</h5>

				<p>If you are sure that you want to delete your account, please enter your password to confirm:</p>

				<Password
					onChange={(value) => setDeletePassword(value)}
					placeholder='Your password'
					showPasswordBtn={true}
					name='deleteAccount'
					error={error?.message as string}
				/>

				<div className='flex gap-2 flex-col mobile:flex-row mobile:justify-end'>
					<Button variant='transparent' buttonText='Cancel' onClick={() => close()} />

					<Button
						buttonText='Delete'
						icon={<XMarkIcon className='h-5 w-5' />}
						buttonStyles='bg-danger text-white'
						iconStyles='border-light2 border-t-danger'
						isLoading={isPending}
						onClick={() => deleteUser({ password: deletePassword })}
					/>
				</div>
			</div>
		</div>
	)
}

export default DeleteAccountForm
