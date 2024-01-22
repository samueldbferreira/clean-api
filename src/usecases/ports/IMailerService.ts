import { Either } from "@/shared";
import { MailerServiceError } from "@/usecases/errors";

export interface IDefaultEmailOptions {
	readonly host: string;
	readonly port: number;
	readonly username: string;
	readonly password: string;
	readonly from: string;
}

export interface IEmailOptions extends IDefaultEmailOptions {
	readonly to: string;
	readonly subject: string;
	readonly text: string;
	readonly html?: string;
	readonly attachments?: Object[];
}

export interface IPublicEmailOptions {
	readonly host: string;
	readonly port: number;
	readonly from: string;
	readonly to: string;
	readonly subject: string;
	readonly text: string;
	readonly html?: string;
	readonly attachments?: Object[];
}

export interface IMailerService {
	send(
		emailOptions: IEmailOptions
	): Promise<Either<MailerServiceError, IPublicEmailOptions>>;
}
