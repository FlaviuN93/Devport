import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { createMyProject, deleteMe, getMe, getMyProjects, getUserAndProjects, updateMe } from './api.requests'
import { IDefaultError, IDefaultSuccess, IProject, IProjects, IUser, IUserAndProjects } from './types'
import { ProfileSettingsType, ProjectSettingsType } from '../utils/schemas'

const queryClient = new QueryClient()

export const useGetMe = () =>
	useQuery<IUser, IDefaultError>({ queryKey: ['profileSettings', 'getUser'], queryFn: getMe, enabled: false })

export const useUpdateMe = () =>
	useMutation<IDefaultSuccess, IDefaultError, ProfileSettingsType>({
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

export const useGetMyProjects = () =>
	useQuery<IProjects, IDefaultError>({ queryKey: ['myProjects'], queryFn: getMyProjects })

export const useCreateMyProject = () =>
	useMutation<IProject, IDefaultError, ProjectSettingsType>({
		mutationFn: createMyProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileSettings', 'getUser'] })
		},
	})
