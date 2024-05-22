import { useMutation, useQuery } from '@tanstack/react-query'
import {
	changePassword,
	createMyProject,
	deleteMe,
	deleteMyProject,
	forgotPassword,
	getMe,
	getMyProject,
	getMyProjects,
	getTechnologies,
	getUserAndProjects,
	login,
	register,
	resetPassword,
	updateMe,
	updateMyProject,
} from './api.requests'
import { IDefaultError, IDefaultSuccess, ILogin, IRegister, Technology, IUser, Project, User } from './types'
import { LoginType, ResetPasswordType, SignupType } from '../utils/schemas'
import { queryClient } from './queryClient'

// User Queries and Mutations
export const useGetMe = () => useQuery<User, IDefaultError>({ queryKey: ['profileSettings', 'getUser'], queryFn: getMe, enabled: false })

export const useUpdateMe = () =>
	useMutation<IUser, IDefaultError, FormData>({
		mutationFn: updateMe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileSettings', 'getUser'] })
		},
	})

export const useDeleteMe = () => useMutation<IDefaultSuccess, IDefaultError, { password: string }>({ mutationFn: deleteMe })

export const useGetUserAndProjects = (userId: string) =>
	useQuery<User, IDefaultError>({
		queryKey: ['myPortfolio', userId],
		queryFn: () => getUserAndProjects(userId),
	})

export const useChangePassword = () => useMutation<ILogin, IDefaultError, ResetPasswordType>({ mutationFn: changePassword })

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
	useMutation<IRegister, IDefaultError, SignupType>({
		mutationFn: register,
	})

export const useLogin = () =>
	useMutation<ILogin, IDefaultError, LoginType>({
		mutationFn: login,
	})

export const useForgotPassword = () => useMutation<IDefaultSuccess, IDefaultError, { email: string }>({ mutationFn: forgotPassword })

export const useResetPassword = (resetToken: string | undefined) =>
	useMutation<IDefaultSuccess, IDefaultError, ResetPasswordType>({
		mutationFn: (body) => resetPassword(resetToken, body),
	})
