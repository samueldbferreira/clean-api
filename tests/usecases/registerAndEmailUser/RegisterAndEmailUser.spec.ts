import { IDefaultEmailOptions } from "@/usecases/ports";
import { RegisterAndEmailUser } from "@/usecases/registerAndEmailUser";
import { RegisterUserOnMailingList } from "@/usecases/registerUserOnMailingList";
import { SendEmail } from "@/usecases/sendEmail";
import { UserRepositoryInMemory } from "@tests/external/repositories/inMemory";
import { MailerServiceStub } from "@tests/external/services/stub";

describe("Register and email user use case", () => {
	let userRepository: UserRepositoryInMemory;
	let registerUserOnMailingList: RegisterUserOnMailingList;
	let mailerService: MailerServiceStub;
	let sendEmail: SendEmail;
	let registerAndEmailUser: RegisterAndEmailUser;

	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		registerUserOnMailingList = new RegisterUserOnMailingList(
			userRepository
		);
		mailerService = new MailerServiceStub();
		sendEmail = new SendEmail(mailerService, {} as IDefaultEmailOptions);
		registerAndEmailUser = new RegisterAndEmailUser(
			registerUserOnMailingList,
			sendEmail
		);
	});

	test("should register and email user with valid data", async () => {
		const userData = {
			name: "Any Name",
			email: "any@mail.com",
		};

		const response = await registerAndEmailUser.execute(userData);

		expect(response.isRight()).toBeTruthy();
	});

	test("should return error when receives invalid name", async () => {
		const userData = {
			name: "o            ",
			email: "any@mail.com",
		};

		const responseValue = (await registerAndEmailUser.execute(userData))
			.value as Error;

		expect(responseValue.name).toEqual("InvalidNameError");
	});

	test("should return error when receives invalid email address", async () => {
		const userData = {
			name: "Any Name",
			email: "invalid_email",
		};

		const responseValue = (await registerAndEmailUser.execute(userData))
			.value as Error;

		expect(responseValue.name).toEqual("InvalidEmailError");
	});
});
