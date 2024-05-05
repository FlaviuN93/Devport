import { FC, MouseEvent } from 'react'
import styles from './ProjectCard.module.css'
import Button from '../UI/Button'
import {
	ArrowTopRightOnSquareIcon,
	PencilSquareIcon,
	PhotoIcon,
	TrashIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { tCardState } from '../../utils/types'

interface ProjectCardProps {
	demoURL: string
	repositoryURL: string
	technologies: string[]
	title: string
	description: string
	imageURL?: string
	cardState?: tCardState
}

const ProjectCard: FC<ProjectCardProps> = ({
	imageURL,
	demoURL,
	repositoryURL,
	technologies,
	title,
	description,
	cardState = 'presentation',
}) => {
	const handleClick = (e: MouseEvent) => {
		console.log(e)
	}
	const techJoin = technologies.join(', ')
	console.log(technologies, 'helloFromProjectCard')
	return (
		<div className={styles.cardContainer}>
			{imageURL ? (
				<img src={imageURL} alt='Image' className={styles.cardImage} />
			) : (
				<PhotoIcon className={styles.cardImage} />
			)}
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
								onClick={handleClick}
								icon={<PencilSquareIcon className='h-5 w-5' />}
							/>
							<Button
								buttonText='Remove'
								buttonStyles='text-darkBlue bg-light3 border-0'
								onClick={handleClick}
								icon={<TrashIcon className='h-5 w-5' />}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
