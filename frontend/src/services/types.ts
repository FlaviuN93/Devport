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
	type: 'clientError' | 'serverError' | 'zodError' | 'ERR_NETWORK' | 'ECONNABORTED'
	message: string | string[]
}

export interface IRegister extends IDefaultSuccess {
	user: { email: string }
}

export interface ILogin extends IDefaultSuccess {
	user: { email: string; avatarURL: string; fullName: string }
}

export interface IUser extends IDefaultSuccess {
	user: User
}

export interface IProjects extends IDefaultSuccess {
	projects: Project[]
}

export interface IProject extends IDefaultSuccess {
	project: Project
}

export interface ITechnologies extends IDefaultSuccess {
	technologies: Technology[]
}

export interface IUserAndProjects extends IDefaultSuccess {
	user: User
}

export interface Project {
	imageURL: string
	name: string
	demoURL: string
	repositoryURL: string
	technologies: string[]
	description: string
}

export interface User {
	coverURL?: string
	avatarURL?: string
	email: string
	fullName?: string
	jobTitle?: string
	linkedin?: string
	bio?: string
	projects?: Project[]
}

interface Technology {
	id: number
	name: string
}
