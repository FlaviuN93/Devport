import { FC, MouseEvent } from 'react'
import styles from './ProjectCard.module.css'
import Button from './Button'
import { ArrowTopRightOnSquareIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
	demoUrl: string
	repositoryUrl: string
	title: string
	description: string
	imageUrl?: string
	cardState?: 'presentation' | 'edit'
}

const ProjectCard: FC<ProjectCardProps> = ({
	imageUrl,
	demoUrl,
	repositoryUrl,
	title,
	description,
	cardState = 'presentation',
}) => {
	const handleClick = (e: MouseEvent) => {
		console.log(e)
	}

	return (
		<div className={styles.cardContainer}>
			{imageUrl ? (
				<img src={imageUrl} alt='Image' className={styles.cardImage} />
			) : (
				<PhotoIcon className={styles.cardImage} />
			)}
			<div className={styles.contentContainer}>
				<article className={styles.articleContainer}>
					<h4 className={styles.articleTitle}>{title}</h4>
					<p className={styles.articleDescription}>{description}</p>
				</article>

				<div className={styles.buttonContainer}>
					{cardState === 'presentation' ? (
						<>
							<Link to={demoUrl} target='_blank'>
								<Button
									buttonText='Demo URL'
									size='small'
									buttonStyles='flex items-center sm:py-1.5'
									icon={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}
									iconPos='right'
								/>
							</Link>

							<Link to={repositoryUrl} target='_blank'>
								<Button
									buttonText='Repository URL'
									buttonStyles='flex items-center sm:py-1.5'
									size='small'
									icon={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}
									iconPos='right'
								/>
							</Link>
						</>
					) : (
						<Button buttonText='Edit' onClick={handleClick} size='small' icon={<PencilIcon />} />
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
