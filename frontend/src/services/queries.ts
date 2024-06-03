import { useMutation, useQuery } from '@tanstack/react-query'
import {
	changePassword,
	createMyProject,
	deleteMe,
	deleteMyProject,
	forgotPassword,
	getMyPortfolio,
	getMyProject,
	getMyProjects,
	getTechnologies,
	getUserAndProjects,
	login,
	register,
	resetPassword,
	updateMe,
	updateMyAvatar,
	updateMyCover,
	updateMyProject,
} from './api.requests'
import { IDefaultError, IDefaultSuccess, Technology, IUser, Project, User, ICover, IAvatar } from './types'
import { LoginType, ResetPasswordType, SignupType } from '../utils/schemas'
import { queryClient } from './queryClient'

// User Queries and Mutations
export const useGetMyPortfolio = () => useQuery<User, IDefaultError>({ queryKey: ['getMyPortfolio'], queryFn: getMyPortfolio })

export const useUpdateMe = () =>
	useMutation<IUser, IDefaultError, FormData>({
		mutationFn: updateMe,
	})

// export const useUpdateMyPortfolio = () => useMutation<IUser, IDefaultError, FormData>({ mutationFn: updateMyPortfolio })
export const useUpdateMyCover = () => useMutation<ICover, IDefaultError, FormData>({ mutationFn: updateMyCover })
export const useUpdateMyAvatar = () => useMutation<IAvatar, IDefaultError, FormData>({ mutationFn: updateMyAvatar })

export const useDeleteMe = () => useMutation<IDefaultSuccess, IDefaultError, { password: string }>({ mutationFn: deleteMe })

export const useGetUserAndProjects = (userId: string) =>
	useQuery<User, IDefaultError>({
		queryKey: ['getPortfolio', userId],
		queryFn: () => getUserAndProjects(userId),
	})

export const useChangePassword = () => useMutation<IUser, IDefaultError, ResetPasswordType>({ mutationFn: changePassword })

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
		enabled: false,
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
	useMutation<IUser, IDefaultError, SignupType>({
		mutationFn: register,
	})

export const useLogin = () =>
	useMutation<IUser, IDefaultError, LoginType>({
		mutationFn: login,
	})

export const useForgotPassword = () => useMutation<IDefaultSuccess, IDefaultError, { email: string }>({ mutationFn: forgotPassword })

export const useResetPassword = (resetToken: string | undefined) =>
	useMutation<IDefaultSuccess, IDefaultError, ResetPasswordType>({
		mutationFn: (body) => resetPassword(resetToken, body),
	})
