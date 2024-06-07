import HomeImage from '../../components/UI/HomeImage'

const TermsOfService = () => {
	return (
		<section className='px-4 mx-auto my-8 flex flex-col text-darkGray gap-8 max-w-[800px] min-w-[320px] leading-relaxed'>
			<HomeImage />
			<div className='text-center'>
				<h1>Terms of Service</h1>
				<p>Last Updated: 05/06/2024</p>
			</div>

			<article>
				<h2 className='mb-2'>Acceptance of Terms</h2>
				<p>
					By accessing or using the service, you ("user", "you", or "your") signify that you have read, understood, and agree to be bound by
					these Terms. If you disagree with any part of the terms then you may not access the service.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Changes to Terms</h2>
				<p>
					We may update our Terms at any time without prior notice. We will notify you of any changes by posting the new Terms on this page.
					You are advised to review this Terms page periodically for any changes. By continuing to access or use the service after we post
					revisions to these Terms, you agree to be bound by the revisions.
				</p>
			</article>

			<article>
				<h2 className='mb-1'>Access and Use</h2>
				<h5 className='mb-2'>
					We grant you a non-exclusive, non-transferable license to access and use our service in accordance with these Terms. You shall
					not:
				</h5>
				<ul className='list-disc ml-4'>
					<li>Use the service for any illegal or unauthorized purpose.</li>
					<li>Interfere with or disrupt the service or servers or networks connected to the service.</li>
					<li>Transmit any malware or viruses through the service.</li>
					<li>Violate any of our intellectual property rights.</li>
					<li>Exploit any bugs or technical glitches in the service to your advantage.</li>
					<li>Use the service for any automated or non-human purpose, such as scraping, data mining, or spamming.</li>
				</ul>
			</article>

			<article>
				<h2 className='mb-2'>Intellectual Property:</h2>
				<p>
					The service and its original content, features and functionality are and will remain the exclusive property of Devport and its
					licensors. The service is protected by copyright, trademark, and other intellectual property laws of Romania and foreign
					countries.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Termination:</h2>
				<p>
					We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever,
					including without limitation if you breach these Terms.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Links to Other Websites:</h2>
				<p>
					Our service may contain links to third-party websites or services that are not owned or controlled by Devport. Devport has no
					control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party websites or
					services. We encourage you to be aware of when you leave our service and to read the terms and conditions and privacy policy of
					any other website that you visit.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Disclaimer:</h2>
				<p>
					Our service is provided "as is" and "as available" without any warranty, representation, or guarantee of any kind, express or
					implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and
					non-infringement. Devport does not warrant that the service will be uninterrupted, secure, or error-free; that the results
					obtained through the service will be accurate or reliable; or that any defects in the service will be corrected.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Limitations of Liability:</h2>
				<p>
					To the maximum extent permitted by applicable law, Devport shall not be liable for any direct, indirect, incidental,
					consequential, special, exemplary, or punitive damages, arising out of or in any way connected with the use of our service,
					whether based on contract, tort, strict liability, or otherwise, even if Devport has been advised of the possibility of such
					damages.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Dispute Resolution:</h2>
				<p>
					Please note that the following section regarding Dispute Resolution is not compliant with Romanian law. In Romania, disputes are
					settled through the Romanian court system. You can find more information about the Romanian court system on the website of the
					Ministry of Justice [Ministerul Justiției](https://www. just.ro/en/index.htm). We recommend that you consult with an attorney in
					Romania to ensure that your Terms of Service comply with all applicable laws and regulations.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Severability:</h2>
				<p>
					If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining
					provisions shall remain in full force and effect.
				</p>
			</article>

			<article>
				<h2 className='mb-2'>Entire Agreement:</h2>
				<p>
					These Terms constitute the entire agreement between you and us regarding our service and supersede all prior and contemporaneous
					communications and proposals, whether oral or written.
				</p>
			</article>
		</section>
	)
}

export default TermsOfService
