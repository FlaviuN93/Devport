import { FC, ReactNode, createContext, useState } from 'react'
import { Project } from '../services/types'
import { getValueFromStorage } from '../utils/functions'

const initialProjectState: Project = {
	id: 0,
	name: '',
	demoURL: '',
	description: '',
	imageURL: '',
	repositoryURL: '',
	technologies: [],
}

export interface IProjectContextProps {
	isProjectSelected: boolean
	handleProjectSelect: (project: Project) => void
	selectedProject: Project
	disableProjectEdit: () => void
}

export const ProjectContext = createContext<IProjectContextProps>({} as IProjectContextProps)

export const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedProject, setSelectedProject] = useState<Project>(
		getValueFromStorage('project', initialProjectState)
	)
	const [isProjectSelected, setIsProjectSelected] = useState(false)

	const handleProjectSelect = (project: Project) => {
		window.localStorage.setItem('project', JSON.stringify(project))
		setSelectedProject(project)
		setIsProjectSelected(true)
	}

	const disableProjectEdit = () => {
		setIsProjectSelected(false)
		window.localStorage.removeItem('project')
	}

	return (
		<ProjectContext.Provider
			value={{ selectedProject, handleProjectSelect, isProjectSelected, disableProjectEdit }}
		>
			{children}
		</ProjectContext.Provider>
	)
}
