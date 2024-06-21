import { FC, ReactNode, createContext, useState } from 'react'
import { Project } from '../services/types'

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
	clearProject: () => void
	resetImageUrl: () => void
}

export const ProjectContext = createContext<IProjectContextProps>({} as IProjectContextProps)

export const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedProject, setSelectedProject] = useState<Project>(initialProjectState)
	const [isProjectSelected, setIsProjectSelected] = useState(false)

	const handleProjectSelect = (project: Project) => {
		setSelectedProject(project)
		setIsProjectSelected(true)
	}

	const clearProject = () => {
		setSelectedProject(initialProjectState)
		setIsProjectSelected(false)
	}

	const resetImageUrl = () => setSelectedProject((prevState) => ({ ...prevState, imageURL: '' }))

	return (
		<ProjectContext.Provider
			value={{
				selectedProject,
				handleProjectSelect,
				clearProject,
				isProjectSelected,
				resetImageUrl,
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}
