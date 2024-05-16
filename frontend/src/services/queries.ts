import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
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
import {
	HttpParamsType,
	IDefaultError,
	IDefaultSuccess,
	ILogin,
	IRegister,
	Technology,
	IUser,
	Project,
	User,
} from './types'
import { IProfileSettings, LoginType, ResetPasswordType, SignupType } from '../utils/schemas'

const queryClient = new QueryClient()

// User Queries and Mutations
export const useGetMe = () =>
	useQuery<User, IDefaultError>({ queryKey: ['profileSettings', 'getUser'], queryFn: getMe, enabled: false })

export const useUpdateMe = () =>
	useMutation<IUser, IDefaultError, IProfileSettings>({
		mutationFn: updateMe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileSettings', 'getUser'] })
		},
	})

export const useDeleteMe = () => useMutation<IDefaultSuccess, IDefaultError>({ mutationFn: deleteMe })

export const useGetUserAndProjects = (userId: string) =>
	useQuery<User, IDefaultError>({
		queryKey: ['myPortfolio', userId],
		queryFn: () => getUserAndProjects(userId),
	})

export const useChangePassword = () =>
	useMutation<ILogin, IDefaultError, ResetPasswordType>({ mutationFn: changePassword })

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

export const useForgotPassword = () =>
	useMutation<IDefaultSuccess, IDefaultError, { email: string }>({ mutationFn: forgotPassword })

export const useResetPassword = () =>
	useMutation<ILogin, IDefaultError, HttpParamsType<ResetPasswordType>>({
		mutationFn: resetPassword,
	})
