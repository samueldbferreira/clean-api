import { RegisterUserOnMailingListController } from "@/controllers";
import { InternalServerError } from "@/controllers/errors";
import { MissingParamError } from "@/controllers/errors";
import { IHttpRequest, IHttpResponse } from "@/controllers/ports";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { RegisterUserOnMailingList } from "@/usecases/registerUserOnMailingList";
import {
	IDefaultEmailOptions,
	IMailerService,
	IUseCase,
	IUserRepository,
} from "@/usecases/ports";
import { ErrorThrowerUseCase } from "@tests/usecases/errorThrowerUseCase";
import { UserRepositoryInMemory } from "@tests/external/repositories/inMemory";
import { RegisterAndEmailUser } from "@/usecases/registerAndEmailUser";
import { SendEmail } from "@/usecases/sendEmail";
import { MailerServiceStub } from "@tests/external/services/stub";

describe("Register user on mailing list web controller", () => {
	let userRepository: IUserRepository;
	let registerUserOnMailingList: RegisterUserOnMailingList;
	const defaultEmailOptions = {
		host: "TEST",
		port: 867,
		username: "USER TEST",
		password: "PASS TEST",
		from: "FROM TEST",
	};
	let mailerService: IMailerService;
	let sendEmail: SendEmail;
	let registerAndEmailUser: RegisterAndEmailUser;
	let controller: RegisterUserOnMailingListController;

	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		registerUserOnMailingList = new RegisterUserOnMailingList(
			userRepository
		);
		mailerService = new MailerServiceStub();
		sendEmail = new SendEmail(mailerService, defaultEmailOptions);
		registerAndEmailUser = new RegisterAndEmailUser(
			registerUserOnMailingList,
			sendEmail
		);
		controller = new RegisterUserOnMailingListController(
			registerAndEmailUser
		);
	});

	test("should return a 201 status code when request contains valid user data", async () => {
		const request: IHttpRequest = {
			body: {
				name: "Any Name",
				email: "any@mail.com",
			},
		};

		const response: IHttpResponse = await controller.handle(request);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			...defaultEmailOptions,
			to: "any@mail.com",
			subject: "The WiseDev API",
			text: `Hi, Any Name! Welcome to our mailing list.`,
		});
	});

	test("should return a 400 status code when request contains invalid user name", async () => {
		const invalidRequest: IHttpRequest = {
			body: {
				name: "X",
				email: "any@mail.com",
			},
		};

		const response: IHttpResponse = await controller.handle(invalidRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toBeInstanceOf(InvalidNameError);
	});

	test("should return a 400 status code when request contains invalid user email", async () => {
		const invalidRequest: IHttpRequest = {
			body: {
				name: "Any Name",
				email: "invalid email",
			},
		};

		const response: IHttpResponse = await controller.handle(invalidRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toBeInstanceOf(InvalidEmailError);
	});

	test("should return a 400 status code when user name param is missing", async () => {
		const invalidRequest: IHttpRequest = {
			body: {
				email: "any@mail.com",
			},
		};

		const response: IHttpResponse = await controller.handle(invalidRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toBeInstanceOf(MissingParamError);
		expect(response.body.message).toEqual(
			"The following params are missing: [name]."
		);
	});

	test("should return a 400 status code when user email param is missing", async () => {
		const invalidRequest: IHttpRequest = {
			body: {
				name: "Any Name",
			},
		};

		const response: IHttpResponse = await controller.handle(invalidRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toBeInstanceOf(MissingParamError);
		expect(response.body.message).toEqual(
			"The following params are missing: [email]."
		);
	});

	test("should return a 400 status code when user name and email params are missing", async () => {
		const invalidRequest: IHttpRequest = {
			body: {},
		};

		const response: IHttpResponse = await controller.handle(invalidRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toBeInstanceOf(MissingParamError);
		expect(response.body.message).toEqual(
			"The following params are missing: [name,email]."
		);
	});

	test("should be able to return a 500 status code when a unexpected error occurs inside the use case", async () => {
		const request: IHttpRequest = {
			body: {
				name: "Any Name",
				email: "any@mail.com",
			},
		};

		const errorThrowerUseCase: IUseCase = new ErrorThrowerUseCase(
			userRepository
		);
		const serverErrorController = new RegisterUserOnMailingListController(
			errorThrowerUseCase
		);
		const response: IHttpResponse = await serverErrorController.handle(
			request
		);

		expect(response.statusCode).toEqual(500);
		expect(response.body).toBeInstanceOf(InternalServerError);
		expect(response.body.message).toEqual("A server error has occurred.");
	});
});
