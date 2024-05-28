import { FC } from 'react'
import styles from './ProjectCard.module.css'
import Button from '../UI/Button'
import { ArrowTopRightOnSquareIcon, PencilSquareIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { tCardState } from '../../utils/types'
import { Modal, ModalClose, ModalOpen, ModalWindow } from '../UI/Modal'
import { useDeleteMyProject } from '../../services/queries'
import { useProjectContext } from '../../contexts/contextHooks'

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
									<div className='flex flex-col gap-3 mt-2'>
										<h4 className=''>Delete Project</h4>
										<p>Are you sure you want to remove {title}?</p>
										<ModalClose>
											<div className='flex gap-2 justify-end'>
												<Button variant='primary' buttonText='Yes' isLoading={isPending} onClick={() => deleteAction()} />
												<Button variant='transparent' buttonText='No' />
											</div>
										</ModalClose>
									</div>
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
