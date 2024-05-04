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
	IProject,
	IProjects,
	IRegister,
	ITechnologies,
	IUser,
	IUserAndProjects,
} from './types'
import {
	IProfileSettings,
	IProjectSettings,
	LoginType,
	ResetPasswordType,
	SignupType,
} from '../utils/schemas'

const queryClient = new QueryClient()

// User Queries and Mutations
export const useGetMe = () =>
	useQuery<IUser, IDefaultError>({ queryKey: ['profileSettings', 'getUser'], queryFn: getMe, enabled: false })

export const useUpdateMe = () =>
	useMutation<IDefaultSuccess, IDefaultError, IProfileSettings>({
		mutationFn: updateMe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileSettings', 'getUser'] })
		},
	})

export const useDeleteMe = () => useMutation<IDefaultSuccess, IDefaultError>({ mutationFn: deleteMe })

export const useGetUserAndProjects = (userId: string) =>
	useQuery<IUserAndProjects, IDefaultError>({
		queryKey: ['myPortfolio', userId],
		queryFn: () => getUserAndProjects(userId),
	})

export const useChangePassword = () =>
	useMutation<ILogin, IDefaultError, ResetPasswordType>({ mutationFn: changePassword })

//Project Queries and Mutations

export const useGetMyProjects = () =>
	useQuery<IProjects, IDefaultError>({ queryKey: ['myProjects'], queryFn: getMyProjects })

export const useGetMyProject = (projectId: string) =>
	useQuery<IProject, IDefaultError>({
		queryKey: ['myProject', projectId],
		queryFn: () => getMyProject(projectId),
		enabled: false,
	})

export const useCreateMyProject = () =>
	useMutation<IProject, IDefaultError, IProjectSettings>({
		mutationFn: createMyProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useUpdateMyProject = () =>
	useMutation<IProject, IDefaultError, HttpParamsType<IProjectSettings>>({
		mutationFn: updateMyProject,
	})

export const useDeleteMyProject = () =>
	useMutation<IDefaultSuccess, IDefaultError, string>({
		mutationFn: deleteMyProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['myProjects'] })
		},
	})

export const useGetTechnologies = () =>
	useQuery<ITechnologies, IDefaultError>({
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
