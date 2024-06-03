import { remove, get, patch, post, put } from './baseHttp'
import { IAvatar, ICover, IDefaultSuccess, IUser, Project, Technology, User } from './types'
import { LoginType, ResetPasswordType, SignupType } from '../utils/schemas'

// User Routes
export const getMyPortfolio = () => get<User>('/users/projects/currentUser')

export const updateMe = (body: FormData) => patch<IUser, FormData>('/users/currentUser', { body })

// export const updateMyPortfolio = (body: FormData) => patch<IUser, FormData>('/users/projects/currentUser', { body })

export const updateMyCover = (body: FormData) => patch<ICover, FormData>('/users/currentUser/coverImg', { body })
export const updateMyAvatar = (body: FormData) => patch<IAvatar, FormData>('/users/currentUser/avatarImg', { body })

export const deleteMyCover = () => remove<IDefaultSuccess>('/users/currentUser/coverImg')
export const deleteMyAvatar = () => remove<IDefaultSuccess>('/users/currentUser/avatarImg')

export const deleteMe = (body: { password: string }) => remove<IDefaultSuccess, { password: string }>('/users/currentUser', { body })

// I will get access to userId from the url with react router
export const getUserAndProjects = (userId: string) => get<User>(`/users/projects/${userId}`)

// Project Routes
export const getMyProjects = () => get<Project[]>('/projects/currentUser')

export const getMyProject = (projectId: number) => get<Project>(`/projects/currentUser/${projectId}`)

export const createMyProject = (body: FormData) => post<IDefaultSuccess, FormData>('projects/currentUser', { body })

export const updateMyProject = (projectId: number, body: FormData) =>
	put<IDefaultSuccess, FormData>(`projects/currentUser/${projectId}`, {
		body,
	})

export const deleteMyProject = (projectId: number) => remove<IDefaultSuccess>(`projects/currentUser/${projectId}`)

export const getTechnologies = () => get<Technology[]>('/projects/currentUser/technologies')

// Authentication Routes
export const register = (body: SignupType) => post<IUser, SignupType>('/auth/register', { body })

export const login = (body: LoginType) => post<IUser, LoginType>('/auth/login', { body })

export const forgotPassword = (body: { email: string }) => post<IDefaultSuccess, { email: string }>('/auth/forgotPassword', { body })

// I will get access to resetToken from the url with react router
export const resetPassword = (resetToken: string | undefined, body: ResetPasswordType) =>
	patch<IDefaultSuccess, ResetPasswordType>(`/auth/resetPassword/${resetToken}`, { body })

export const changePassword = (body: ResetPasswordType) => post<IUser, ResetPasswordType>('/auth/changePassword', { body })
