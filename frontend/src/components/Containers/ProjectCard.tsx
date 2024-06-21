import { FC } from 'react'
import Button from '../UI/Button'
import { ArrowTopRightOnSquareIcon, PencilSquareIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { tCardState } from '../../utils/types'
import { Modal, ModalOpen, ModalWindow } from '../UI/Modal'
import { useDeleteMyProject } from '../../services/queries'
import { useProjectContext } from '../../contexts/contextHooks'
import DeleteModal from '../Modals/DeleteModal'

interface ProjectCardProps {
	projectId: number
	demoURL: string
	repositoryURL: string
	technologies: string[]
	title: string
	description: string
	imageURL: string
	cardState?: tCardState
	onEdit?: () => void
}

const ProjectCard: FC<ProjectCardProps> = ({
	projectId,
	imageURL,
	demoURL,
	repositoryURL,
	technologies,
	title,
	description,
	cardState = 'presentation',
}) => {
	const techJoin = technologies.join(', ')
	const { isPending, mutate: deleteAction } = useDeleteMyProject(projectId)
	const { handleProjectSelect } = useProjectContext()

	return (
		<div className='flex flex-col border-[1px] border-light3 dark:border-darkGray rounded-lg p-3 mx-2 mobile:mx-0 gap-6 bg-light dark:bg-black tablet:flex-row'>
			{imageURL ? (
				<img
					src={imageURL}
					alt='Image'
					className='aspect-video stroke-1 rounded-lg bg-light3 dark:bg-black3 tablet:w-[35%] min-w-[250px]'
				/>
			) : (
				<PhotoIcon className='aspect-video stroke-1 rounded-lg tablet:w-1/3 min-w-[250px]' />
			)}
			<div className='tablet:w-3/5'>
				<article className='text-start text-sm mb-4'>
					<h4 className='text-xl dark:text-light'>{title}</h4>
					<p className='font-semibold text-darkGray dark:text-light3 mb-2'>{techJoin}</p>
					<p className='text-darkGray font-medium dark:text-light w-full tablet:w-auto break-words'>{description}</p>
				</article>

				<div className='flex flex-col gap-4 mb-1 lgMobile:flex-row'>
					{cardState === 'presentation' ? (
						<>
							<Link to={demoURL} target='_blank'>
								<Button
									buttonText='Demo URL'
									buttonStyles='w-full px-2.5 py-2 text-light bg-darkViolet'
									icon={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}
									iconPos='right'
								/>
							</Link>

							<Link to={repositoryURL} target='_blank'>
								<Button
									buttonText='Repository URL'
									buttonStyles='w-full px-2.5 py-2 text-darkGray dark:bg-light3'
									icon={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}
									iconPos='right'
								/>
							</Link>
						</>
					) : (
						<div className='flex flex-col gap-4 mb-1 lgMobile:flex-row'>
							<Button
								buttonText='Edit'
								variant='primary'
								buttonStyles='order-2 mobile:order-1'
								onClick={() =>
									handleProjectSelect({
										id: projectId,
										name: title,
										demoURL,
										repositoryURL,
										description,
										imageURL,
										technologies,
									})
								}
								icon={<PencilSquareIcon className='h-5 w-5' />}
							/>

							<Modal>
								<ModalOpen openedModalName='removeProject'>
									<Button
										buttonText='Remove'
										buttonStyles='text-black3 bg-light dark:bg-light3 order-1 mobile:order-2'
										icon={<TrashIcon className='h-5 w-5' />}
									/>
								</ModalOpen>
								<ModalWindow modalName='removeProject'>
									<DeleteModal
										content={`Are you sure you want to remove ${title}?`}
										title='Delete Project'
										isLoading={isPending}
										onDelete={() => deleteAction()}
									/>
								</ModalWindow>
							</Modal>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
