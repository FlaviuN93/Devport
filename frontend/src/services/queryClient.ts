import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createZodErrorMessage } from '../utils/functions'
import { IDefaultError, IDefaultSuccess } from './types'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
			retry: 1,
			throwOnError: (error: unknown) => {
				const defaultError = error as IDefaultError
				return defaultError.statusTitle.startsWith('500')
			},
		},
		mutations: {
			throwOnError: (error: unknown) => {
				const defaultError = error as IDefaultError
				return defaultError.statusTitle.startsWith('500')
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error: unknown) => {
			const defaultError = error as IDefaultError
			if (defaultError.statusTitle.startsWith('500')) return

			const toastMessage = createZodErrorMessage(defaultError)
			if (toastMessage) return toast.error(toastMessage)

			return toast.error(`${defaultError.statusTitle}: ${defaultError.message}`)
		},
	}),
	mutationCache: new MutationCache({
		onSuccess: (data: unknown) => {
			if (data === 'Success') return null
			const { message } = data as IDefaultSuccess
			return toast.success(`${message}`)
		},
		onError: (error: unknown) => {
			const defaultError = error as IDefaultError
			if (defaultError.statusTitle.startsWith('500')) return

			const toastMessage = createZodErrorMessage(defaultError)
			if (toastMessage) return toast.error(toastMessage)
			return toast.error(`${defaultError.statusTitle}: ${defaultError.message}`)
		},
	}),
})
