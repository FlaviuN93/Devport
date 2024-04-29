import { remove, get, patch, post } from './baseHttp'
import { IDefaultSuccess, ILogin, IProject, IProjects, IRegister, IUser, IUserAndProjects } from './types'
import {
	LoginType,
	ProfileSettingsType,
	ProjectSettingsType,
	ResetPasswordType,
	SignupType,
} from '../utils/schemas'

// User Routes
export const getMe = () => get<IUser>('/users/currentUser')

export const updateMe = (body: ProfileSettingsType) => patch<IDefaultSuccess>('/users/currentUser', { body })

export const deleteMe = () => remove<IDefaultSuccess>('/users/currentUser')

// I will get access to userId from the url with react router
export const getUserAndProjects = (userId: string) =>
	get<IUserAndProjects>('/users/projects/:userId', {
		queryParams: { userId },
	})

// Project Routes
export const getMyProjects = () => get<IProjects>('/projects/currentUser')
export const getMyProject = () => get<IProject>('/projects/currentUser/:projectId')

export const createMyProject = (body: ProjectSettingsType) => post<IProject>('projects/currentUser', { body })

export const updateMyProject = (projectId: string, body: ProjectSettingsType) =>
	patch<IProject>('projects/currentUser/:projectId', {
		queryParams: { projectId },
		body,
	})

export const deleteMyProject = (projectId: string) =>
	remove<IDefaultSuccess>('projects/currentUser/:projectId', {
		queryParams: { projectId },
	})

// Authentication Routes
export const register = (body: SignupType) => post<IRegister>('/auth/register', { body })

export const login = (body: LoginType) => post<ILogin>('/auth/login', { body })

export const forgotPassword = (body: { email: string }) =>
	post<IDefaultSuccess>('/auth/forgotPassword', { body })

// I will get access to resetToken from the url with react router
export const resetPassword = (resetToken: string, body: ResetPasswordType) =>
	patch<ILogin>('/auth/resetPassword/:resetToken', {
		queryParams: { resetToken },
		body,
	})

export const changePassword = (body: ResetPasswordType) => post<ILogin>('/auth/changePassword', { body })
