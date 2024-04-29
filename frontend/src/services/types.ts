export interface Params {
	[key: string]: boolean | string | string[] | number | number[]
}

export interface RequestBody {
	[key: string]: any
}
export interface HttpParamsType {
	queryParams?: Params
	body?: RequestBody
}

export interface IDefaultSuccess {
	message: string
}

export interface IDefaultError {
	statusCode: number
	statusText: string
	type: 'clientError' | 'serverError' | 'zodError' | 'ERR_NETWORK' | 'ECONNABORTED'
	message: string | string[]
}

export interface IRegister extends IDefaultSuccess {
	user: { email: string }
}

export interface ILogin extends IDefaultSuccess {
	user: { avatarURL: string; email: string; fullName: string }
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

export interface IUserAndProjects extends IDefaultSuccess {
	user: UserAndProjects
}

interface Project {
	imageURL: string
	name: string
	demoURL: string
	repositoryURL: string
	technologies: string[]
	description: string
}

interface User {
	coverURL: string
	avatarURL: string
	email: string
	fullName: string
	jobTitle: string
	linkedin: string
	bio: string
}

interface UserAndProjects extends User {
	projects: Project[]
}
