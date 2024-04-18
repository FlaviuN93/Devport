import nodemailer from 'nodemailer'

// For production, check on this later
// const sendEmail = () => {
// 	const transporter = nodemailer.createTransport({
// 		service: 'SendGrid',
// 		auth: {
// 			user: process.env.SENDGRID_USERNAME,
// 			pass: process.env.SENDGRID_PASSWORD,
// 		},
// 	})
// }

interface MailOptions {
	email: string
	subject: string
	message: string
	// htmlMessage: HTMLElement
}

export const sendEmail = async (options: MailOptions) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),

		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	})
	const mailOptions = {
		from: `Portofolio App <${process.env.EMAIL_FROM}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
	}

	await transporter.sendMail(mailOptions)
}
