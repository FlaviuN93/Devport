import { useMutation, useQuery } from '@tanstack/react-query'
import {
	checkResetToken,
	contactUs,
	createMyProject,
	deleteMe,
	deleteMyAvatar,
	deleteMyCover,
	deleteMyProject,
	forgotPassword,
	getMyProject,
	getMyProjects,
	getMyUserId,
	getTechnologies,
	getUserAndProjects,
	login,
	logout,
	register,
	resetPassword,
	updateMe,
	updateMyAvatar,
	updateMyCover,
	updateMyProject,
	updatePassword,
} from './api.requests'
import { IDefaultError, IDefaultSuccess, Technology, IUser, Project, User, ICover, IAvatar, MessageUs, IRegisteredUser } from './types'
import { IProfileSettings, LoginType, ResetPasswordType, SignupType } from '../utils/schemas'
import { queryClient } from './queryClient'
import { updateObjectFromStorage } from '../utils/functions'

// User Queries and Mutations
export const useGetMyUserId = () => useQuery<string, IDefaultError>({ queryKey: ['getMyUserId'], queryFn: getMyUserId })

export const useUpdateMe = () =>
	useMutation<IUser, IDefaultError, IProfileSettings>({
		mutationFn: updateMe,
	})

export const useUpdateMyCover = () => useMutation<ICover, IDefaultError, FormData>({ mutationFn: updateMyCover })
export const useUpdateMyAvatar = () => useMutation<IAvatar, IDefaultError, FormData>({ mutationFn: updateMyAvatar })

export const useDeleteMyCover = () =>
	useMutation<IDefaultSuccess, IDefaultError>({
		mutationFn: deleteMyCover,
		onSuccess: () => {
			updateObjectFromStorage({ storageKey: 'user', objectKey: 'coverURL', valueToUpdate: '' })
		},
	})
export const useDeleteMyAvatar = () =>
	useMutation<IDefaultSuccess, IDefaultError>({
		mutationFn: deleteMyAvatar,
		onSuccess: () => {
			updateObjectFromStorage({ storageKey: 'user', objectKey: 'avatarURL', valueToUpdate: '' })
		},
	})

export const useDeleteMe = () =>
	useMutation<IDefaultSuccess, IDefaultError, { password: string }>({
		mutationFn: deleteMe,
		onSuccess: () => {
			window.localStorage.removeItem('user')
		},
	})

export const useGetUserAndProjects = (userId: string) =>
	useQuery<User, IDefaultError>({
		queryKey: ['getPortfolio', userId],
		queryFn: () => getUserAndProjects(userId),
	})

//Project Queries and Mutations

export const useGetMyProjects = () =>
	useQuery<Project[], IDefaultError>({
		queryKey: ['myProjects'],
		queryFn: getMyProjects,
	})

export const useGetMyProject = (projectId: number) =>
	useQuery<Project, IDefaultError>({
		queryKey: ['myProject', projectId],
		queryFn: () => getMyProject(projectId),
		enabled: !!projectId,
	})

export const useCreateMyProject = () =>
	useMutation<IDefaultSuccess, IDefaultError, FormData>({
		mutationFn: createMyProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useUpdateMyProject = (projectId: number) =>
	useMutation<IDefaultSuccess, IDefaultError, FormData>({
		mutationFn: (body) => updateMyProject(projectId, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useDeleteMyProject = (projectId: number) =>
	useMutation<IDefaultSuccess, IDefaultError>({
		mutationFn: () => deleteMyProject(projectId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useGetTechnologies = () =>
	useQuery<Technology[], IDefaultError>({
		queryKey: ['myProjects', 'technologies'],
		queryFn: getTechnologies,
	})

// Authentication Mutations

export const useRegister = () =>
	useMutation<IRegisteredUser, IDefaultError, SignupType>({
		mutationFn: register,
	})

export const useLogin = () =>
	useMutation<IUser, IDefaultError, LoginType>({
		mutationFn: login,
	})

export const useLogout = () => useMutation<IDefaultSuccess, IDefaultError>({ mutationFn: logout })
export const useForgotPassword = () => useMutation<IDefaultSuccess, IDefaultError, { email: string }>({ mutationFn: forgotPassword })

export const useResetPassword = (resetToken: string | undefined) =>
	useMutation<IDefaultSuccess, IDefaultError, ResetPasswordType>({
		mutationFn: (body) => resetPassword(resetToken, body),
	})

export const useCheckResetToken = () =>
	useMutation<string, IDefaultError, string>({ mutationFn: (resetToken) => checkResetToken(resetToken) })

export const useContactUs = () =>
	useMutation<IDefaultSuccess, IDefaultError, MessageUs>({
		mutationFn: contactUs,
	})

export const useUpdatePassword = () => useMutation<IDefaultSuccess, IDefaultError, ResetPasswordType>({ mutationFn: updatePassword })
