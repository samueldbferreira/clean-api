import { Either, left } from "@/shared";
import { MailerServiceError } from "@/usecases/errors";
import { IEmailOptions, IMailerService } from "@/usecases/ports";

export class ErrorThrowerMailerServiceStub implements IMailerService {
	async send(
		emailOptions: IEmailOptions
	): Promise<Either<MailerServiceError, IEmailOptions>> {
		return left(new MailerServiceError());
	}
}
