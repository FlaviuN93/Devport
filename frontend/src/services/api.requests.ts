import { remove, get, patch, post, put } from './baseHttp'
import { IDefaultSuccess, ILogin, IRegister, IUser, Project, Technology, User } from './types'
import { IProfileSettings, LoginType, ResetPasswordType, SignupType } from '../utils/schemas'

// User Routes
export const getMe = () => get<User>('/users/currentUser')

export const updateMe = (body: IProfileSettings) =>
	patch<IUser, IProfileSettings>('/users/currentUser', { body })

export const deleteMe = (body: { password: string }) =>
	remove<IDefaultSuccess, { password: string }>('/users/currentUser', { body })

// I will get access to userId from the url with react router
export const getUserAndProjects = (userId: string) => get<User>(`/users/projects/${userId}`)

// Project Routes
export const getMyProjects = () => get<Project[]>('/projects/currentUser')

export const getMyProject = (projectId: number) => get<Project>(`/projects/currentUser/${projectId}`)

export const createMyProject = (body: FormData) =>
	post<IDefaultSuccess, FormData>('projects/currentUser', { body })

export const updateMyProject = (projectId: number, body: FormData) =>
	put<IDefaultSuccess, FormData>(`projects/currentUser/${projectId}`, {
		body,
	})

export const deleteMyProject = (projectId: number) =>
	remove<IDefaultSuccess>(`projects/currentUser/${projectId}`)

export const getTechnologies = () => get<Technology[]>('/projects/currentUser/technologies')

// Authentication Routes
export const register = (body: SignupType) => post<IRegister, SignupType>('/auth/register', { body })

export const login = (body: LoginType) => post<ILogin, LoginType>('/auth/login', { body })

export const forgotPassword = (body: { email: string }) =>
	post<IDefaultSuccess, { email: string }>('/auth/forgotPassword', { body })

// I will get access to resetToken from the url with react router
export const resetPassword = (resetToken: string | undefined, body: ResetPasswordType) =>
	patch<ILogin, ResetPasswordType>(`/auth/resetPassword/${resetToken}`, { body })

export const changePassword = (body: ResetPasswordType) =>
	post<ILogin, ResetPasswordType>('/auth/changePassword', { body })
