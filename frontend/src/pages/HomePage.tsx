import Button from '../components/UI/Button'
import Avatar from '../components/UI/Avatar'
import PageNav from '../components/Containers/PageNav'
import Cover from '../components/UI/Cover'
import Plus1 from '../assets/Plus-1.svg?react'
import Plus from '../assets/Plus.svg?react'
import Trash from '../assets/Trash.svg?react'
import { useForm } from 'react-hook-form'
import Search from '../components/Inputs/Search'
import File from '../components/Inputs/File'
import UploadIcon from '../assets/upload.svg?react'
import ProjectCard from '../components/Containers/ProjectCard'
import {
	Dropdown,
	DropdownDivider,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../components/UI/Dropdown'
import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'

import { useEffect } from 'react'

export default function HomePage() {
	const { register } = useForm()
	useEffect(() => {
		console.log('hello')
	}, [])
	return (
		<div className='pl-40 mt-40 flex flex-col'>
			<PageNav />
			<Dropdown>
				<DropdownToggle icon={<UserCircleIcon className='h-6 w-6' />} />
				<DropdownMenu position='bottom'>
					<DropdownItem itemId='1'>
						<Avatar icon={<Plus className='h-6 w-6' />} avatarStyles='w-10 h-10' />
						<div className='text-start -mt-1'>
							<h5>Tyler Johnson</h5>
							<p className='text-xs text-gray'>tyler.johnson@gmail.com</p>
						</div>
					</DropdownItem>
					<DropdownDivider />
					<div>
						<h6 className='text-start mb-3'>Account</h6>
						<Link to={'/home'}>
							<DropdownItem itemId='2'>
								<UserCircleIcon className='h-6 w-6' />
								<span>Profile Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/home'}>
							<DropdownItem itemId='3'>
								<UserCircleIcon className='h-6 w-6' />
								<span>Project Settings</span>
							</DropdownItem>
						</Link>
						<Link to={'/home'}>
							<DropdownItem itemId='4'>
								<UserCircleIcon className='h-6 w-6' />
								<span>My Portofolio</span>
							</DropdownItem>
						</Link>
					</div>
					<DropdownDivider />

					<Link to={'/home'}>
						<DropdownItem itemId='5' itemStyles='mb-0'>
							<UserCircleIcon className='h-6 w-6' />
							<span>Logout</span>
						</DropdownItem>
					</Link>
				</DropdownMenu>
			</Dropdown>
			<Button
				buttonText='Add'
				icon={<Plus1 />}
				variant='primary'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Button
				buttonText='Add Project'
				icon={<Plus />}
				variant='secondary'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Button
				buttonText='Delete Image'
				icon={<Trash />}
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>
			<Button
				buttonText='Create an account'
				variant='text'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Search
				onSearch={(value) => console.log(value, 'helloFromInput')}
				placeholder='Search for values'
				name='search'
				iconPos='right'
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

			<Cover />
			<PageNav />
		</div>
	)
}
