import MailForm from '../../components/Containers/Forms/MailForm'
import HomeImage from '../../components/UI/HomeImage'

const ContactUs = () => {
	return (
		<div className='px-4 mx-auto flex flex-col gap-6 max-w-[600px] text-darkGray min-w-[320px] justify-center h-screen leading-relaxed '>
			<HomeImage />
			<h1 className='text-center'>Contact Us</h1>

			<article>
				<h2>Get in Touch</h2>
				<h5>We'd love to hear from you! Here is how to get in touch:</h5>
			</article>
			<MailForm />

			<article>
				<h2>What can we help you with?</h2>
				<ul className='flex flex-col gap-1'>
					<li>General inquiries</li>
					<li>Feedback</li>
					<li>Technical support</li>
					<li>Partnership opportunities</li>
				</ul>
			</article>
		</div>
	)
}

export default ContactUs
