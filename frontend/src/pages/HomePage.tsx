import Input from '../components/Input'
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

export default function HomePage() {
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

			<Input onChange={(e) => console.log(e, 'helloFromInput')} placeholder='Enter input' />
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
