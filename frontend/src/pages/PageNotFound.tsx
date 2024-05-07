import Button from '../components/UI/Button'
import { useMoveBack } from '../hooks/useMoveBack'

const PageNotFound = () => {
	const moveBack = useMoveBack()
	return (
		<main className='h-screen flex items-center justify-center'>
			<div className='bg-light2 p-16 m-4 -mt-4 flex-grow-0 flex-shrink basis-[600px] text-center border-2 border-white rounded-lg'>
				<h2 className='mb-2'>404: Not Found 🧐</h2>
				<p className='mb-4'>The page you are looking for could not be found.</p>
				<Button variant='primary' buttonText='&larr; Go Back' onClick={moveBack} />
			</div>
		</main>
	)
}
export default PageNotFound
