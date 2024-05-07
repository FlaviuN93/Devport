import { remove, get, patch, post } from './baseHttp'
import {
	HttpParamsType,
	IDefaultSuccess,
	ILogin,
	IProject,
	IRegister,
	IUser,
	Project,
	Technology,
	User,
} from './types'
import {
	IProfileSettings,
	IProjectSettings,
	LoginType,
	ResetPasswordType,
	SignupType,
} from '../utils/schemas'

// User Routes
export const getMe = () => get<User>('/users/currentUser')

export const updateMe = (body: IProfileSettings) =>
	patch<IUser, IProfileSettings>('/users/currentUser', { body })

export const deleteMe = () => remove<IDefaultSuccess>('/users/currentUser')

// I will get access to userId from the url with react router
export const getUserAndProjects = (userId: string) =>
	get<User>('/users/projects/:userId', {
		query: { userId },
	})

// Project Routes
export const getMyProjects = () => get<Project[]>('/projects/currentUser')

export const getMyProject = (projectId: string) =>
	get<Project>('/projects/currentUser/:projectId', { query: { projectId } })

export const createMyProject = (body: IProjectSettings) =>
	post<IProject, IProjectSettings>('projects/currentUser', { body })

export const updateMyProject = (httpParams: HttpParamsType<IProjectSettings>) =>
	patch<IProject, IProjectSettings>('projects/currentUser/:projectId', {
		query: httpParams.query,
		body: httpParams.body,
	})

export const deleteMyProject = (projectId: string) =>
	remove<IDefaultSuccess>('projects/currentUser/:projectId', {
		query: { projectId },
	})

export const getTechnologies = () => get<Technology[]>('/projects/currentUser/technologies')

// Authentication Routes
export const register = (body: SignupType) => post<IRegister, SignupType>('/auth/register', { body })

export const login = (body: LoginType) => post<ILogin, LoginType>('/auth/login', { body })

export const forgotPassword = (body: { email: string }) =>
	post<IDefaultSuccess, { email: string }>('/auth/forgotPassword', { body })

// I will get access to resetToken from the url with react router
export const resetPassword = (httpParams: HttpParamsType<ResetPasswordType>) =>
	patch<ILogin, ResetPasswordType>('/auth/resetPassword/:resetToken', {
		query: httpParams.query,
		body: httpParams.body,
	})

export const changePassword = (body: ResetPasswordType) =>
	post<ILogin, ResetPasswordType>('/auth/changePassword', { body })
