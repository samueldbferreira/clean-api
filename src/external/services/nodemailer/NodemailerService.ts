import { Either, left, right } from "@/shared";
import { MailerServiceError } from "@/usecases/errors";
import {
	IEmailOptions,
	IMailerService,
	IPublicEmailOptions,
} from "@/usecases/ports";
import * as nodemailer from "nodemailer";

export class NodemailerService implements IMailerService {
	async send(
		emailOptions: IEmailOptions
	): Promise<Either<MailerServiceError, IPublicEmailOptions>> {
		try {
			const transporter = nodemailer.createTransport({
				host: emailOptions.host,
				port: emailOptions.port,
				auth: {
					user: emailOptions.username,
					pass: emailOptions.password,
				},
			});

			await transporter.sendMail({
				from: emailOptions.from,
				to: emailOptions.to,
				subject: emailOptions.subject,
				text: emailOptions.text,
				html: emailOptions.html,
				attachments: emailOptions.attachments,
			});

			const publicEmailOptions = {
				host: emailOptions.host,
				port: emailOptions.port,
				from: emailOptions.from,
				to: emailOptions.to,
				subject: emailOptions.subject,
				text: emailOptions.text,
				html: emailOptions.html,
				attachments: emailOptions.attachments,
			};

			return right(publicEmailOptions);
		} catch (e) {
			return left(new MailerServiceError());
		}
	}
}
