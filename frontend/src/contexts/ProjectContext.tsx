import { FC, ReactNode, createContext, useState } from 'react'
import { Project } from '../services/types'

const initialProjectState: Project = {
	id: 0,
	name: '',
	demoURL: '',
	description: '',
	imageFile: '',
	repositoryURL: '',
	technologies: [],
}

export interface IProjectContextProps {
	isProjectSelected: boolean
	handleProjectSelect: (project: Project) => void
	selectedProject: Project
	disableProjectEdit: () => void
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

	const resetImageUrl = () => setSelectedProject((prevState) => ({ ...prevState, imageFile: '' }))
	const disableProjectEdit = () => setIsProjectSelected(false)

	return (
		<ProjectContext.Provider
			value={{
				selectedProject,
				handleProjectSelect,
				isProjectSelected,
				resetImageUrl,
				disableProjectEdit,
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}
