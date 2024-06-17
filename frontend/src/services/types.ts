export interface Params {
	[key: string]: string | string[] | number | number[]
}

export interface HttpParamsType<T> {
	query?: Params
	body?: T
}

export interface IDefaultSuccess {
	message: string
}

export interface IDefaultError {
	statusTitle: string
	type: 'clientError' | 'serverError' | 'zodError' | 'NETWORK ERROR' | 'CONNECTION ISSUES'
	message: string | string[]
}

export interface IRegisteredUser extends IDefaultSuccess {
	email: string
	token: string
}

export interface IUser extends IDefaultSuccess {
	user: User
	token?: string
}

export interface IAvatar extends IDefaultSuccess {
	avatarURL: string
}

export interface ICover extends IDefaultSuccess {
	coverURL: string
}

export interface IProject extends IDefaultSuccess {
	project: Project
}

export interface MessageUs {
	name: string
	email: string
	message: string
}

export interface Project {
	id: number
	imageURL: string
	name: string
	demoURL: string
	repositoryURL: string
	technologies: string[]
	description: string
}

export interface User {
	userId?: number
	coverURL: string | null
	avatarURL?: string | null
	email: string
	fullName?: string
	jobTitle?: string
	linkedin?: string
	bio?: string
	projects?: Project[]
}

export interface Technology {
	id: number
	name: string
}
