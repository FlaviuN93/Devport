import HomeImage from '../../components/UI/HomeImage'

const PrivacyPolicy = () => {
	return (
		<div className='px-4 mx-auto my-8 flex flex-col gap-6 max-w-[800px] text-darkGray min-w-[320px] leading-relaxed'>
			<HomeImage />
			<div className='text-center'>
				<h1>Privacy Policy</h1>
				<p>Last Updated: 05/06/2024</p>
			</div>

			<article>
				<h2 className='mb-2'>Introduction</h2>
				<p>
					This Privacy Policy describes how DevPort collects, uses, and discloses your personal information when you use our website (the
					"Service") and the choices you have associated with that data.
				</p>
			</article>

			<article>
				<h2>Information We Collect</h2>
				<p className='mb-2'>
					<span className='font-medium'>Personal Data:</span> While using our Service, we may ask you to provide us with certain personally
					identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not
					limited to:
				</p>
				<ul className='list-disc ml-4'>
					<li>Email address</li>
					<li>Name</li>
					<li>Profile Pictures</li>
					<li>Linkedin Profiles</li>
				</ul>{' '}
			</article>
			<article>
				<h2 className='mb-2'>How We Use Your Information</h2>
				<ul className='list-disc ml-4'>
					<li>To provide and maintain the Service</li>
					<li>To improve and optimize the Service</li>
					<li> To personalize your experience with the Service</li>
					<li>To respond to your inquiries and requests To comply with legal obligations</li>
				</ul>
			</article>
			<article>
				<h2>Legal Basis for Processing</h2>
				<h5>We process your personal data based on the following legal grounds:</h5>
				<ul className='list-disc ml-4'>
					<li>
						<span className='font-medium'>Contract:</span> When your personal data is necessary for us to perform our obligations under a
						contract with you, such as providing you access to our Service.
					</li>
					<li>
						<span className='font-medium'>Legitimate interests:</span> We may process your personal data for our legitimate interests, such
						as improving our Service and sending you marketing communications, provided that these interests do not override your rights and
						freedoms.
					</li>
					<li>
						<span className='font-medium'>Consent:</span> In some cases, we may ask for your specific consent to process your personal data,
						such as for sending you marketing communications.
					</li>
				</ul>
			</article>
			<article>
				<h2 className='mb-2'> Data Retention</h2>
				<p>
					We will retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the
					purposes of satisfying any legal, accounting, or reporting requirements. When we no longer need to retain your personal data, we
					will securely delete it.
				</p>
			</article>
			<article>
				<h2>Your Rights</h2>
				<h5 className='mb-2'>Under the GDPR, you have certain rights regarding your personal data. These rights include:</h5>
				<ul className='list-disc ml-4'>
					<li>Access your personal data</li>
					<li>Rectify inaccurate personal data</li>
					<li>Request the deletion of your personal data</li>
				</ul>
			</article>
			<article>
				<h2 className='mb-2'>Security</h2>
				<p>
					We take reasonable precautions to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
					However, no internet transmission or electronic storage method is completely secure, and we cannot guarantee the absolute security
					of your personal data.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Changes to This Privacy Policy</h2>
				<p>
					We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this
					page.
				</p>
			</article>
		</div>
	)
}

export default PrivacyPolicy
