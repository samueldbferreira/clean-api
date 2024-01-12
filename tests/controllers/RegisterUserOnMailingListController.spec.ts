import { RegisterUserOnMailingListController } from "@/controllers";
import { InternalServerError } from "@/controllers/errors";
import { MissingParamError } from "@/controllers/errors";
import { IHttpRequest, IHttpResponse } from "@/controllers/ports";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { RegisterUserOnMailingList } from "@/usecases";
import { IUseCase } from "@/usecases/ports";
import { ErrorThrowerUseCase } from "@tests/usecases";
import { UserRepositoryInMemory } from "@tests/external/repositories/inMemory";

describe("Register user on mailing list web controller", () => {
	let userRepository: UserRepositoryInMemory;
	let usecase: RegisterUserOnMailingList;
	let controller: RegisterUserOnMailingListController;

	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		usecase = new RegisterUserOnMailingList(userRepository);
		controller = new RegisterUserOnMailingListController(usecase);
	});

	test("should return a 201 status code when request contains valid user data", async () => {
		const request: IHttpRequest = {
			body: {
				name: "Any Name",
				email: "any@mail.com",
			},
		};

		const response: IHttpResponse = await controller.handle(request);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual(request.body);
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
