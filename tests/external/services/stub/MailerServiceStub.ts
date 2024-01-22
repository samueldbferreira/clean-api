import { Either, right } from "@/shared";
import { MailerServiceError } from "@/usecases/errors";
import { IEmailOptions, IMailerService } from "@/usecases/ports";

export class MailerServiceStub implements IMailerService {
	async send(
		emailOptions: IEmailOptions
	): Promise<Either<MailerServiceError, IEmailOptions>> {
		return right(emailOptions);
	}
}
