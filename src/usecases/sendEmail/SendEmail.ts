import { User } from "@/entities";
import { Either } from "@/shared";
import {
	IDefaultEmailOptions,
	IEmailOptions,
	IMailerService,
	IPublicEmailOptions,
	IUseCase,
} from "@/usecases/ports";
import { MailerServiceError } from "@/usecases/errors";

export class SendEmail implements IUseCase {
	private readonly mailerService: IMailerService;
	private readonly defaultEmailOptions: IDefaultEmailOptions;

	constructor(
		mailerService: IMailerService,
		defaultEmailOptions: IDefaultEmailOptions
	) {
		this.mailerService = mailerService;
		this.defaultEmailOptions = defaultEmailOptions;
	}

	async execute(
		user: User
	): Promise<Either<MailerServiceError, IPublicEmailOptions>> {
		const emailOptions: IEmailOptions = {
			...this.defaultEmailOptions,
			to: user.email.value,
			subject: "The WiseDev API",
			text: `Hi, ${user.name.value}! Welcome to our mailing list.`,
		};

		return await this.mailerService.send(emailOptions);
	}
}
