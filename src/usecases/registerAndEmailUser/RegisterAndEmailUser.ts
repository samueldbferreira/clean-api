import { IUserData, User } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { Either, left, right } from "@/shared";
import { IPublicEmailOptions, IUseCase } from "@/usecases/ports";
import { RegisterUserOnMailingList } from "@/usecases/registerUserOnMailingList";
import { SendEmail } from "@/usecases/sendEmail";
import { MailerServiceError } from "@/usecases/errors";

export class RegisterAndEmailUser implements IUseCase {
	private readonly registerUserOnMailingList: RegisterUserOnMailingList;
	private readonly sendEmail: SendEmail;

	constructor(
		registerUserOnMailingList: RegisterUserOnMailingList,
		sendEmail: SendEmail
	) {
		this.registerUserOnMailingList = registerUserOnMailingList;
		this.sendEmail = sendEmail;
	}

	async execute(
		userData: IUserData
	): Promise<
		Either<
			InvalidNameError | InvalidEmailError | MailerServiceError,
			IPublicEmailOptions
		>
	> {
		const userOrError = User.create(userData);
		if (userOrError.isLeft()) {
			return left(userOrError.value);
		}

		const user = userOrError.value;

		await this.registerUserOnMailingList.execute(user);

		const mailerResponseOrError = await this.sendEmail.execute(user);
		if (mailerResponseOrError.isLeft()) {
			return left(mailerResponseOrError.value);
		}

		const mailerResponse = mailerResponseOrError.value;

		return right(mailerResponse);
	}
}
