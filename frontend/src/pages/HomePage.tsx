import Button from '../components/Button'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import Textarea from '../components/Textarea'
import Menu from '../components/Menu'
import PageNav from '../components/PageNav'
import Form from '../components/Form'
import Cover from '../components/Cover'
import Plus1 from '../assets/Plus-1.svg?react'
import Plus from '../assets/Plus.svg?react'
import Trash from '../assets/Trash.svg?react'
import Text from '../components/Inputs/Text'
import { useForm } from 'react-hook-form'
import Search from '../components/Inputs/Search'
import Password from '../components/Inputs/Password'
// import FileInput from '../components/Input/FileInput'

export default function HomePage() {
	const { register } = useForm()

	return (
		<div>
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
			{/* <Password/> */}
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

			<Textarea />
			<Avatar />
			<Cover />
			<Form />
			<Card />
			<Menu />
			<PageNav />
		</div>
	)
}
