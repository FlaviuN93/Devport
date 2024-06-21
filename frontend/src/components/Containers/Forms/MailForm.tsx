import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { contactUsSchema } from '../../../utils/schemas'
import Text from '../../Inputs/Text'
import Button from '../../UI/Button'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useContactUs } from '../../../services/queries'
import { MessageUs } from '../../../services/types'

const MailForm = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<MessageUs>({
		resolver: zodResolver(contactUsSchema),
	})
	const { isPending, mutate: contactUs } = useContactUs()

	return (
		<form onSubmit={handleSubmit((data) => contactUs(data, { onSuccess: () => reset() }))} className='flex flex-col gap-6'>
			<Text name='name' register={register} error={errors.name?.message} label='Your Name' placeholder='Let us know your name' />
			<Text
				name='email'
				register={register}
				error={errors.email?.message}
				label='Your Email'
				placeholder='Enter your email for us to respond'
			/>
			<Text
				name='message'
				register={register}
				cols={4}
				rows={10}
				variant='textarea'
				error={errors.message?.message}
				label='Your Message'
				placeholder='Have a question or feedback? Share it here!'
			/>
			<div className='flex w-full mobile:justify-end -mt-2'>
				<Button
					icon={<PaperAirplaneIcon className='h-5 w-5' />}
					buttonText='Send'
					iconPos='left'
					isLoading={isPending}
					buttonStyles='px-3 w-full mobile:w-auto'
					variant='primary'
					type='submit'
				/>
			</div>
		</form>
	)
}

export default MailForm
