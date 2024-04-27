import { deleteReq, getReq, patchReq, postReq } from './baseHttp'
import { IDefaultSuccess, ILogin, IProject, IProjects, IRegister, IUser, IUserAndProjects } from './types'
import {
	LoginType,
	ProfileSettingsType,
	ProjectSettingsType,
	ResetPasswordType,
	SignupType,
} from '../utils/schemas'

// User Routes
export const getMe = () => getReq<IUser>('/users/currentUser')

export const updateMe = (body: ProfileSettingsType) =>
	patchReq<IDefaultSuccess>('/users/currentUser', { body })

export const deleteMe = () => deleteReq<IDefaultSuccess>('/users/currentUser')

// I will get access to userId from the url with react router
export const getUserAndProjects = (userId: string) =>
	getReq<IUserAndProjects>('/users/projects/:userId', { queryParams: { userId } })

// Project Routes
export const getMyProjects = () => getReq<IProjects>('/projects/currentUser')

export const createMyProject = (body: ProjectSettingsType) =>
	postReq<IProject>('projects/currentUser', { body })

export const updateMyProject = (projectId: string, body: ProjectSettingsType) =>
	patchReq<IProject>('projects/currentUser/:projectId', { queryParams: { projectId }, body })

export const deleteMyProject = (projectId: string) =>
	deleteReq<IDefaultSuccess>('projects/currentUser/:projectId', { queryParams: { projectId } })

// Authentication Routes
export const registerReq = (body: SignupType) => postReq<IRegister>('/auth/register', { body })

export const loginReq = (body: LoginType) => postReq<ILogin>('/auth/login', { body })

export const forgotPasswordReq = (body: { email: string }) =>
	postReq<IDefaultSuccess>('/auth/forgotPassword', { body })

// I will get access to resetToken from the url with react router
export const resetPasswordReq = (resetToken: string, body: ResetPasswordType) =>
	patchReq<ILogin>('/auth/resetPassword/:resetToken', { queryParams: { resetToken }, body })

export const changePasswordReq = (body: ResetPasswordType) =>
	postReq<ILogin>('/auth/changePassword', { body })
