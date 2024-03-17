import Button from '../components/UI/Button'
import Avatar from '../components/UI/Avatar'
import PageNav from '../components/Containers/PageNav'
import Cover from '../components/UI/Cover'
import Plus1 from '../assets/Plus-1.svg?react'
import Plus from '../assets/Plus.svg?react'
import Trash from '../assets/Trash.svg?react'
import Text from '../components/Inputs/Text'
import { useForm } from 'react-hook-form'
import Search from '../components/Inputs/Search'
import Password from '../components/Inputs/Password'
import File from '../components/Inputs/File'
import UploadIcon from '../assets/upload.svg?react'
import ProjectCard from '../components/Containers/ProjectCard'
import { useEffect, useState } from 'react'
import Dropdown from '../components/UI/Dropdown'

export default function HomePage() {
	const { register } = useForm()
	const [toggle, setToggle] = useState(false)

	useEffect(() => {
		console.log(toggle)
	}, [toggle])

	return (
		<div>
			<div className='relative'>
				<Avatar
					role='button'
					isOpen={toggle}
					onClick={(value) => setToggle(value)}
					icon={<Plus className='h-6 w-6' />}
				/>
				<Dropdown position='top'>
					<div className='flex'>
						<Avatar icon={<Plus className='h-6 w-6' />} />
						<div>
							<h4>Tyler Johnson</h4>
							<p>tyler.johnson@gmail.com</p>
						</div>
					</div>
				</Dropdown>
			</div>
			<Button
				buttonText='Add'
				size='small'
				icon={<Plus1 />}
				type='primary'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Button
				buttonText='Add Project'
				size='auto'
				icon={<Plus />}
				type='secondary'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Button
				buttonText='Delete Image'
				icon={<Trash />}
				danger={true}
				size='small'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>
			<Button
				buttonText='Create an account'
				type='text'
				size='small'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Text
				onChange={(value) => console.log(value, 'helloFromInput')}
				placeholder='Enter your job title'
				type='input'
				label='Sign In'
				name='password'
				register={register}
			/>

			<Search
				onSearch={(value) => console.log(value, 'helloFromInput')}
				placeholder='Search for values'
				name='search'
				iconPos='right'
			/>
			<Password
				onChange={(value) => console.log(value, 'helloFromInput')}
				placeholder='Enter your job title'
				label='Sign In'
				name='password'
				register={register}
				showPasswordBtn={true}
			/>

			<File
				onChange={(value) => console.log(value, 'helloFromInput')}
				label='Sign In'
				name='file'
				buttonText='Upload'
				icon={<UploadIcon />}
				register={register}
			/>

			<File
				onChange={(value) => console.log(value, 'helloFromInput')}
				label='Sign In'
				name='file'
				buttonText='Upload Image'
				icon={<UploadIcon />}
				register={register}
			/>

			<Avatar />

			<ProjectCard
				demoUrl='https://www.google.com'
				repositoryUrl='https://www.google.com'
				title='Music Player'
				description='I was Junior Front-End Developers, who are responsible for implementing visual and interactive elements that users see and interact with in a web users see and interact with in a web users see and interact with in a web'
			/>

			{/* <Menu /> */}
			<Cover />
			<PageNav />
		</div>
	)
}
