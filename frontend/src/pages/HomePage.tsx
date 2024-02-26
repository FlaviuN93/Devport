import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import Avatar from '../components/Avatar'
import Textarea from '../components/Textarea'
import Menu from '../components/Menu'
import PageNav from '../components/PageNav'
import Form from '../components/Form'
import Cover from '../components/Cover'

export default function HomePage() {
	return (
		<div>
			<Button
				isError={true}
				buttonText='Sign In'
				htmlType='button'
				onClick={(e) => console.log(e, 'hellofromEvent')}
			/>

			<Input />
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
