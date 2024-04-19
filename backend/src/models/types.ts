import { JwtPayload } from 'jsonwebtoken'
import { UpdateProject } from './projectModel'

export interface LoginUser {
	id: number
	avatarImage: string
	email: string
	fullName: string
}

export interface BaseUser {
	id: number
	coverImage: string
	avatarImage: string
	email: string
	fullName: string
	jobTitle: string
	linkedin: string
	bio: string
}

export interface IDefault {
	statusCode: number
	statusText: string[]
	token?: string
}

// User Types
export interface IUserAndProjects extends IUser {
	projects: UpdateProject[]
}

export interface IGetUserAndProjects extends IDefault {
	userWithProjects: IUserAndProjects
}

export interface IUser extends IDefault {
	user: BaseUser
}

// Project Types
export interface IGetProjects extends IDefault {
	projects: UpdateProject[]
}

// Auth Types

export interface IRegisterUser extends IDefault {
	email: string
}

export interface TokenPayload extends JwtPayload {
	userId: number
}

export interface ILoginUser extends IDefault {
	user: LoginUser
}
