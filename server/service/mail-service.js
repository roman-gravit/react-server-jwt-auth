const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
class MailService {

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			// Use `true` for port 465, `false` for all other ports
			secure: true, 
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			}
		
		})
	}

	async SendActivationEmail(recipient_email, activation_link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: recipient_email,
			subject: "Account Activation",
			text: "",
			html:
				`
					<div>
						<h1>For account activation follow the link</h1>
						<a href="${activation_link}">${activation_link}</a>
					</div>

				`
		})
	}

}

module.exports = new MailService();