import { FC } from 'react'
import styles from './ProjectCard.module.css'
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
		<div className={styles.cardContainer}>
			{imageURL ? <img src={imageURL} alt='Image' className={styles.cardImage} /> : <PhotoIcon className={styles.cardImage} />}
			<div className={styles.contentContainer}>
				<article className={styles.articleContainer}>
					<h4 className={styles.articleTitle}>{title}</h4>
					<p className={styles.articleTechnologies}>{techJoin}</p>
					<p className={styles.articleDescription}>{description}</p>
				</article>

				<div className={styles.buttonContainer}>
					{cardState === 'presentation' ? (
						<>
							<Link to={demoURL} target='_blank'>
								<Button
									buttonText='Demo URL'
									buttonStyles='w-full'
									icon={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}
									iconPos='right'
								/>
							</Link>

							<Link to={repositoryURL} target='_blank'>
								<Button
									buttonText='Repository URL'
									buttonStyles='w-full'
									icon={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}
									iconPos='right'
								/>
							</Link>
						</>
					) : (
						<div className={styles.buttonContainer}>
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
										buttonStyles='text-darkBlue bg-light3 border-0 order-1 mobile:order-2'
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
