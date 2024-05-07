import { JwtPayload } from 'jsonwebtoken'

export interface LoginUser {
	avatarURL: string
	email: string
	fullName: string
}

export interface User {
	coverURL: string
	avatarURL: string
	email: string
	fullName: string
	jobTitle: string
	linkedin: string
	bio: string
}

interface Project {
	id: number
	imageURL: File
	name: string
	demoURL: string
	repositoryURL: string
	technologies: string[]
	description: string
}

export interface IDefault {
	statusCode: number
	statusText?: string[]
	token?: string
}

// User Types
export interface IUserAndProjects extends IUser {
	projects: Project[]
}

export interface IGetUserAndProjects extends IDefault {
	userWithProjects: IUserAndProjects
}

export interface IUser extends IDefault {
	user: User
}

// Project Types
export interface IProjects extends IDefault {
	projects: Project[]
}

export interface IProject extends IDefault {
	project: Project
}

export interface ITechnologies extends IDefault {
	technologies: Item[]
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

interface Item {
	id: number
	name: string
}
