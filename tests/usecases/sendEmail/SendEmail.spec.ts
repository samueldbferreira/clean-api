import { User } from "@/entities";
import { IDefaultEmailOptions, IMailerService } from "@/usecases/ports";
import { SendEmail } from "@/usecases/sendEmail";
import {
	ErrorThrowerMailerServiceStub,
	MailerServiceStub,
} from "@tests/external/services/stub";

describe("Send email use case", () => {
	let mailerService: IMailerService;
	let defaultEmailOptions: IDefaultEmailOptions;
	let useCase: SendEmail;

	beforeEach(() => {
		mailerService = new MailerServiceStub();
		defaultEmailOptions = {
			host: "TEST",
			port: 867,
			username: "USER TEST",
			password: "PASS TEST",
			from: "FROM TEST",
		};
		useCase = new SendEmail(mailerService, defaultEmailOptions);
	});

	test("should email when receives valid name and email address", async () => {
		const user = User.create({
			name: "Any Name",
			email: "any@mail.com",
		}).value as User;

		const response = await useCase.execute(user);

		expect(response.isRight()).toBeTruthy();
	});

	test("should return error when the mailer service fails to email", async () => {
		const user = User.create({
			name: "Any Name",
			email: "any@mail.com",
		}).value as User;

		const errorThrowerMailerService = new ErrorThrowerMailerServiceStub();
		const errorThrowerUseCase = new SendEmail(
			errorThrowerMailerService,
			defaultEmailOptions
		);

		const responseValue = (await errorThrowerUseCase.execute(user))
			.value as Error;

		expect(responseValue.name).toEqual("MailerServiceError");
	});
});
