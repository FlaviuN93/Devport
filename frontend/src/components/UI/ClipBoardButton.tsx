import { ClipboardDocumentIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'
import Button from './Button'
import Tooltip from './Tooltip'
import { useGetMyUserId } from '../../services/queries'

const ClipBoardButton: FC<{ isPortfolioValid: boolean }> = ({ isPortfolioValid }) => {
	const { data: userId } = useGetMyUserId()
	const [showTooltip, setShowTooltip] = useState(false)
	const [copyMessage, setCopyMessage] = useState('')
	const publicUrl = `${import.meta.env.VITE_LOCAL_DOMAIN}/my-portfolio/${userId}`

	const copyToClipBoard = async (publicPortfolioUrl: string) => {
		try {
			await navigator.clipboard.writeText(publicPortfolioUrl)
			setCopyMessage('Copied!')
		} catch (err) {
			setCopyMessage('Failed To Copy. Reload the page and try again.')
		}
		setTimeout(() => setCopyMessage(''), 1500)
	}

	return (
		<div className='flex items-center gap-2'>
			<Button
				icon={<ClipboardDocumentIcon className='h-5 w-5' />}
				iconPos='left'
				buttonText='Share'
				disabled={!isPortfolioValid}
				buttonStyles={`text-darkGray dark:text-black3 bg-light dark:bg-light3 font-semibold  ${
					isPortfolioValid ? 'bg-light dark:bg-light3 transition-shadow duration-250 hover:shadow-md active:shadow-sm' : 'shadow-none'
				}`}
				onClick={() => copyToClipBoard(publicUrl)}
			/>
			{!isPortfolioValid ? (
				<div className='relative w-10 h-10 items-center flex'>
					<InformationCircleIcon
						className='h-5 w-5 text-darkGray opacity-75 cursor-pointer'
						onMouseOver={() => setShowTooltip(true)}
						onMouseOut={() => setShowTooltip(false)}
					/>
					<Tooltip
						content='To share your portfolio link, please complete all profile details and add at least one project.'
						position='right'
						hoverTooltip={showTooltip}
						tooltipStyles='bg-gray2 dark:bg-darkGray'
					/>
				</div>
			) : (
				<span className='font-medium text-gray'>{copyMessage}</span>
			)}
		</div>
	)
}

export default ClipBoardButton
